import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from '../serviceWorker';
import App from '../ui/routes';
import rootReducer from '../reducer';
import { Provider } from 'react-redux';
import { createStore } from "redux";

const store = createStore(rootReducer);

export function startUp() {
	//load local storage
	//initialize initial state with local storage
	//load middleware, thunks
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
