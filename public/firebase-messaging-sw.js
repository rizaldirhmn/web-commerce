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
          body: payload.data.body,
          click_action: payload.data.url, // To handle notification click when notification is moved to notification tray
          icon: payload.data.icon,
          data: {
            click_action: payload.data.url
          }
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
  // document.location.href = `https://youtube.com/${event.notification.data.click_action}`;
  let url = `${event.notification.data.click_action}`
  event.notification.close()
  event.waitUntil(
    clients.matchAll({type: 'window'}).then( windowClients => {
        // Check if there is already a window/tab open with the target URL
        for (var i = 0; i < windowClients.length; i++) {
            var client = windowClients[i];
            // If so, just focus it.
            if (client.url === url && 'focus' in client) {
                return client.focus();
            }
        }
        // If not, then open the target URL in a new window/tab.
        if (clients.openWindow) {
            return clients.openWindow(url);
        }
    })
  )
  console.log(event)
});