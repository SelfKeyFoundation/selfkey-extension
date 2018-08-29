import * as types from './types';

const updateWallets = wallets => ({
	type: types.WALLETS_UPDATE,
	payload: wallets
});

export { updateWallets };
