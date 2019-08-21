import { SEARCH_CONTACTS, REDUCE_SEARCH_RESULT } from '../action/type';

const initialState = {
	results: []
};

export default function(state = initialState, action) {
	switch(action.type) {
		case SEARCH_CONTACTS:
			return Object.assign({}, state, {results: action.payload});
		case REDUCE_SEARCH_RESULT:
			const results = state.results.filter(res => res.id !== action.payload);
			return Object.assign({}, state, {results})
		default:
			return state;
	}
}
