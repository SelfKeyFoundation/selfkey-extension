(function() {
	'use strict';
	/* globals chrome */
	const PORT_NAME = 'LWS_CONTENT';

	const MSG_SRC = 'content';
	const WP_SRC = 'browser_lib';

	var contentScript = {
		msgId: 0
	};

	const fmtMessage = (msg, req) => {
		req = req || {};
		msg.type = msg.type || req.type;
		msg.meta = msg.meta || {};
		let id = msg.meta.id;
		if (!id && req.meta && req.meta.id) {
			id = req.meta.id;
		}
		msg.meta.id = id || `${MSG_SRC}-${contentScript.msgId++}`;
		msg.meta.src = msg.meta.src || MSG_SRC;
		if (!msg.type && msg.error) {
			msg.error = true;
			msg.payload = {
				type: 'unknown',
				message: 'Unknown error'
			};
		}
		return msg;
	};

	function initListeners() {
		contentScript.bgPort = chrome.runtime.connect({ name: PORT_NAME });
		contentScript.bgPort.onMessage.addListener(handleBgMessage);
		contentScript.bgPort.onDisconnect.addListener(() => {
			console.error('bg port disconnected');
			contentScript.bgPort.onMessage.removeListener(handleBgMessage);
			window.removeEventListener('message', handleWebPageMessage);
			sendToWindow({ type: 'content_disconnect' });
		});
		window.addEventListener('message', handleWebPageMessage, false);
	}

	function handleWebPageMessage(evt) {
		var msg = evt.data;
		if (window !== evt.source) return;
		if (!msg || !msg.type || !msg.meta || msg.meta.src !== WP_SRC) return;

		msg.payload.origin = window.location.origin;

		switch (msg.type) {
			case 'wp_init':
				return sendInitToBg(msg);
			case 'wp_teardown':
				return sendTearDownToBg(msg);
			default:
				return sendUnknownMsgToPage(msg);
		}
	}

	function handleBgMessage(msg) {
		if (!msg.type) return;
		switch (msg.type) {
			case 'wp_init':
				return handleInitFromBg(msg);
			case 'wp_teardown':
				return handleTearDownFromBg(msg);
			case 'wp_auth':
				return handleAuthFromBg(msg);
			case 'error':
				return handleErrorFromBg(msg);
		}
	}

	function sendInitToBg(msg) {
		if (!msg.payload || !msg.payload) {
			console.error('No config provided');
			sendToWindow(
				{
					error: true,
					payload: {
						code: 'no_config',
						message: `No config provided with init call`
					}
				},
				msg
			);
			return;
		}
		sendToBg(
			{
				type: 'wp_init',
				payload: msg.payload
			},
			msg
		);
	}

	function sendTearDownToBg(msg) {
		sendToBg({ type: 'wp_teardown' }, msg);
	}

	function handleTearDownFromBg(msg) {
		let winMsg = {
			payload: 'ok'
		};
		if (msg.error) {
			winMsg.error = true;
			winMsg.payload = {
				code: 'teardown_error',
				message: 'Failed to teardown LWS'
			};
		}
		sendToWindow(winMsg, msg);
	}

	function sendUnknownMsgToPage(msg) {
		sendToWindow(
			{
				error: true,
				payload: {
					code: 'unknown_type',
					message: `Unknown message type ${msg.type}`
				}
			},
			msg
		);
	}

	function handleAuthFromBg(msg) {
		sendToWindow({ payload: msg.payload, error: msg.error }, msg);
	}

	function sendToBg(msg, req) {
		contentScript.bgPort.postMessage(fmtMessage(msg, req));
	}

	function sendToWindow(msg, req) {
		window.postMessage(fmtMessage(msg, req), window.location.href);
	}

	function handleInitFromBg(msg) {
		console.log('init from bg', msg);
		let winMsg = {
			payload: {
				uiUrl: chrome.runtime.getURL('app/index.html') + '#/' + msg.payload + '/',
				hash: msg.payload
			}
		};
		if (msg.error) {
			winMsg.error = true;
			winMsg.payload = {
				code: 'init_error',
				message: 'Failed initializing LWS'
			};
		}
		sendToWindow(winMsg, msg);
	}

	function handleErrorFromBg(msg) {
		if (
			msg.error &&
			msg.payload.code === 'idw_disconnect' &&
			msg.payload.disconnectCounter === 1
		) {
			return sendToWindow({ type: 'idw_disconnect' });
		}
	}

	function main() {
		console.log('LWS: init content');
		initListeners();
		sendToWindow({ type: 'content_init' });
	}

	main();
})();
