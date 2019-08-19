import { SET_CONTACTS, CHAT } from '../action/type';

const initialState = {
	contacts: [],
	openedThreadContacts: null,
};

export default function(state = initialState, action) {
	switch(action.type) {
		case SET_CONTACTS:
			return Object.assign({}, state, {contacts: action.payload});
		case CHAT:
			const { contacts } = state;
			console.log('setting contact data: ', contacts);
			console.log('action is: ', action);
			const openedThreadContacts = contacts.filter(contact => action.payload.users.includes(contact._id)) || [];
			return Object.assign({}, state, {openedThreadContacts})
		default:
			return state;
	}
}
