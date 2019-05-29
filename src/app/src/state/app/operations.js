import * as actions from './actions';
import { globalContext as ctx } from '../../context';
import { push } from 'react-router-redux';
import uuidv1 from 'uuid';

const initApp = hash => async (dispatch, getState) => {
	try {
		await dispatch(actions.setAppLoading(true));
		await dispatch(actions.setAppConfig({ hash }));
		let config = await ctx.lwsService.connect(hash);

		config.attributes = (config.attributes || []).map(attr => {
			if (typeof attr === 'string') {
				attr = { schemaId: attr };
			}
			attr.selected = 0;
			attr.uiId = uuidv1();
			return attr;
		});

		await dispatch(actions.setAppConfig({ ...config, hash }));
		await dispatch(actions.setAppError(null));
		await dispatch(push(`${hash}/wallets`));
	} catch (error) {
		console.error(error);
		await dispatch(actions.setAppError(error));
	} finally {
		await dispatch(actions.setAppLoading(false));
	}
};

const destroyApp = () => async (dispatch, getState) => {
	await ctx.lwsService.disconnect();
	await dispatch(actions.setAppConfig());
};

export default { ...actions, initApp, destroyApp };
