import * as actions from './actions';
import { globalContext as ctx } from '../../context';

const initApp = hash => async (dispatch, getState) => {
	try {
		await dispatch(actions.setAppLoading(true));
		await dispatch(actions.setAppConfig({ hash }));
		let config = await ctx.lwsService.connect(hash);
		await dispatch(actions.setAppConfig(config));
		await dispatch(actions.setAppError(null));
		return config;
	} catch (error) {
		console.error(error);
		await dispatch(actions.setAppError(error));
		return error;
	} finally {
		await dispatch(actions.setAppLoading(false));
	}
};

export default { ...actions, initApp };
