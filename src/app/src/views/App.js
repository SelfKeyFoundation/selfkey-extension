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
		if (loading) {
			return <LWSLoading />;
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
