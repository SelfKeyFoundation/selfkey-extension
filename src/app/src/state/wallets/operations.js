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

const unlockWallet = (publicKey, password) => async (dispatch, getState) => {
	const config = appSelectors.getAppConfig(getState());
	try {
		let unlocked = await ctx.lwsService.unlock(config.website, publicKey, password);
		console.log(unlocked.payload);
		if (!unlocked.payload.unlocked) {
			return dispatch(
				actions.updateWallets({ code: 'unlock_failed', message: 'Failed to unlock' }, true)
			);
		}
		await dispatch(actions.updateWallets(null, true));
		await dispatch(actions.updateOneWallet(unlocked.payload));
		console.log(`${config.hash}/auth/attributes`);
		await dispatch(push(`${config.hash}/auth/attributes`));
	} catch (error) {
		console.error(error);
		await dispatch(actions.updateWallets(error.payload, true));
	}
};

export default { ...actions, loadWallets, unlockWallet };
