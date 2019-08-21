import { OPEN_SIDE_MENU, CLOSE_SIDE_MENU } from '../action/type';

const initialState = {
	sideMenuOpen: false
};

export default function(state = initialState, action) {
	switch(action.type) {
		case OPEN_SIDE_MENU:
			return Object.assign({}, state, {sideMenuOpen: true});
		case CLOSE_SIDE_MENU:
			return Object.assign({}, state, {sideMenuOpen: false});
		default:
			return state;
	}
}
