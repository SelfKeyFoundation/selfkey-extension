export const getAttributes = ({ attributes }) => attributes.list.map(key => attributes.byKey[key]);
export const getLoading = ({ attributes }) => attributes.loading;
export const getDisallowed = ({ attributes }) => {
	return attributes.disallowed.map(key => attributes.byKey[key]);
};
export const getOnlyAllowed = ({ attributes }) =>
	attributes.list
		.filter(k => {
			let attr = attributes.byKey[k];
			if (!attr.data || Object.keys(attr.data).length === 0) {
				return false;
			}
			return attributes.disallowed.indexOf(k) < 0;
		})
		.map(k => attributes.byKey[k]);
