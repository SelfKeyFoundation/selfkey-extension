import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ErrorNoIdContainer extends Component {
	render() {
		const retryUrl = `/${this.props.params.hash}/wallets`;
		return (
			<div>
				Error! No id
				<Link to={retryUrl}>Retry</Link>
			</div>
		);
	}
}

const ConnectedErrorNoIdContainer = connect()(ErrorNoIdContainer);

export default ConnectedErrorNoIdContainer;
