import { SET_REQUESTS } from '../action/type';

const initialState = {
	requests: [],
};

export default function(state = initialState, action) {
	switch(action.type) {
		case SET_REQUESTS:
			console.log('received some request from action: ', action.payload);
			return Object.assign({}, state, {requests: action.payload});
		default:
			return state;
	}
}

