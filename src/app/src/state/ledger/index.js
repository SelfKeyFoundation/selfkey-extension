const STATUS_DISCONNECTED = 'disconnected';
// const STATUS_WAIT_CONFIRMATION = 'wait_confirmation';
// const STATUS_CONNECTING = 'connecting';
// const STATUS_CONNECTION_ERROR = 'connection_error';
// const STATUS_UNLOCKED = 'unlocked';
// const STATUS_LOADED = 'loaded';

export const initialLedgerState = {
	status: STATUS_DISCONNECTED,
	adresses: []
};

export const ledgerTypes = {
	LEDGER_CONNECTION_START: 'ledger/connection/START'
};

export const ledgerSelectors = {};

export const ledgerActions = {
	startLedgerConnection: () => ({})
};

export const ledgerOperations = {
	...ledgerActions,
	connectToLedgerOperation: () => (dispatch, getState) => {}
};

export const ledgerReducers = {};

export const ledgerReducer = (state = initialLedgerState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default ledgerReducer;
