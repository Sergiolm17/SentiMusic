import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
//import "firebase/messaging";
import "firebase/storage";
//import "firebase/analytics";
import "firebase/remote-config";
import "firebase/database";

const config = {
    apiKey: "AIzaSyCINVDpHZVyWrpGBXCvuP4PekBwFDmnrmI",
    authDomain: "escucharla-app.firebaseapp.com",
    projectId: "escucharla-app",
    storageBucket: "escucharla-app.appspot.com",
    messagingSenderId: "573714902849",
    appId: "1:573714902849:web:3345786fdcd5e0ce4b3bc0",
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
