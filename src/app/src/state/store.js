import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';

export default function configureStore(initialState = {}) {
	const rootReducer = combineReducers({ routing: routerReducer });
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const middleware = composeEnhancers(applyMiddleware(routerMiddleware(hashHistory)));
	return createStore(rootReducer, initialState, middleware);
}
