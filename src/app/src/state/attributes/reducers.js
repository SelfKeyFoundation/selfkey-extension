import * as types from './types';

const initialState = {
	list: [],
	disallowed: [],
	byUiId: {},
	loading: true
};

const updateAttributesReducer = (state, { payload, error }) => {
	if (error) {
		return { ...state, error: payload };
	}
	let attributesState = (payload || []).reduce(
		(acc, attr) => {
			acc.list = [...acc.list, attr.uiId];
			acc.byUiId = { ...acc.byUiId, [attr.uiId]: attr };
			return acc;
		},
		{ ...initialState }
	);
	return attributesState;
};

const disallowAttributeReducer = (state, { payload }) => {
	let { uiId, disallow } = payload;
	let indx = state.disallowed.indexOf(uiId);
	if ((indx >= 0 && disallow) || (indx < 0 && !disallow)) {
		return state;
	}
	if (disallow) {
		return { ...state, disallowed: [...state.disallowed, uiId] };
	}
	return { ...state, disallowed: state.disallowed.filter(u => u !== uiId) };
};

const selectAttributeOptionReducer = (state, action) => {
	const { uiId, option } = action.payload;
	const attribute = { ...state.byUiId[uiId] };
	if (!attribute || !attribute.options || attribute.options.length <= option) {
		return state;
	}
	return { ...state, byUiId: { ...state.byUiId, [uiId]: attribute } };
};

const attributesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ATTRIBUTES_UPDATE:
			return updateAttributesReducer(state, action);
		case types.ATTRIBUTES_SET_LOADING:
			return { ...state, loading: action.payload };
		case types.ATTRIBUTES_DISALLOW:
			return disallowAttributeReducer(state, action);
		case types.ATTRIBUTES_OPTION_SELECT:
			return selectAttributeOptionReducer(state, action);
		default:
			return state;
	}
};

export default attributesReducer;
