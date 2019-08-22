importScripts('https://www.gstatic.com/firebasejs/5.8.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.8.2/firebase-messaging.js');

var firebaseConfig = require('/Users/neroc/code/youchatt/server/config/basicchat-dev-firebase-adminsdk-22jr8-c9fe2295e6.json')

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(payload => {
	console.log(payload);
});
