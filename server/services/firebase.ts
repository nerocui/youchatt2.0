import * as firebaseAdmin from 'firebase-admin';
var serviceAccount = require("../config/basicchat-dev-firebase-adminsdk-22jr8-c9fe2295e6.json");

export default function initFirebase() {
	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert(serviceAccount),
	});
}
