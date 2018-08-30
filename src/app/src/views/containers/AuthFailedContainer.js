import React, { Component } from 'react';
import { connect } from 'react-redux';

class AuthFailedContainer extends Component {
	render() {
		return <div>Auth Failed</div>;
	}
}

const ConnectedAuthFailedContainer = connect()(AuthFailedContainer);

export default ConnectedAuthFailedContainer;
