import {
	SET_AUTH_INFO,
	LOGOUT,
	SET_CONTACTS,
	SET_REQUESTS,
	SET_THREADS,
	CHAT,
} from './type';
import axios from 'axios';

function setAuthInfoAction(user) {
	return {
		type: SET_AUTH_INFO,
		payload: user,
	};
}

export function updateAuthInfo() {
	return dispatch => {
		axios.get(
			'/api/current_user'
		).then(res => {
			dispatch(setAuthInfoAction(res));
		});
	};
}

export function setContacts(contacts) {
	return {
		type: SET_CONTACTS,
		payload: contacts,
	};
}

export function setThreads(threads) {
	return {
		type: SET_THREADS,
		payload: threads,
	};
}

export function setRequests(requests) {
	return {
		type: SET_REQUESTS,
		payload: requests,
	};
}

export function chat(thread) {
	return {
		type: CHAT,
		payload: thread,
	};
}

export function logout() {
	return {
		type: LOGOUT
	};
}
