import configureStore from './state/store';
import { errorOperations } from './state/error';
let port;

export class LWSService {
	constructor() {
		this.port = port || (port = chrome.runtime.connect({ name: 'LWS_INIT' }));
		this.store = configureStore();
		this.handleErrors();
	}

	handleErrors() {
		this.port.onMessage.addListener(msg => {
			if (msg.error) {
				this.store.dispatch(errorOperations.updateError(msg.error));
			}
		});
	}
}
