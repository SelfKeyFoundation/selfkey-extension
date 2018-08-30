export const getWallets = ({ wallets }) => wallets.list.map(wid => wallets.byId[wid]);
