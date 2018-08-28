import { createStore, applyMiddleware, combineReducers } from 'redux';
import * as errorReducer from './error';

export default function configureStore(initialState = {}) {
	const rootReducer = combineReducers({ errorReducer });
	return createStore(
		rootReducer,
		initialState,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		applyMiddleware()
	);
}
