import * as TYPE from './type';
import axios from 'axios';
import * as algoliasearch from 'algoliasearch';
import keys from '../keys/algolia_key';
import Profile from '../model/Profile';
import Request from '../model/Request';
import { firebaseHelper } from '../startup';

const client = algoliasearch(keys.algoliaApplicationID, keys.algoliaSearchKey);
const index = client.initIndex('dev_USERS');

function setAuthInfoAction(user) {
	return {
		type: TYPE.SET_AUTH_INFO,
		payload: user,
	};
}

export function updateAuthInfo() {
	return dispatch => {
		console.log("getting current user");
		axios.get(
			'/api/current_user'
		).then(res => {
			dispatch(setAuthInfoAction(res.data));
		});
	};
}

function setSearchResult(res) {
	return {
		type: TYPE.SEARCH_CONTACTS,
		payload: res
	};
}

function reduceSearcResult(id) {
	return {
		type: TYPE.REDUCE_SEARCH_RESULT,
		payload: id,
	};
}

export function searchContacts(term) {
	return dispatch => {
		index.search({query: term})
			.then(({ hits }) => {
				console.log("hits: ", hits);
				dispatch(setSearchResult(hits));
			})
			.catch(e => {
				console.log('errors: ', e);
			});
	};
}

function setSentRequest(res) {
	return {
		type: TYPE.SET_SENT_REQUEST,
		payload: res,
	};
}

export function sendRequest(to_user_id) {
	console.log('setting token, ', to_user_id);
	return dispatch => {
		axios.post('/api/request/add', null, {params: {to_user_id}})
			.then(res => {
				console.log('sent request: ', res);
				dispatch(setSentRequest(res.data));
				dispatch(reduceSearcResult(to_user_id));
			})
			.catch(e => {
				console.log('could not send request: ', e);
			});
	};
}


export function acceptRequest(id) {
	Request.acceptRequest(id);
}

export function declineRequest(id) {
	Request.declineRequest(id);
}

function updateProfileToken(message_token) {
	return {
		type: TYPE.SET_PROFILE_MESSAGE_TOKEN,
		payload: message_token,
	};
}

export function setProfileMessageToken(id) {
	return async (dispatch) => {
		const message_token = await firebaseHelper.rquestPermission();
		console.log("got back the token: ", message_token);
		Profile.setMessageToken(id, message_token);
		dispatch(updateProfileToken(message_token));
	};
}

export function setContacts(contacts) {
	return {
		type: TYPE.SET_CONTACTS,
		payload: contacts,
	};
}

export function contactsChangeHandler(changes) {
	if (!changes||changes.length === 0) {
		return;
	}
	const { object } = changes[0];
	return dispatch => {
		console.log('Detected contacts change: ', object);
		dispatch(setContacts(object));
	}
}

export function setThreads(threads) {
	return {
		type: TYPE.SET_THREADS,
		payload: threads,
	};
}

export function setRequests(requests) {
	return {
		type: TYPE.SET_REQUESTS,
		payload: requests,
	};
}

export function requestsChangeHandler(changes) {
	if (!changes||changes.length === 0) {
		return;
	}
	const { object } = changes[0];
	return dispatch => {
		console.log('hello', object);
		dispatch(setRequests(object));
	};
}

export function chat(thread) {
	return {
		type: TYPE.CHAT,
		payload: thread,
	};
}

function setLogoutState() {
	return {
		type: TYPE.LOGOUT
	};
}

export function logout() {
	return dispatch => {
		Profile.logout()
			.catch(err => {
				console.log('Error logging out: ', err);
			})
			.finally(() => {
				dispatch(setLogoutState());
			});
	};
}


export function openSideMenu() {
	return {
		type: TYPE.OPEN_SIDE_MENU
	};
}

export function closeSideMenu() {
	return {
		type: TYPE.CLOSE_SIDE_MENU
	};
}
