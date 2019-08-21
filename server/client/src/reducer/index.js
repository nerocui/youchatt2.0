import { combineReducers } from "redux";
import AuthReducer from './reducer_auth';
import ContactReducer from './reducer_contact';
import ThreadReducer from './reducer_thread';
import RequestReducer from './reducer_request';
import UIReducer from './reducer_ui';

const rootReducer = combineReducers({
	uiState: UIReducer,
	authState: AuthReducer,
	contactState: ContactReducer,
	threadState: ThreadReducer,
	requestState: RequestReducer,
});

export default rootReducer;
