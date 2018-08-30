import * as types from './types';

const initialState = {
	loading: true,
	config: null,
	error: null
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.APP_LOADING_SET:
			return { ...state, loading: action.payload };
		case types.APP_CONFIG_SET:
			return { ...state, config: action.payload };
		case types.APP_ERROR_SET:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export default appReducer;
