import * as firebase from "firebase/app";
import 'firebase/messaging';
import * as serviceworker from '../serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../ui/routes';
import rootReducer from '../reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import { dbStartUp } from './db';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import LoadingPage from '../ui/pages/LoadingPage';
import firebaseConfig from '../keys/fire_base_key';

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}
export const firebaseMessaging = firebase.messaging();

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
	serviceworker.register();
}

export function startUp() {
	//if is online, load new in the background with callback for updating local db
	//load local storage
	//initialize initial state with local storage
	//load middleware, thunks
	firebaseMessaging.requestPermission()
		.then(() => {
			console.log('have permission');
			firebaseMessaging.getToken()
				.then(res => {
					console.log('token: ', res);
				})
				.catch(e => {
					console.log('error: ', e);
				});
		})
		.catch(e => {
			console.log('no permission');
		});
	firebaseMessaging.onMessage(payload => {
		console.log(payload);
	});
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
