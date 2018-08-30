import * as types from './types';

const setAppLoading = loading => ({
	type: types.APP_LOADING_SET,
	payload: loading
});

const setAppConfig = config => ({
	type: types.APP_CONFIG_SET,
	payload: config
});

const setAppError = error => ({
	type: types.APP_ERROR_SET,
	payload: error
});

export { setAppLoading, setAppConfig, setAppError };
