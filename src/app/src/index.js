import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import WalletsContainer from './views/containers/WalletsContainer';
import AttributesContainer from './views/containers/AttributesContainer';

import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';

import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './state/store';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);
const reduxHistory = syncHistoryWithStore(hashHistory, reduxStore);

const RootHtml = () => (
	<ReduxProvider store={reduxStore}>
		<Router history={reduxHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={WalletsContainer} />
				<Route path="/attributes" component={AttributesContainer} />
			</Route>
		</Router>
	</ReduxProvider>
);

ReactDOM.render(<RootHtml />, document.getElementById('root'));
