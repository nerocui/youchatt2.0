import { SET_AUTH_INFO, LOGOUT } from '../action/type';

const initialState = {
	user: null,
	loggedIn: false,
};

export default function(state = initialState, action) {
	switch(action.type) {
		case SET_AUTH_INFO:
			return Object.assign({}, state, {user: action.payload, loggedIn: !action.payload});
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
}
