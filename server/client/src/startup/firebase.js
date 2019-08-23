import * as firebase from "firebase/app";
import 'firebase/messaging';
import firebaseConfig from '../keys/fire_base_key';

export default class FirebaseHelper {

	constructor() {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		this.messaging = firebase.messaging();
	}

	async rquestPermission(handler) {
		try {
			await this.messaging.requestPermission();
			console.log('have permission');
			const token = await this.messaging.getToken();
			console.log('token is: ', token);
			return token;
		} catch(e) {
			console.log('error: ', e);
		}
	}

	setMessageHandler(handler) {
		this.messaging.onMessage = handler;
	}
}

