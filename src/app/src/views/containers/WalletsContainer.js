import React, { Component } from 'react';
import { connect } from 'react-redux';
import { walletsOperations, walletsSelectors } from '../../state/wallets';
import { LWSSelectWallet, LWSLoading } from '../components';

class WalletsContainer extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		if (!this.props.wallets || !this.props.wallets.length) {
			dispatch(walletsOperations.loadWallets());
		}
	}
	handleLogin = (wallet, password) => {
		this.props.dispatch(walletsOperations.unlockWallet(wallet.publicKey, password));
	};
	handleLedgerConnect = () => {
		console.log('XXX ledger connect');
	};
	render() {
		const { wallets, error } = this.props;
		if (!wallets || !wallets.length) {
			return <LWSLoading />;
		}
		return (
			<LWSSelectWallet
				wallets={wallets}
				loginAction={this.handleLogin}
				onLedgerConnect={this.handleLedgerConnect}
				passwordError={!!error}
			/>
		);
	}
}

const ConnectedWalletsContainer = connect(state => ({
	wallets: walletsSelectors.getWallets(state),
	error: walletsSelectors.getError(state)
}))(WalletsContainer);

export default ConnectedWalletsContainer;
