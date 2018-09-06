/* istanbul ignore file */
import { asClass, asValue, asFunction, createContainer, InjectionMode } from 'awilix';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import LwsService from './services/lws-service';
import configureStore from './state/store';

export let globalContext = null;

export const setGlobalContext = ctx => {
	globalContext = ctx;
};

export const configureContext = initialState => {
	const container = createContainer({
		injectionMode: InjectionMode.PROXY
	});
	container.register({
		initialState: asValue(initialState),
		history: asValue(hashHistory),
		store: asFunction(configureStore).singleton(),
		lwsService: asClass(LwsService).singleton(),
		reduxHistory: asFunction(({ history, store }) =>
			syncHistoryWithStore(history, store)
		).singleton()
	});
	return container;
};

export default configureContext;
