import { SET_AUTH_INFO, LOGOUT, SET_PROFILE_MESSAGE_TOKEN } from '../action/type';

const initialState = {
	user: null,
	loggedIn: false,
};

export default function(state = initialState, action) {
	switch(action.type) {
		case SET_AUTH_INFO:
			return Object.assign({}, state, {user: action.payload, loggedIn: !!action.payload});
		case SET_PROFILE_MESSAGE_TOKEN:
			const user = Object.assign({}, state.user, {message_token: action.payload});
			return Object.assign({}, state, {user});
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
}
