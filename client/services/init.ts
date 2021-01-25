// Add the Firebase products that you want to use
import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import { ENV_VARIABLES } from '../project.config';

if (!firebase.apps.length) {
  firebase.initializeApp(ENV_VARIABLES.firebase);

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
