import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
	// Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyCvcknNSS4DG-j0qa4BDf0UTrVEmd1l3-c",
  authDomain: "notification-web-ec87d.firebaseapp.com",
  databaseURL: "https://notification-web-ec87d.firebaseio.com",
  projectId: "notification-web-ec87d",
  storageBucket: "notification-web-ec87d.appspot.com",
  messagingSenderId: "616686349035",
  appId: "1:616686349035:web:c42573857374111b596cae"
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
	// Project Settings => Cloud Messaging => Web Push certificates
  "BOmKlWMiJ4i-_HcKr6gxEKRi1w3VGoOzWjy9ZZ_mNys13aupdQafonK1hQIunSGDo7dP79n7duPfiDrgQI_HCO8"
);
export { messaging };