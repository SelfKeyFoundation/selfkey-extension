import * as types from './types';

const initialState = {
	list: [],
	disallowed: [],
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

const disallowAttributeReducer = (state, { payload }) => {
	let { key, disallow } = payload;
	let indx = state.disallowed.indexOf(key);
	if ((indx >= 0 && disallow) || (indx < 0 && !disallow)) {
		return state;
	}
	if (disallow) {
		return { ...state, disallowed: [...state.disallowed, key] };
	}
	return { ...state, disallowed: state.disallow.filter(k => k !== key) };
};

const attributesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ATTRIBUTES_UPDATE:
			return updateAttributesReducer(state, action);
		case types.ATTRIBUTES_SET_LOADING:
			return { ...state, loading: action.payload };
		case types.ATTRIBUTES_DISALLOW:
			return disallowAttributeReducer(state, action);
		default:
			return state;
	}
};

export default attributesReducer;
