import * as actions from './actions';
import { appSelectors, appOperations } from '../app';
import { globalContext as ctx } from '../../context';
import { push } from 'react-router-redux';
import { getOneWallet } from './selectors';

const loadWallets = () => async (dispatch, getState) => {
	const config = appSelectors.getAppConfig(getState());
	try {
		await dispatch(appOperations.setAppLoading(true));
		let wallets = await ctx.lwsService.getWallets(config);
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
		if (error.payload.code === 'idw_no_conn') {
			return dispatch(push(`${config.hash}/error/no-idw`));
		}
	} finally {
		await dispatch(appOperations.setAppLoading(false));
	}
};

const unlockWallet = (publicKey, password) => async (dispatch, getState) => {
	const config = appSelectors.getAppConfig(getState());
	try {
		await dispatch(appOperations.setAppLoading(true));
		let wallet = getOneWallet(getState(), publicKey);
		if (wallet && wallet.unlocked) {
			await dispatch(actions.selectWallet(publicKey));
			if (!wallet.signedUp || !(await dispatch(loginWithWallet(wallet.publicKey)))) {
				await dispatch(push(`${config.hash}/auth/attributes`));
			}
			return;
		}
		let unlocked = await ctx.lwsService.unlock(config, publicKey, password);
		if (!unlocked.payload.unlocked) {
			return dispatch(
				actions.updateWallets({ code: 'unlock_failed', message: 'Failed to unlock' }, true)
			);
		}
		if (!unlocked.payload.hasSelfkeyId) {
			return dispatch(push(`${config.hash}/error/no-id`));
		}
		if (config.did && !unlocked.payload.did) {
			return dispatch(push(`${config.hash}/error/no-did`));
		}
		await dispatch(actions.updateWallets(null, true));
		await dispatch(actions.updateOneWallet(unlocked.payload));
		await dispatch(actions.selectWallet(unlocked.payload.publicKey));
		if (
			!unlocked.payload.signedUp ||
			!(await dispatch(loginWithWallet(unlocked.payload.publicKey)))
		) {
			await dispatch(push(`${config.hash}/auth/attributes`));
		}
	} catch (error) {
		console.error(error);
		await dispatch(actions.updateWallets(error.payload, true));
	} finally {
		await dispatch(appOperations.setAppLoading(false));
	}
};

const loginWithWallet = publicKey => async (dispatch, getState) => {
	const config = appSelectors.getAppConfig(getState());
	try {
		let authResp = await ctx.lwsService.sendAuth(config, publicKey);
		await ctx.lwsService.sendWPAuth(authResp.payload, authResp.error);
		await dispatch(push(`${config.hash}/auth/success`));
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export default { ...actions, loadWallets, unlockWallet, loginWithWallet };
