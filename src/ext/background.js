'use strict';

const WS_URL = 'ws://localhost:8898';
const CONTENT_PORT_NAME = 'LWS_CONTENT';
const APP_PORT_NAME = 'LWS_APP_PORT';
const ALLOWED_REQUESTS = ['init', 'wallets', 'unlock', 'attributes', 'auth'];
const MSG_SRC = 'lws_bg';
const WS_REQ_TIMEOUT = 5000;
const WS_RECONNECT_INTERVAL = 5000;

const bg = {
	msgId: 0,
	ports: [],
	ws: null,
	wsReqs: {}
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

const sendToWs = (msg, sendResponse) => {
	const msgId = msg.meta.id;
	bg.wsReqs[msgId] = { req: msg };
	bg.wsReqs[msgId].handleRes = res => {
		clearTimeout(bg.wsReqs.timeout);
		sendResponse(msg);
		delete bg.wsReqs[msgId];
	};
	bg.wsReqs[msgId].timeout = setTimeout(() => {
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
		console.log('unknown message');
		return;
	}
	req.handleRes(msg);
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

const handleWsOpen = ctx => () => {
	console.log('ws connection established');
};

const handleWSError = () => evt => {
	console.error('ws error', evt);
};

const initWS = ctx => {
	const ws = (bg.ws = new WebSocket(WS_URL));
	ws.addEventListener('open', handleWsOpen(ctx));
	ws.addEventListener('message', handleWSMessage(ctx));
	ws.addEventListener('close', handleWSClose(ctx));
	ws.addEventListener('error', handleWSError(ctx));
};

const genConnHash = () => {
	// TODO: make this secure
	return Math.random();
};

const handlePortMessage = ctx => (msg, port) => {
	const sendResponse = (msg, req) => port.postMessage(fmtMessage(msg, req));

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
		return;
	}

	if (msg.type === 'wp_init') {
		console.log('init from content');
		ctx.config = msg.config;
		sendResponse(
			{
				payload: genConnHash()
			},
			msg
		);
		return;
	}

	if (msg.type === 'app_init') {
		return sendResponse({
			payload: ctx.config,
			msg
		});
	}

	if (!bg.ws || bg.ws.readyState !== 1) {
		sendResponse(
			{
				error: true,
				payload: { code: 'idw_no_conne', message: 'No connection to IDW' }
			},
			msg
		);
		return;
	}

	let wsMessage = fmtMessage({}, msg);

	sendToWs(wsMessage, ctx, sendResponse);
};

const genConnContext = port => {
	let ctx = null;
	if (port.name === CONTENT_PORT_NAME) {
		let hash = genConnHash();
		ctx = {
			port,
			ws: bg.ws,
			hash
		};
		bg.conns[hash] = ctx;
	}

	if (port.name.startsWith(APP_PORT_NAME)) {
		let portInfo = port.name.split('#');
		ctx = bg.conns[portInfo[1]];
		ctx.appPorts = ctx.appPorts || [];
		ctx.appPorts.push(port);
	}

	return ctx;
};

const handleConnection = port => {
	console.assert(port.name === CONTENT_PORT_NAME || port.name.startsWith(APP_PORT_NAME));

	console.log('port connected');
	bg.ports.push(port);
	const ctx = genConnContext(port);
	if (!ctx) throw new Error('invlid connection');

	port.onMessage.addListener(handlePortMessage(ctx));
	port.onDisconnect.addListener(port => {
		console.log('port disconnected');
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
	bg.ws = initWS();
	chrome.runtime.onConnect.addListener(handleConnection);
};

main();
