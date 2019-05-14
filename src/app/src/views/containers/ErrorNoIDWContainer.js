import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { LWSWalletConnectionError } from '../components';
class ErrorNoIDWContainer extends Component {
	retryAction = evt => {
		evt.preventDefault();
		const retryUrl = `/${this.props.params.hash}/wallets`;
		this.props.dispatch(push(retryUrl));
	};

	downloadWalletAction = evt => {
		evt.preventDefault();
		var a = document.createElement('a');
		a.target = '_blank';
		a.href = 'https://selfkey.org/selfkey-wallet/';
		a.click();
	};

	render() {
		return (
			<LWSWalletConnectionError
				retryAction={this.retryAction}
				downloadWalletAction={this.downloadWalletAction}
			/>
		);
	}
}

const ConnectedErrorNoIDWContainer = connect()(ErrorNoIDWContainer);

export default ConnectedErrorNoIDWContainer;
