import * as types from './types';

const updateAttributes = (attributes, error) => ({
	type: types.ATTRIBUTES_UPDATE,
	payload: attributes,
	error
});

const setAttributesLoading = loading => ({
	type: types.ATTRIBUTES_SET_LOADING,
	payload: loading
});

export { updateAttributes, setAttributesLoading };
