import * as types from './types';

const initialState = {
	error: null
};

const errorReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ERROR_UPDATE:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
};

export default errorReducer;
