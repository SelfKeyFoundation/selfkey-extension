export const getWallets = ({ wallets }) => wallets.list.map(publicKey => wallets.byKey[publicKey]);

export const getOneWallet = ({ wallets }, publicKey) => wallets.byKey[publicKey];

export const getSelected = state =>
	state.wallets.selected ? getOneWallet(state, state.wallets.selected) : null;

export const getError = ({ wallets }) => wallets.error;
