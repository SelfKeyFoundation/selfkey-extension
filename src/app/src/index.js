import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import WalletsContainer from './views/containers/WalletsContainer';
import AttributesContainer from './views/containers/AttributesContainer';
import AuthFailedContainer from './views/containers/AuthFailedContainer';
import AuthSuccessContainer from './views/containers/AuthSuccessContainer';
import ErrorNoIdContainer from './views/containers/ErrorNoIdContainer';
import ErrorNoIDWContainer from './views/containers/ErrorNoIDWContainer';

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
				<Route path="/error/no-id" component={ErrorNoIdContainer} />
				<Route path="/error/no-idw" component={ErrorNoIDWContainer} />
				<Route path="/auth/attributes" component={AttributesContainer} />
				<Route path="/auth/success" component={AuthSuccessContainer} />
				<Route path="/auth/failed" component={AuthFailedContainer} />
			</Route>
		</Router>
	</ReduxProvider>
);

ReactDOM.render(<RootHtml />, document.getElementById('root'));
