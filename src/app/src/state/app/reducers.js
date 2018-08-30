import * as types from './types';

const initialState = {
	loading: false
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.APP_LOADING_SET:
			return {
				...state,
				loading: action.payload
			};
		default:
			return state;
	}
};

export default appReducer;
