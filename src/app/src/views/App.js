import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { appOperations } from '../state/app';
import { LWSLoading } from 'selfkey-ui';
import { getAppLoading, getAppError } from '../state/app/selectors';
class App extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(appOperations.initApp(this.props.params.hash));
	}
	componentWillUnmount() {
		const { dispatch } = this.props;
		dispatch(appOperations.destroyApp());
	}
	render() {
		const { children, loading, error } = this.props;
		let hcss = {
			color: '#23E6FE',
			fontSize: '16px'
		};
		let pcss = {
			color: '#23E6FE',
			fontSize: '12px'
		};
		if (loading) {
			return (
				<div>
					<h1 style={hcss}>Connecting please wait...</h1>
					<p style={pcss}>
						if this is your first time using SelfKey Connect please check the SelfKey
						Identity Wallet for steps to set up a secure connection
					</p>
					<LWSLoading />
				</div>
			);
		}
		if (error) {
			return <h1>Error: {error.message}</h1>;
		}
		return <div>{children}</div>;
	}
}

const connectedApp = connect(state => ({
	loading: getAppLoading(state),
	error: getAppError(state)
}))(App);

export default connectedApp;
