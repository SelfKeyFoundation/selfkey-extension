import React, { Component } from 'react';
import './App.css';

class App extends Component {
	componentDidMount() {}
	componentWillUnmount() {}
	render() {
		const { children } = this.props;
		return <div>{children}</div>;
	}
}

export default App;
