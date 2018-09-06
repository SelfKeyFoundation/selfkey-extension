import * as types from './types';

const initialState = {
	list: [],
	byKey: {},
	loading: true
};

const updateAttributesReducer = (state, { payload, error }) => {
	if (error) {
		return { ...state, error: payload };
	}
	let attributesState = (payload || []).reduce(
		(acc, attr) => {
			acc.list = [...acc.list, attr.key];
			acc.byKey = { ...acc.byKey, [attr.key]: attr };
			return acc;
		},
		{ ...initialState }
	);
	return attributesState;
};

const attributesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ATTRIBUTES_UPDATE:
			return updateAttributesReducer(state, action);
		case types.ATTRIBUTES_SET_LOADING:
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

export default attributesReducer;
