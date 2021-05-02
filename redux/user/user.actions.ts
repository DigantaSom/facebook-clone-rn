import { Dispatch } from 'redux';
import { Alert } from 'react-native';

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
  SIGN_OUT_FAILURE
} from './user.types';

import {
  auth,
  createUserProfileDocument,
  getCurrentUser
} from '../../firebase/firebase.utils';

export const checkUserSession = () => async (
  dispatch: Dispatch<CheckUserSessionDispatchType>
) => {
  dispatch({
    type: CHECK_USER_SESSION
  });
  try {
    const authUser = await getCurrentUser();
    // console.log(authUser);
    if (!authUser) {
      dispatch({
        type: EMAIL_SIGN_IN_FAILURE,
        payload: '' // Not logged in
      });
      return;
    }

    const userRef = await createUserProfileDocument(authUser);
    const userSnapshot = await userRef?.get();

    dispatch({
      type: EMAIL_SIGN_IN_SUCCESS,
      payload: {
        id: userSnapshot?.id,
        ...userSnapshot?.data()
      }
    });
  } catch (err) {
    dispatch({
      type: EMAIL_SIGN_IN_FAILURE,
      payload: err.message
    });
  }
};

export const signUp = ({
  email,
  password,
  displayName
}: {
  email: string;
  password: string;
  displayName: string;
}) => async (dispatch: Dispatch<SignUpDispatchType>) => {
  try {
    dispatch({
      type: SIGN_UP_START
    });

    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    const userRef = await createUserProfileDocument(user, displayName);
    const userSnapshot = await userRef?.get();

    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: {
        id: userSnapshot!.id,
        ...userSnapshot!.data()
      }
    });
  } catch (err) {
    dispatch({
      type: SIGN_UP_FAILURE,
      payload: err.message
    });
    Alert.alert('Error signing up!', err.message, [{ text: 'Got it' }]);
  }
};

export const emailSignIn = ({
  email,
  password
}: {
  email: string;
  password: string;
}) => async (dispatch: Dispatch<EmailSignInDispatchType>) => {
  try {
    dispatch({
      type: EMAIL_SIGN_IN_START
    });

    const { user } = await auth.signInWithEmailAndPassword(email, password);

    const userRef = await createUserProfileDocument(user);
    const userSnapshot = await userRef?.get();

    dispatch({
      type: EMAIL_SIGN_IN_SUCCESS,
      payload: {
        id: userSnapshot?.id,
        ...userSnapshot?.data()
      }
    });
  } catch (err) {
    dispatch({
      type: EMAIL_SIGN_IN_FAILURE,
      payload: err.message
    });
    Alert.alert('Error signing in!', err.message, [{ text: 'Got it' }]);
  }
};

export const signOut = () => async (dispatch: Dispatch<SignOutDispatchType>) => {
  try {
    dispatch({
      type: SIGN_OUT_START
    });
    await auth.signOut();
    dispatch({
      type: SIGN_OUT_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: SIGN_OUT_FAILURE,
      payload: err.message
    });
    Alert.alert('Error signing out!', err.message, [{ text: 'Got it' }]);
  }
};
