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
import { SelfkeyDarkTheme } from 'selfkey-ui';
import { Router, Route } from 'react-router';

import { Provider as ReduxProvider } from 'react-redux';
import { setGlobalContext, configureContext } from './context';

const ctx = configureContext(window.REDUX_INITIAL_DATA).cradle;
setGlobalContext(ctx);

// ctx.store.subscribe(() => {
// 	console.log('XXX', ctx.store.getState());
// });

const RootHtml = () => (
	<SelfkeyDarkTheme>
		<ReduxProvider store={ctx.store}>
			<Router history={ctx.reduxHistory}>
				<Route path="/:hash" component={App}>
					<Route path="wallets" component={WalletsContainer} />
					<Route path="error/no-id" component={ErrorNoIdContainer} />
					<Route path="error/no-idw" component={ErrorNoIDWContainer} />
					<Route path="auth/attributes" component={AttributesContainer} />
					<Route path="auth/success" component={AuthSuccessContainer} />
					<Route path="auth/failed" component={AuthFailedContainer} />
				</Route>
			</Router>
		</ReduxProvider>
	</SelfkeyDarkTheme>
);

ReactDOM.render(<RootHtml />, document.getElementById('root'));
