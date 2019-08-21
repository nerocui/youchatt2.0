import { SEARCH_CONTACTS } from '../action/type';

const initialState = {
	results: []
};

export default function(state = initialState, action) {
	switch(action.type) {
		case SEARCH_CONTACTS:
			return Object.assign({}, state, {results: action.payload});
		default:
			return state;
	}
}
