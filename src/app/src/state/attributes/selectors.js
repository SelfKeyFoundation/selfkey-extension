export const getAttributes = ({ attributes }) => attributes.list.map(key => attributes.byUiId[key]);
export const getLoading = ({ attributes }) => attributes.loading;
export const getDisallowed = ({ attributes }) => {
	return attributes.disallowed;
};
export const getOnlyAllowed = ({ attributes }) =>
	attributes.list
		.filter(k => {
			return attributes.disallowed.indexOf(k) < 0;
		})
		.map(k => attributes.byUiId[k]);
