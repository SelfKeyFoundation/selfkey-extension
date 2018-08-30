import * as types from './types';

const setLoadingApp = loading => ({
	type: types.APP_LOADING_SET,
	payload: loading
});

export { setLoadingApp };
