export const getAttributes = ({ attributes }) => attributes.list.map(key => attributes.byKey[key]);
export const getLoading = ({ attributes }) => attributes.loading;
