import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { appOperations } from '../state/app';

class App extends Component {
	async componentDidMount() {
		const { dispatch } = this.props;
		await dispatch(appOperations.initApp(this.props.params.hash));
	}
	componentWillUnmount() {}
	render() {
		const { children } = this.props;
		if (this.props.loading) {
			return <div>Loading</div>;
		}
		return <div>{children}</div>;
	}
}

const connectedApp = connect()(App);

export default connectedApp;
