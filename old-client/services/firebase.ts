// Add the Firebase products that you want to use
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';

import firebase from 'firebase/app';

if (!firebase.apps.length) {
  firebase.initializeApp(process.env.firebase);

  // if (process.env.NODE_ENV === 'development') {
  //   firebase.auth().useEmulator('http://localhost:9099/');
  //   firebase.database().useEmulator('localhost', 9000);
  //   firebase.firestore().useEmulator('localhost', 8080);
  //   firebase.functions().useEmulator('localhost', 5001);
  // }

  if (typeof window !== 'undefined') {
    window.analytics = firebase.analytics();
  }
}
