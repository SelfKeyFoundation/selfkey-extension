export const getAttributes = ({ attributes }) => attributes.list.map(key => attributes.byUrl[key]);
export const getLoading = ({ attributes }) => attributes.loading;
export const getDisallowed = ({ attributes }) => {
	return attributes.disallowed;
};
export const getOnlyAllowed = ({ attributes }) =>
	attributes.list
		.filter(k => {
			let attr = attributes.byUrl[k];
			if (!attr.data || Object.keys(attr.data).length === 0) {
				return false;
			}
			return attributes.disallowed.indexOf(k) < 0;
		})
		.map(k => attributes.byUrl[k]);
