import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import appReducer from './app';
import attributesReducer from './attributes';
import walletsReducer from './wallets';

export default function configureStore({ initialState = {} }) {
	const rootReducer = combineReducers({
		app: appReducer,
		wallets: walletsReducer,
		routing: routerReducer,
		attributes: attributesReducer
	});
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const middleware = composeEnhancers(applyMiddleware(thunk, routerMiddleware(hashHistory)));
	return createStore(rootReducer, initialState, middleware);
}
