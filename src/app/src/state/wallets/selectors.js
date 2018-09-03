export const getWallets = ({ wallets }) => wallets.list.map(publicKey => wallets.byKey[publicKey]);

export const getSelected = ({ wallets }) =>
	wallets.selected ? wallets.byKey[wallets.selected] : null;
