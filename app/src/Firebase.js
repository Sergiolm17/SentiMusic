import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
//import "firebase/messaging";
import "firebase/storage";
//import "firebase/analytics";
import "firebase/remote-config";
import "firebase/database";

const config = {
  apiKey: "AIzaSyALTJda55N9Xs_i-dQ5V5BWyR37cU3CMDA",
  authDomain: "domo-music.firebaseapp.com",
  databaseURL: "https://domo-music.firebaseio.com",
  projectId: "domo-music",
  storageBucket: "domo-music.appspot.com",
  messagingSenderId: "550634181029",
  appId: "1:550634181029:web:5f28c1b8216991d346184c",
  measurementId: "G-5S7136XK2T"
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
