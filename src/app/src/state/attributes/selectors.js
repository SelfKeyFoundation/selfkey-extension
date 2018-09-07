export const getAttributes = ({ attributes }) => attributes.list.map(key => attributes.byKey[key]);
export const getLoading = ({ attributes }) => attributes.loading;
export const getDisallowed = ({ attributes }) => {
	console.log(attributes);
	return attributes.disallowed.map(key => attributes.byKey[key]);
};
export const getOnlyAllowed = ({ attributes }) =>
	attributes.list.filter(k => attributes.disallowed.indexOf(k) < 0).map(k => attributes.byKey[k]);
