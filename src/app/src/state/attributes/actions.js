import * as types from './types';

const updateAttributes = attributes => ({
	type: types.ATTRIBUTES_UPDATE,
	payload: attributes
});

export { updateAttributes };
