import React, { Component } from 'react';
import { connect } from 'react-redux';

class AuthSuccessContainer extends Component {
	render() {
		return <div>Auth Success</div>;
	}
}

const ConnectedAuthSuccessContainer = connect()(AuthSuccessContainer);

export default ConnectedAuthSuccessContainer;
