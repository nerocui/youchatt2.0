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
import FirebaseHelper from './firebase';
import Profile from '../model/Profile';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);
export let firebaseHelper;

async function loadInitialState() {
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

	try {
		const profile = await Profile.getCurrentProfile();
		authState = Object.assign({}, authState,{ user: profile});
	} catch(e) {
		//user is not logged in, just console log it for now
		console.log(e);
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

export async function startUp() {
	//if is online, load new in the background with callback for updating local db
	//load local storage
	//initialize initial state with local storage
	//load middleware, thunks
	firebaseHelper = new FirebaseHelper();

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
