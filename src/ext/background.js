'use strict';

const WS_URL = 'ws://localhost:8898';
const WSS_URL = 'wss://localhost:8899';
const CONTENT_PORT_NAME = 'LWS_CONTENT';
const APP_PORT_NAME = 'LWS_APP';
const ALLOWED_REQUESTS = [
	'wp_init',
	'app_init',
	'wss_init',
	'wallets',
	'unlock',
	'attributes',
	'auth'
];
const MSG_SRC = 'lws_bg';
const WS_REQ_TIMEOUT = 5000;
const WS_RECONNECT_INTERVAL = 5000;

const bg = {
	msgId: 0,
	ports: [],
	ws: null,
	wss: null,
	wsReqs: {},
	wssReqs: {},
	conns: {}
};

// TODO: handle ws disconnects and reconnects

const fmtMessage = (msg, req) => {
	req = req || {};
	msg.type = msg.type || req.type;
	msg.meta = msg.meta || {};
	let id = msg.meta.id;
	if (!id && req.meta && req.meta.id) {
		id = req.meta.id;
	}
	msg.meta.id = id || `${MSG_SRC}_${bg.msgId++}`;
	msg.meta.src = msg.meta.src || MSG_SRC;
	if (!msg.type && msg.error) {
		msg.type = 'error';
	}
	return msg;
};

const sendToWs = (msg, ctx, sendResponse) => {
	const msgId = msg.meta.id;
	bg.wsReqs[msgId] = { req: msg, ctx };
	bg.wsReqs[msgId].handleRes = res => {
		clearTimeout(bg.wsReqs[msgId].timeout);
		sendResponse(res, msg);
		delete bg.wsReqs[msgId];
	};
	bg.wsReqs[msgId].timeout = setTimeout(() => {
		if (!bg.wsReqs[msgId]) return;
		bg.wsReqs[msgId].handleRes({
			error: true,
			payload: { code: 'response_timeout', message: 'Response timed out' }
		});
	}, WS_REQ_TIMEOUT);
	bg.ws.send(JSON.stringify(msg));
};

const sendToAllPorts = msg => {
	bg.ports.forEach(port => {
		port.postMessage(msg);
	});
};

const handleWSMessage = ctx => evt => {
	let msg = JSON.parse(evt.data);
	let id = (msg.meta || {}).id;
	let req = bg.wsReqs[id];
	if (!req) {
		console.log('unknown message', msg);
	}
};

const handleWSClose = ctx => () => {
	console.log('ws connection closed');
	sendToAllPorts(
		fmtMessage({
			error: true,
			payload: { code: 'idw_disconnect', message: 'IDW disconnected' }
		})
	);
	bg.ws = null;
	setTimeout(() => {
		console.log('trying to reconnct ws');
		initWS(ctx);
	}, WS_RECONNECT_INTERVAL);
};

const handleWSOpen = ctx => () => {
	console.log('ws connection established');
};

const handleWSError = () => evt => {
	console.error('ws error', evt);
};

const initWS = ctx => {
	const ws = (bg.ws = new WebSocket(WS_URL));
	ws.addEventListener('open', handleWSOpen(ctx));
	ws.addEventListener('message', handleWSMessage(ctx));
	ws.addEventListener('close', handleWSClose(ctx));
	ws.addEventListener('error', handleWSError(ctx));
};

// WSS

const sendToWss = (msg, ctx, sendResponse) => {
	console.log(ctx);
	console.log(msg);
	const msgId = msg.meta.id;
	bg.wssReqs[msgId] = { req: msg, ctx };
	bg.wssReqs[msgId].handleRes = res => {
		clearTimeout(bg.wssReqs[msgId].timeout);
		sendResponse(res, msg);
		delete bg.wssReqs[msgId];
	};
	bg.wssReqs[msgId].timeout = setTimeout(() => {
		if (!bg.wssReqs[msgId]) return;
		bg.wssReqs[msgId].handleRes({
			error: true,
			payload: { code: 'response_timeout', message: 'Response timed out' }
		});
	}, WS_REQ_TIMEOUT);
	bg.wss.send(JSON.stringify(msg));
};

const handleWSSMessage = ctx => evt => {
	let msg = JSON.parse(evt.data);
	let id = (msg.meta || {}).id;
	let req = bg.wssReqs[id];
	if (!req) {
		console.log('unknown message', msg);
		return;
	}
	req.handleRes(msg);
	if (msg.type === 'auth' && req.ctx.port) {
		req.ctx.port.postMessage(fmtMessage({ type: 'wp_auth', payload: msg.payload }, msg));
	}
};

const handleWSSClose = ctx => () => {
	console.log('wss connection closed');
	sendToAllPorts(
		fmtMessage({
			error: true,
			payload: { code: 'idw_disconnect', message: 'IDW disconnected' }
		})
	);
	bg.wss = null;
	setTimeout(() => {
		console.log('trying to reconnect wss');
		initWSS(ctx);
	}, WS_RECONNECT_INTERVAL);
};

const handleWSSOpen = ctx => () => {
	console.log('wss connection established');
};

const handleWSSError = () => evt => {
	console.error('wss error', evt);
};

const initWSS = ctx => {
	return new Promise(resolve => {
		const wss = (bg.wss = new WebSocket(WSS_URL));
		wss.addEventListener('open', handleWSSOpen(ctx));
		wss.addEventListener('message', handleWSSMessage(ctx));
		wss.addEventListener('close', handleWSSClose(ctx));
		wss.addEventListener('error', handleWSSError(ctx));
		resolve(true);
	});
};

const genConnHash = () => {
	// TODO: make this secure
	return Math.random();
};

const handlePortMessage = ctx => async (msg, port) => {
	const sendResponse = (msg, req) => port.postMessage(fmtMessage(msg, req));
	console.log(port.name, msg);
	let wsMessage = fmtMessage({ payload: msg.payload }, msg);

	if (!msg.type || !ALLOWED_REQUESTS.includes(msg.type)) {
		sendResponse(
			{
				error: true,
				payload: {
					code: 'invalid_request',
					message: `Invalid request ${msg.type}`
				}
			},
			msg
		);
	} else if (msg.type === 'wp_init') {
		ctx.config = msg.payload;
		return sendResponse({ payload: ctx.hash }, msg);
	} else if (msg.type === 'app_init') {
		console.log('init from app', ctx);
		sendResponse({ payload: ctx.config }, msg);
		return sendToWs(wsMessage, ctx, sendResponse);
	} else if (msg.type === 'wss_init') {
		await sendToWs(wsMessage, ctx, sendResponse);
		await initWSS();
		console.log('wss_init from app', ctx);
		return sendResponse({ payload: 'wss' }, msg);
	}

	// if (!bg.ws || bg.ws.readyState !== 1) {
	// 	sendResponse(
	// 		{
	// 			error: true,
	// 			payload: { code: 'idw_no_conn', message: 'No WS connection to IDW' }
	// 		},
	// 		msg
	// 	);
	// 	return;
	// } else

	// if (!bg.wss || bg.wss.readyState !== 1) {
	// 	console.log(bg.wss)
	// 	sendResponse(
	// 		{
	// 			error: true,
	// 			payload: { code: 'idw_no_conn', message: 'No WSS connection to IDW' }
	// 		},
	// 		msg
	// 	);
	// 	return;
	// } else
	else {
		return sendToWss(wsMessage, ctx, sendResponse);
	}
};

const genConnContext = port => {
	let ctx = null;
	if (port.name === CONTENT_PORT_NAME) {
		let hash = genConnHash();
		ctx = {
			port,
			hash
		};
		bg.conns[hash] = ctx;
	}

	if (port.name.startsWith(APP_PORT_NAME)) {
		let portInfo = port.name.split('#');
		ctx = bg.conns[portInfo[1]];
		if (!ctx) return null;
		ctx.appPorts = ctx.appPorts || [];
		ctx.appPorts.push(port);
	}

	return ctx;
};

const handleConnection = port => {
	console.assert(port.name === CONTENT_PORT_NAME || port.name.startsWith(APP_PORT_NAME));

	console.log('port connected', port.name);
	bg.ports.push(port);
	const ctx = genConnContext(port);
	if (!ctx) throw new Error('invalid connection');

	port.onMessage.addListener(handlePortMessage(ctx));
	port.onDisconnect.addListener(port => {
		console.log('port disconnected', port.name);
		let idx = bg.ports.indexOf(port);
		if (idx < 0) return;
		bg.ports.splice(idx, 1);
		if (port.name === CONTENT_PORT_NAME) {
			(ctx.appPorts || []).forEach(p => {
				port.disconnect();
			});
			delete bg.conns[ctx.hash];
		}
	});
};

const main = () => {
	initWS();
	chrome.runtime.onConnect.addListener(handleConnection);
};

main();
