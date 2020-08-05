importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

firebase.initializeApp({
	// Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyCvcknNSS4DG-j0qa4BDf0UTrVEmd1l3-c",
  authDomain: "notification-web-ec87d.firebaseapp.com",
  databaseURL: "https://notification-web-ec87d.firebaseio.com",
  projectId: "notification-web-ec87d",
  storageBucket: "notification-web-ec87d.appspot.com",
  messagingSenderId: "616686349035",
  appId: "1:616686349035:web:c42573857374111b596cae"
});
if (firebase.messaging.isSupported()){
  const messaging = firebase.messaging();
  messaging.setBackgroundMessageHandler(function(payload) {
    const promiseChain = clients
      .matchAll({
        type: "window",
        includeUncontrolled: true
      })
      .then(windowClients => {
        for (let i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];
          windowClient.postMessage(payload);
        }
      })
      .then(() => {
        const title = payload.data.title;
        const options = {
            body: payload.data.message,
            link: payload.data.link,
        };
        // console.log(options);
        return registration.showNotification(title, options);
      });
    return promiseChain;
  });
  self.addEventListener('notificationclick', function(event) {
    // do what you want
    // ...
    // messaging.onMessage((payload) => {
    //   console.log(payload);
    // })
    // if (event.action) {
    //   clients.openWindow(event.action);
    // }
    // event.notification.close();
  });
}