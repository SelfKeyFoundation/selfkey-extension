'use strict';

const WS_URL = 'ws://localhost:8898';
const PORT_NAME = 'LWS_INIT';
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
};

const sendToWs = (msg, sendResponse) => {
	const msgId = msg.meta.id;
	bg.wsReqs[msgId] = { req: msg };
	bg.wsReqs[msgId].handleRes = res => {
		clearTimeout(bg.wsReqs.timeout);
		sendResponse(fmtMessage(msg));
		delete bg.wsReqs[msgId];
	};
	bg.wsReqs[msgId].timeout = setTimeout(() => {
		bg.wsReqs[msgId].handleRes({ error: 'response timed out' });
	}, WS_REQ_TIMEOUT);
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
			error: 'websocket disconnected'
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

const handlePortMessage = ctx => (msg, port) => {
	const sendResponse = msg => port.postMessage(msg);

	if (!msg.type || !ALLOWED_REQUESTS.includes(msg.type)) {
		sendResponse(
			fmtMessage(
				{
					error: 'invalid request message'
				},
				msg
			)
		);
		return;
	}

	if (msg.type === 'init') {
		ctx.config = msg.config;
		sendResponse(
			fmtMessage(
				{
					type: 'init'
				},
				msg
			)
		);
		return;
	}

	if (!bg.ws || bg.ws.readyState !== 1) {
		sendResponse(
			fmtMessage(
				{
					error: 'ws socket not open'
				},
				msg
			)
		);
		return;
	}

	let wsMessage = fmtMessage({}, msg);

	if (msg.type === 'attributes') {
		wsMessage.payload.required = ctx.config.required;
	}
	sendToWs(wsMessage, ctx, sendResponse);
};

const handleConnection = port => {
	console.assert(port.port.name === PORT_NAME);
	console.log('port connected');
	bg.ports.push(port);
	const ctx = {
		port: port,
		ws: bg.ws
	};
	port.onMessage.addListener(handlePortMessage(ctx));
	port.onDisconnect(port => {
		console.log('port disconnected');
		let idx = bg.ports.indexOf(port);
		if (idx < 0) return;
		bg.ports.splice(idx, 1);
	});
};

const main = () => {
	bg.ws = initWS();
	chrome.runtime.onConnect.addListener(handleConnection);
};

main();
