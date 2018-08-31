import * as types from './types';

const initialState = {
	list: [],
	byId: {},
	error: null
};

const walletsUpdateReducer = (state, { error, payload }) => {
	if (error) {
		return { ...state, error: payload };
	}
	let walletsState = (payload || []).reduce((acc, w) => {
		acc.list.push(w.wid);
		acc.byId[w.wid] = w;
		return acc;
	}, initialState);
	return walletsState;
};

const walletsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.WALLETS_UPDATE:
			return walletsUpdateReducer(state, action);
		default:
			return state;
	}
};

export default walletsReducer;
