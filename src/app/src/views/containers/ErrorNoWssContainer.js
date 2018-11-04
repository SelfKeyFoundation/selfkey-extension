import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { LWSWssError } from 'selfkey-ui';
class ErrorNoWssContainer extends Component {
	retryAction = evt => {
		evt.preventDefault();
		const retryUrl = `/${this.props.params.hash}/wallets`;
		this.props.dispatch(push(retryUrl));
	};
	render() {
		return <LWSWssError retryAction={this.retryAction} />;
	}
}

const ConnectedErrorNoWssContainer = connect()(ErrorNoWssContainer);

export default ConnectedErrorNoWssContainer;
