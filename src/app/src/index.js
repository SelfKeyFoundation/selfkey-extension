import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';

import { syncHistoryWithStore, push } from 'react-router-redux';
import { hashHistory, Router, Route } from 'react-router';

import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './state/store';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);
const reduxHistory = syncHistoryWithStore(hashHistory, reduxStore);

const RootHtml = () => (
	<ReduxProvider store={reduxStore}>
		<Router history={reduxHistory}>
			<Route path="/" component={App} />
			<Route path="/test" component={() => <div>HI</div>} />
		</Router>
	</ReduxProvider>
);

ReactDOM.render(<RootHtml />, document.getElementById('root'));

setTimeout(() => {
	console.log('routing to test');
	reduxStore.dispatch(push('/test'));
}, 5000);
