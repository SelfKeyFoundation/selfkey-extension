'use strict';
/* globals chrome */
var LWS_CONTENT_SCRIPT_NAME = 'LWS_INIT';

const MSG_SRC = 'lws_content';

var contentScript = {
	msgId: 0
};

function lwsClientInit(data) {
	window.lws = { data: data };
}

function injectInitial(data) {
	if (window.lwsInjectComplete) return;

	var code =
		'' +
		'\n(function(data){' +
		'\n' +
		lwsClientInit.toString() +
		'lwsClientInit(data);' +
		'\n})(' +
		JSON.stringify(data) +
		');';

	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.textContent = code;
	(document.head || document.documentElement).prepend(s);
	s.remove();
	window.lwsInjectComplete = true;
}

const fmtMessage = (msg, req) => {
	req = req || {};
	msg.type = msg.type || req.type;
	msg.meta = msg.meta || {};
	let id = msg.meta.id;
	if (!id && req.meta && req.meta.id) {
		id = req.meta.id;
	}
	msg.meta.id = id || `${MSG_SRC}_${contentScript.msgId++}`;
	msg.meta.src = msg.meta.src || MSG_SRC;
	if (!msg.type && msg.error) {
		msg.type = 'error';
	}
};

function generateHash() {
	// TODO: make it crypto - secure
	return Math.random();
}

function initListeners() {
	window.bgPort = chrome.runtime.connect({ name: LWS_CONTENT_SCRIPT_NAME });
	window.bgPort.addEventListener('message', handleBgMessage);
	window.bgPort.onDisconnect(() => {
		console.error('bg port disconnected');
	});
	window.addEventListener('message', handleWebPageMessage, false);
}

function handleWebPageMessage(evt) {
	var msg = evt.data;

	if (!msg && !msg.type && !msg.meta && msg.meta.hash !== window.hash) return;
	switch (msg.type) {
		case 'init':
			return sendInitToBg(msg);
	}
}

function handleBgMessage(msg) {
	if (!msg.type) return;
	switch (msg.type) {
		case 'init':
			return handleInitFromBg(msg);
	}
}

function sendInitToBg(msg) {
	if (!msg.payload.config) {
		console.error('No config provided');
		return;
	}
	window.bgPort.postMessage(
		fmtMessage(
			{
				payload: msg.payload.config
			},
			msg
		)
	);
}

function handleInitFromBg(msg) {
	console.log('connected: true');
}

function main() {
	var hash = generateHash();
	window.hash = hash;
	initListeners();
	var data = {
		clientUrl: chrome.runtime.getUrl('lws-inject.js'),
		clientTagId: 'lws-js-sdk',
		iframeUrl: chrome.runtime.getUrl('main.html'),
		originHash: hash,
		id: chrome.runtime.id
	};
	injectInitial(data);
}

main();
