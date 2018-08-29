import * as types from './types';

const initialState = {
	attributes: null
};

const attributesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ATTRIBUTES_UPDATE:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
};

export default attributesReducer;
