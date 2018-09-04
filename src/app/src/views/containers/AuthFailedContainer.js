import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LWSAuthError } from 'selfkey-ui';
import { appSelectors } from '../../state/app';
import { push } from 'react-router-redux';

class AuthFailedContainer extends Component {
	handleRetry = evt => {
		evt.preventDefault();
		const { config } = this.props;
		this.props.dispatch(push(`${config.hash}/wallets`));
	};
	render() {
		console.log('auth error render');
		return <LWSAuthError website={this.props.config.website} retryAction={this.handleRetry} />;
	}
}

const ConnectedAuthFailedContainer = connect(state => ({
	config: appSelectors.getAppConfig(state)
}))(AuthFailedContainer);

export default ConnectedAuthFailedContainer;
