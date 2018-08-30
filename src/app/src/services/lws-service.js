const MSG_SRC = 'lws_app';
const BG_MSG_SRC = 'lws_background';
const PORT_NAME = 'LWS_APP';
const BG_REQ_TIMEOUT = 5000;
export class LWSService {
	constructor(store, website) {
		this.port = null;
		this.store = store;
		this.msgId = 0;
		this.reqs = {};
	}

	async connectToBg() {
		this.port = chrome.runtime.connect({ name: PORT_NAME });
		this.port.onMessage.addListener(msg => {
			if (!msg || !msg.type || !msg.meta || msg.meta.src !== BG_MSG_SRC) return;
			if (msg.meta.id && this.reqs[msg.meta.id]) {
				return this.reqs[msg.meta.id].handleRes(msg);
			}
		});
		let initRes = await this.sendRequest({ type: 'app_init' });
		this.config = initRes.payload;
		return this.config;
	}

	disconnectPort() {
		if (!this.port) return;

		this.port.disconnect();
		this.port = null;
	}

	getWalelts(website) {
		return this.sendRequest({
			type: 'wallets',
			payload: {
				website
			}
		});
	}

	getAttributes(publicKey, attributes) {
		return this.sendRequest({
			type: 'attributes',
			payload: {
				publicKey,
				attributes
			}
		});
	}

	unlock(publicKey, password) {
		return this.sendRequest({
			type: 'unlock',
			payload: { publicKey, password }
		});
	}

	sendAuth(website, apiUrl, publicKey, attributes) {
		return this.sendRequest({
			type: 'auth',
			payload: {
				website,
				apiUrl,
				publicKey,
				attributes
			}
		});
	}

	sendRequest(msg) {
		msg = this.fmtMessage(msg);
		return new Promise((resolve, reject) => {
			var msgId = msg.meta.id;
			this.reqs[msgId] = { req: msg };
			this.reqs[msgId].handleRes = res => {
				clearTimeout(this.reqs[msgId].timeout);
				delete this.reqs[msgId];
				if (res.error) {
					return reject(res);
				}
				resolve(res);
			};
			this.reqs[msgId].timeout = setTimeout(() => {
				console.error('request timeout for', msg.type);
				this.reqs[msgId].handleRes({
					error: true,
					payload: {
						code: 'response_timeout',
						message: 'Response timed out from background'
					}
				});
			}, BG_REQ_TIMEOUT);
		});
	}

	fmtMessage(msg, req) {
		req = req || {};
		msg.type = msg.type || req.type;
		msg.meta = msg.meta || {};
		let id = msg.meta.id;
		if (!id && req.meta && req.meta.id) {
			id = req.meta.id;
		}
		msg.meta.id = id || `${MSG_SRC}_${this.msgId++}`;
		msg.meta.src = msg.meta.src || MSG_SRC;
		if (!msg.type && msg.error) {
			msg.error = true;
			msg.payload = {
				type: 'unknown',
				message: 'Unknown error'
			};
		}
		return msg;
	}

	start() {}
}
