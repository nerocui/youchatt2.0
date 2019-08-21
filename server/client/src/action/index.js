import * as TYPE from './type';
import axios from 'axios';

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
