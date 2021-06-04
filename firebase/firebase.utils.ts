import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import { GenderType } from '../types';

const firebaseConfig = {
  apiKey: 'AIzaSyBIXyRtbJ2S_kLflLICH5_Lnqcl_AAkAgo',
  authDomain: 'facebook-clone-74af5.firebaseapp.com',
  projectId: 'facebook-clone-74af5',
  storageBucket: 'facebook-clone-74af5.appspot.com',
  messagingSenderId: '927630363004',
  appId: '1:927630363004:web:4a028805328c0a98803cf9',
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const createUserProfileDocument = async (
  authUser: firebase.User | null,
  displayName?: string,
  gender?: GenderType,
) => {
  if (!authUser) {
    return;
  }

  const userRef = firestore.doc(`users/${authUser.uid}`);
  const userSnapshot = await userRef.get();

  if (!userSnapshot.exists) {
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email: authUser.email,
        gender,
        createdAt,
      });
    } catch (err) {
      console.error('Error while creating user:', err);
    }
  }

  return userRef;
};

export const getCurrentUser = (): Promise<firebase.User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      unsubscribe();
      resolve(authUser);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = app.firestore();
export const storage = firebase.storage();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
