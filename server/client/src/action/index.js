import * as TYPE from './type';
import axios from 'axios';
import * as algoliasearch from 'algoliasearch';
import keys from '../keys/api_keys';

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
