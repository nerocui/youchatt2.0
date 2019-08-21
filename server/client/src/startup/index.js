import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from '../serviceWorker';
import App from '../ui/routes';
import rootReducer from '../reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import { dbStartUp } from './db';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import LoadingPage from '../ui/pages/LoadingPage';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);

function loadInitialState() {
	let state = {},
		authState = {},
		contactState = {},
		threadState = {},
		messageState = {},
		requestState = {},
		momentState = {},
		profileState = {},
		uiState = {},
		settingState = {};

	uiState = {
		sideMenuOpen: false,
	}
	state = {
		authState,
		contactState,
		threadState,
		messageState,
		requestState,
		momentState,
		profileState,
		uiState,
		settingState,
	};
	return state;
}

export function renderApp(store) {
	ReactDOM.render(
		(
			<Provider store={store}>
				<App />
			</Provider>
		),
		document.getElementById('root')
	);
	serviceWorker.unregister();
}

export function startUp() {
	//if is online, load new in the background with callback for updating local db
	//load local storage
	//initialize initial state with local storage
	//load middleware, thunks

	ReactDOM.render(
		(
			<LoadingPage />
		),
		document.getElementById('root')
	);

	const store = createStoreWithMiddleware(
		rootReducer,
		loadInitialState(),
	);

	setTimeout(() => renderApp(store), 300);
	
	
}
