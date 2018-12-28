import * as types from './types';

const initialState = {
	list: [],
	disallowed: [],
	byUrl: {},
	loading: true
};

const updateAttributesReducer = (state, { payload, error }) => {
	if (error) {
		return { ...state, error: payload };
	}
	console.log('XXX', 'updating attributes', payload);
	let attributesState = (payload || []).reduce(
		(acc, attr) => {
			acc.list = [...acc.list, attr.url];
			acc.byUrl = { ...acc.byUrl, [attr.url]: attr };
			return acc;
		},
		{ ...initialState }
	);
	console.log('XXX update', state, '->', attributesState);
	return attributesState;
};

const disallowAttributeReducer = (state, { payload }) => {
	let { url, disallow } = payload;
	let indx = state.disallowed.indexOf(url);
	if ((indx >= 0 && disallow) || (indx < 0 && !disallow)) {
		return state;
	}
	if (disallow) {
		return { ...state, disallowed: [...state.disallowed, url] };
	}
	return { ...state, disallowed: state.disallowed.filter(u => u !== url) };
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
