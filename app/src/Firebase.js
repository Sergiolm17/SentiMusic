import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
//import "firebase/messaging";
import "firebase/storage";
//import "firebase/analytics";
import "firebase/remote-config";

const config = {
  apiKey: "AIzaSyAgX9zT5RdrMIqNiwmPjs8WwenVDGgvgPk",
  authDomain: "voto-bech.firebaseapp.com",
  databaseURL: "https://voto-bech.firebaseio.com",
  projectId: "voto-bech",
  storageBucket: "voto-bech.appspot.com",
  messagingSenderId: "318165377147",
  appId: "1:318165377147:web:c7cfc484ab73d99367c2de"
};

firebase.initializeApp(config);
firebase.auth().useDeviceLanguage();
/*
firebase.analytics().setUserProperties("appVersion", 1.0);
export const analytics = firebase.analytics();
const remoteConfig = firebase.remoteConfig();
remoteConfig.settings = {
  minimumFetchIntervalMillis: 3600000 //3600000
};
export const remote = remoteConfig;
//firebase.auth().settings.appVerificationDisabledForTesting = true;

//export var perf = firebase.performance();

*/
export default firebase;
