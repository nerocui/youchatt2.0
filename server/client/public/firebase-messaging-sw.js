importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/lovefield/2.1.12/lovefield.js');

firebase.initializeApp({
	'messagingSenderId': '158609943396'
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
	console.log('Payload is: ', payload);

});

