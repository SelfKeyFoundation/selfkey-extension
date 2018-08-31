import React, { Component } from 'react';
import { connect } from 'react-redux';
import { walletsOperations } from '../../state/wallets';

class WalletsContainer extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(walletsOperations.loadWallets());
	}
	render() {
		return <div>Wallets</div>;
	}
}

const ConnectedWalletsContainer = connect()(WalletsContainer);

export default ConnectedWalletsContainer;
