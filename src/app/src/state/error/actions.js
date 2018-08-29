import * as types from './types';

const updateError = error => ({
	type: types.ERROR_UPDATE,
	payload: error
});

export { updateError };
