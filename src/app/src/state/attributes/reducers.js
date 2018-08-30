import * as types from './types';

const initialState = {
	list: [],
	byKey: {}
};

const updateAttributesReducer = (state, { payload }) => {
	let attributesState = (payload || []).reduce((acc, attr) => {
		acc.list.push(attr.key);
		acc.byKey[attr.key] = attr;
		return acc;
	}, initialState);
	return attributesState;
};

const attributesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ATTRIBUTES_UPDATE:
			return updateAttributesReducer(state, action);
		default:
			return state;
	}
};

export default attributesReducer;
