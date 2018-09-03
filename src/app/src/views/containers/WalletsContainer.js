import React, { Component } from 'react';
import { connect } from 'react-redux';
import { walletsOperations, walletsSelectors } from '../../state/wallets';
import { LWSSelectWallet } from 'selfkey-ui';

class WalletsContainer extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(walletsOperations.loadWallets());
	}
	handleLogin = (publicKey, password) => {
		this.props.dispatch(walletsOperations.unlockWallet(publicKey, password));
	};
	render() {
		const { wallets } = this.props;
		return <LWSSelectWallet wallets={wallets} loginAction={this.handleLogin} />;
	}
}

const ConnectedWalletsContainer = connect(state => ({
	wallets: walletsSelectors.getWallets(state),
	selectedWallet: walletsSelectors.getSelected(state)
}))(WalletsContainer);

export default ConnectedWalletsContainer;
