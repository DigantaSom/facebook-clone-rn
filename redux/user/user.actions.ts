import { Dispatch } from 'redux';
import { Alert, Platform } from 'react-native';

import {
  CheckUserSessionDispatchType,
  CHECK_USER_SESSION,
  EmailSignInDispatchType,
  EMAIL_SIGN_IN_FAILURE,
  EMAIL_SIGN_IN_START,
  EMAIL_SIGN_IN_SUCCESS,
  SignUpDispatchType,
  SIGN_UP_FAILURE,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SignOutDispatchType,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  IUser,
  UpdateProfilePictureDispatchType,
  UPDATE_PROFILE_PIC_START,
  UPDATE_PROFILE_PIC_FAILURE,
  UPDATE_PROFILE_PIC_SUCCESS,
} from './user.types';
import { BlobType } from '../../types';

import firebase from '../../firebase/firebase.utils';
import {
  auth,
  firestore,
  storage,
  createUserProfileDocument,
  getCurrentUser,
} from '../../firebase/firebase.utils';

export const checkUserSession = () => async (
  dispatch: Dispatch<CheckUserSessionDispatchType>,
) => {
  dispatch({
    type: CHECK_USER_SESSION,
  });
  try {
    const authUser = await getCurrentUser();
    // console.log(authUser);
    if (!authUser) {
      dispatch({
        type: EMAIL_SIGN_IN_FAILURE,
        payload: '', // Not logged in
      });
      return;
    }

    const userRef = await createUserProfileDocument(authUser);
    const userSnapshot = await userRef?.get();

    dispatch({
      type: EMAIL_SIGN_IN_SUCCESS,
      payload: {
        id: userSnapshot?.id,
        ...userSnapshot?.data(),
      },
    });
  } catch (err) {
    dispatch({
      type: EMAIL_SIGN_IN_FAILURE,
      payload: err.message,
    });
  }
};

export const signUp = ({
  email,
  password,
  displayName,
}: {
  email: string;
  password: string;
  displayName: string;
}) => async (dispatch: Dispatch<SignUpDispatchType>) => {
  try {
    dispatch({
      type: SIGN_UP_START,
    });

    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    const userRef = await createUserProfileDocument(user, displayName);
    const userSnapshot = await userRef?.get();

    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: {
        id: userSnapshot!.id,
        ...userSnapshot!.data(),
      },
    });

    try {
      const profileRef = firestore.collection('profiles').doc(userSnapshot!.id);

      profileRef.set({
        userId: userSnapshot!.id,
        displayName,
        joined: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.log('Error while taking profile picture to profile collection:', err);
      // TODO: dispatch some profile action and make an Alert.
    }
  } catch (err) {
    dispatch({
      type: SIGN_UP_FAILURE,
      payload: err.message,
    });
    Alert.alert('Error signing up!', err.message, [{ text: 'Got it' }]);
  }
};

export const emailSignIn = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => async (dispatch: Dispatch<EmailSignInDispatchType>) => {
  try {
    dispatch({
      type: EMAIL_SIGN_IN_START,
    });

    const { user } = await auth.signInWithEmailAndPassword(email, password);

    const userRef = await createUserProfileDocument(user);
    const userSnapshot = await userRef?.get();

    dispatch({
      type: EMAIL_SIGN_IN_SUCCESS,
      payload: {
        id: userSnapshot?.id,
        ...userSnapshot?.data(),
      },
    });
  } catch (err) {
    dispatch({
      type: EMAIL_SIGN_IN_FAILURE,
      payload: err.message,
    });
    Alert.alert('Error signing in!', err.message, [{ text: 'Got it' }]);
  }
};

export const signOut = () => async (dispatch: Dispatch<SignOutDispatchType>) => {
  try {
    dispatch({
      type: SIGN_OUT_START,
    });
    await auth.signOut();
    dispatch({
      type: SIGN_OUT_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: SIGN_OUT_FAILURE,
      payload: err.message,
    });
    Alert.alert('Error signing out!', err.message, [{ text: 'Got it' }]);
  }
};

export const updateProfilePic = (
  currentUser: IUser,
  imageUri: string,
  caption: string,
) => async (dispatch: Dispatch<UpdateProfilePictureDispatchType>) => {
  // const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;

  const blob: BlobType = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uploadUri, true);
    xhr.send(null);
  });

  const ref = storage
    .ref(`profile_pics/${currentUser.displayName}`)
    .child(new Date().toISOString());

  const snapshot = ref.put(blob);

  snapshot.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    () => {
      dispatch({
        type: UPDATE_PROFILE_PIC_START,
      });
    },
    err => {
      dispatch({
        type: UPDATE_PROFILE_PIC_FAILURE,
        payload: err.message,
      });
      Alert.alert('Error uploading profile pic', err.message, [{ text: 'Okay' }]);
      console.log('Error uploading profile pic:', err);
      // blob.close();
      return;
    },
    () => {
      // success function
      snapshot.snapshot.ref.getDownloadURL().then(async url => {
        const userRef = firestore.doc(`users/${currentUser.id}`);
        const profilePicsAlbum_Ref = firestore
          .collection('albums')
          .doc(currentUser.id)
          .collection('profile_pics')
          .doc();
        const profileRef = firestore.doc(`profiles/${currentUser.id}`);

        const newProfilePicObj = {
          imageUri: url,
          caption,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };

        try {
          const batch = firestore.batch();

          batch.update(userRef, {
            profilePic: newProfilePicObj,
          });
          batch.set(profilePicsAlbum_Ref, newProfilePicObj);
          batch.update(profileRef, {
            profilePic: newProfilePicObj,
          });

          await batch.commit();

          dispatch({
            type: UPDATE_PROFILE_PIC_SUCCESS,
            payload: newProfilePicObj,
          });
          Alert.alert(
            'Profile Picture updated!',
            'Your new Profile Picture is set successfully.',
            [{ text: 'Noice!' }],
          );
        } catch (err) {
          dispatch({
            type: UPDATE_PROFILE_PIC_FAILURE,
            payload: err.message,
          });
          Alert.alert('Error uploading profile pic', err.message, [{ text: 'Okay' }]);
          console.log('Error uploading profile pic:', err);
        }

        return url;
      });
    },
  );
};
