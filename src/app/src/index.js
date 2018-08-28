import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import registerServiceWorker from './registerServiceWorker';

import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './state/store';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);
const history = syncHistoryWithStore(browserHistory, reduxStore);

const RootHtml = () => (
	<ReduxProvider store={reduxStore}>
		<Router history={history}>
			<App />
		</Router>
	</ReduxProvider>
);

ReactDOM.render(<RootHtml />, document.getElementById('root'));
registerServiceWorker();
