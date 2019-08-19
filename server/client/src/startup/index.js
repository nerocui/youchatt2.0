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
		settingState = {};

	state = {
		authState,
		contactState,
		threadState,
		messageState,
		requestState,
		momentState,
		profileState,
		settingState,
	};
	return state;
}

export function startUp() {
	//load local storage
	//initialize initial state with local storage
	//load middleware, thunks

	const store = createStoreWithMiddleware(
		rootReducer,
		{}
	);
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
