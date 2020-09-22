import firebase from 'firebase';

export const GOOGLE_AUTH_PROVIDER = new firebase.auth.GoogleAuthProvider();

export const googleLoginHandler = () =>
  firebase.auth().signInWithPopup(GOOGLE_AUTH_PROVIDER);

export const logoutHandler = () => firebase.auth().signOut();
