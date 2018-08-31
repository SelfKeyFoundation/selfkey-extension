import * as types from './types';

const updateWallets = (wallets, error) => ({
	type: types.WALLETS_UPDATE,
	payload: wallets,
	error
});

export { updateWallets };
