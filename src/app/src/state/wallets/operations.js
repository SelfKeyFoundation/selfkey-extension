import * as actions from './actions';
import { appSelectors } from '../app';
import { globalContext as ctx } from '../../context';
import { push } from 'react-router-redux';

const loadWallets = () => async (dispatch, getState) => {
	const config = appSelectors.getAppConfig(getState());
	try {
		let wallets = await ctx.lwsService.getWalelts(config.website);
		if (!wallets.payload.length) {
			// eslint-disable-next-line no-throw-literal
			throw { error: true, payload: { code: 'no_id', message: 'No selfkey ID' } };
		}
		await dispatch(actions.updateWallets(wallets.payload));
	} catch (error) {
		await dispatch(actions.updateWallets(error.payload, true));
		if (!error.payload) {
			console.error('unknown error', error);
			return;
		}
		if (error.payload.code === 'no_id') {
			return dispatch(push(`${config.hash}/error/no-id`));
		}
		if (error.payload.code === 'idw_no_conn') {
			return dispatch(push(`${config.hash}/error/no-idw`));
		}
	}
};

export default { ...actions, loadWallets };
