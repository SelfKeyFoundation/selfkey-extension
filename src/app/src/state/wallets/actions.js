import * as types from './types';

const updateWallets = (wallets, error) => ({
	type: types.WALLETS_UPDATE,
	payload: wallets,
	error
});

const updateOneWallet = wallet => ({
	type: types.WALLETS_UPDATE_ONE,
	payload: wallet
});

const selectWallet = publicKey => ({
	type: types.WALLETS_SELECT,
	payload: publicKey
});

const walletError = error => ({
	type: types.WALLETS_ERROR,
	error: !!error,
	payload: error
});

export { updateWallets, selectWallet, walletError, updateOneWallet };
