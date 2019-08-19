import { SET_AUTH_INFO, LOGOUT } from '../action/type';

const initialState = {
	user: null,
	loggedIn: false,
};

export default function(state = initialState, action) {
	console.log('received action:', action);
	switch(action.type) {
		case SET_AUTH_INFO:
			const newState = Object.assign({}, state, {user: action.payload, loggedIn: !!action.payload});
			console.log('returning new state: ', newState);
			return newState;
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
}
