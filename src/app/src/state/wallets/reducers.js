import * as types from './types';

const initialState = {
	wallets: null
};

const walletsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.WALLETS_UPDATE:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
};

export default walletsReducer;
