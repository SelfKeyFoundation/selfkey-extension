import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import registerServiceWorker from './registerServiceWorker';

import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory, Router, Route } from 'react-router';

import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './state/store';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);
const history = syncHistoryWithStore(browserHistory, reduxStore);

const RootHtml = () => (
	<ReduxProvider store={reduxStore}>
		<Router history={history}>
			<Route path="/" component={App} />
		</Router>
	</ReduxProvider>
);

ReactDOM.render(<RootHtml />, document.getElementById('root'));
registerServiceWorker();
