'use strict';

const WS_URL = 'ws://localhost:8898';
const PORT_NAME = 'LWS_INIT';
const ALLOWED_REQUESTS = ['init', 'wallets', 'unlock', 'attributes', 'auth'];

const handleWSMessage = ctx => evt => {
	let data = JSON.parse(evt.data);
	if (!data.response) {
		console.error('no response field in ws message');
		return;
	}
	ctx.port.postMessage(data);
};

const handleWSClose = ctx => () => {
	console.log('WS CLOSED');
	ctx.port.postMessage({
		error: 'websocket disconnected'
	});
};

const handleWSError = () => evt => {
	console.error('ws error', evt);
};

const initWS = ctx => {
	const ws = new WebSocket(WS_URL);
	ws.addEventListener('message', handleWSMessage(ctx));
	ws.addEventListener('close', handleWSClose(ctx));
	ws.addEventListener('error', handleWSError(ctx));
	return ws;
};

const handlePortMessage = ctx => msg => {
	const port = ctx.port;
	const ws = ctx.ws;

	if (!msg.request || !ALLOWED_REQUESTS.includes(msg.request)) {
		port.postMessage({
			error: 'invalid request message'
		});
		return;
	}

	if (msg.readyState !== 1) {
		port.postMessage({
			response: msg.data.request,
			error: 'ws socket not open'
		});
		return;
	}

	if (msg.request === 'init') {
		ctx.config = msg.config;
		port.postMessage({
			response: 'init'
		});
		return;
	}

	let wsMessage = Object.assign({}, msg.data);

	if (msg.request === 'attributes') {
		wsMessage.required = ctx.config.required || ctx.config.attributes;
	}

	ws.send(JSON.stringify(wsMessage));
};

const handleConnection = port => {
	console.assert(port.port.name === PORT_NAME);
	const ctx = {};
	ctx.port = port;
	ctx.ws = initWS(ctx);
	port.onMessage.addListener(handlePortMessage(ctx));
};

const main = () => {
	chrome.runtime.onConnect.addListener(handleConnection);
};

main();
