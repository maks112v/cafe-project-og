// Add the Firebase products that you want to use
import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';

if (!firebase.apps.length) {
  firebase.initializeApp(process.env.firebase);
}
