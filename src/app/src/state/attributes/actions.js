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

const disallowAttributes = (uiId, disallow) => ({
	type: types.ATTRIBUTES_DISALLOW,
	payload: { uiId, disallow }
});

const selectAttributeOption = (uiId, option) => ({
	type: types.ATTRIBUTES_OPTION_SELECT,
	payload: { uiId, option }
});

export { updateAttributes, setAttributesLoading, disallowAttributes, selectAttributeOption };
