import { SET_THREADS, CHAT } from '../action/type';

const initialState = {
	threads: [],
	openedThread: null,
};

export default function(state = initialState, action) {
	switch(action.type) {
		case SET_THREADS:
			console.log('setting threads: ', action);
			return Object.assign({}, state, {threads: action.payload});
		case CHAT:
			return Object.assign({}, state, {openedThread: action.payload});
		default:
			return state;
	}
}
