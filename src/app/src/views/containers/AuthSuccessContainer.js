import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LWSSuccess } from '../components';

class AuthSuccessContainer extends Component {
	render() {
		return <LWSSuccess />;
	}
}

const ConnectedAuthSuccessContainer = connect()(AuthSuccessContainer);

export default ConnectedAuthSuccessContainer;
