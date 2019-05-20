import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { LWSSelfkeyIdError } from '../components';
class ErrorNoIdContainer extends Component {
	retryAction = evt => {
		evt.preventDefault();
		const retryUrl = `/${this.props.params.hash}/wallets`;
		this.props.dispatch(push(retryUrl));
	};
	render() {
		return <LWSSelfkeyIdError retryAction={this.retryAction} />;
	}
}

const ConnectedErrorNoIdContainer = connect()(ErrorNoIdContainer);

export default ConnectedErrorNoIdContainer;
