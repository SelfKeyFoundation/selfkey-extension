import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import appReducer from './app';

export default function configureStore({ initialState = {} }) {
	const rootReducer = combineReducers({ app: appReducer, routing: routerReducer });
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const middleware = composeEnhancers(applyMiddleware(thunk, routerMiddleware(hashHistory)));
	return createStore(rootReducer, initialState, middleware);
}
