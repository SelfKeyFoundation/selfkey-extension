import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletsContainer extends Component {
	render() {
		return <div>Wallets</div>;
	}
}

const ConnectedWalletsContainer = connect()(WalletsContainer);

export default ConnectedWalletsContainer;
