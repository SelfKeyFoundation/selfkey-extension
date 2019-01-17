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

const disallowAttributes = (url, disallow) => ({
	type: types.ATTRIBUTES_DISALLOW,
	payload: { url, disallow }
});

export { updateAttributes, setAttributesLoading, disallowAttributes };
