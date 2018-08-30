import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ErrorNoIDWContainer extends Component {
	render() {
		return (
			<div>
				Error! No Identity wallet
				<a
					href="https://selfkey.org/selfkey-wallet/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Download Idwntity Wallet
				</a>
				<Link to="/">Retry</Link>
			</div>
		);
	}
}

const ConnectedErrorNoIDWContainer = connect()(ErrorNoIDWContainer);

export default ConnectedErrorNoIDWContainer;
