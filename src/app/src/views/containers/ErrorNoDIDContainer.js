import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { LWSSelfkeyDIDError } from '../components';
class ErrorNoDIDContainer extends Component {
	retryAction = evt => {
		evt.preventDefault();
		const retryUrl = `/${this.props.params.hash}/wallets`;
		this.props.dispatch(push(retryUrl));
	};
	render() {
		return <LWSSelfkeyDIDError retryAction={this.retryAction} />;
	}
}

const ConnectedErrorNoDIDContainer = connect()(ErrorNoDIDContainer);

export default ConnectedErrorNoDIDContainer;
