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
import notificationHandler from '../utils/notification/handler';
import Request from '../model/Request';
import lf from 'lovefield';
import { APP_NAME } from '../config/app';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);
export let firebaseHelper;
export let db;
export const schemaBuilder = lf.schema.create(APP_NAME, 1);

function loadInitialState(db_param) {
	db = db_param;
	return new Promise(async (resolve, reject) => {
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
			const requests = await Request.getAllRequest(profile.id);
			authState = Object.assign({}, authState,{ user: profile});
			requestState = Object.assign({}, requestState, { requests });


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
			resolve(state);
		} catch(e) {
			//user is not logged in, just console log it for now
			console.log(e);
			resolve(state);
		}
	});
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
	ReactDOM.render(
		<LoadingPage />,
		document.getElementById('root')
	);
	firebaseHelper = new FirebaseHelper();
	firebaseHelper.setMessageHandler(notificationHandler);
	dbStartUp(schemaBuilder);
	schemaBuilder.connect()
		.then(db => {
			loadInitialState(db).then(initialState => {
				const store = createStoreWithMiddleware(
					rootReducer,
					initialState,
				);
				renderApp(store);
			});
		})
		.catch(e => {
			console.log(e);
		});
}
