import * as types from './types';

const initialState = {
	list: [],
	byKey: {},
	selected: null,
	error: null
};

const walletsUpdateReducer = (state, { error, payload }) => {
	if (error) {
		return { ...state, error: payload };
	}
	let walletsState = (payload || []).reduce(
		(acc, w) => {
			acc.list = [...acc.list, w.publicKey];
			acc.byKey = { ...acc.byKey, [w.publicKey]: w };
			return acc;
		},
		{ ...initialState }
	);
	return walletsState;
};

const walletsUpdateOneReducer = (state, { payload }) => {
	let { list, byKey } = state;
	const { publicKey } = payload;
	if (!byKey.hasOwnProperty(publicKey)) {
		list = [...list, publicKey];
	}
	byKey = { ...byKey, [publicKey]: payload };
	return { ...state, byKey, list };
};

const walletsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.WALLETS_UPDATE:
			return walletsUpdateReducer(state, action);
		case types.WALLETS_SELECT:
			return { ...state, selected: action.payload };
		case types.WALLETS_UPDATE_ONE:
			return walletsUpdateOneReducer(state, action);
		default:
			return state;
	}
};

export default walletsReducer;
