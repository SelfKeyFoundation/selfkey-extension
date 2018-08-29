import { errorOperations } from './state/error';
export class LWSService {
	constructor(store) {
		this.port = chrome.runtime.connect({ name: 'LWS_INIT' });
		this.store = store;
		this.handleErrors();
	}

	handleErrors() {
		this.port.onMessage.addListener(msg => {
			if (msg.error) {
				this.store.dispatch(errorOperations.updateError(msg.error));
			}
		});
	}
	start() {}
}
