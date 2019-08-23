import * as TYPE from './type';
import axios from 'axios';
import * as algoliasearch from 'algoliasearch';
import keys from '../keys/api_keys';
import Profile from '../model/Profile';
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
	console.log('setting token');
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

export function chat(thread) {
	return {
		type: TYPE.CHAT,
		payload: thread,
	};
}

export function logout() {
	return {
		type: TYPE.LOGOUT
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
