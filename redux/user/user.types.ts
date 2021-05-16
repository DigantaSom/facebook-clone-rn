import firebase from '../../firebase/firebase.utils';
import { ProfileAndCoverPicType } from '../../types';
import { IUpdateProfilePicInProfile } from '../profile/profile.types';

export const CHECK_USER_SESSION = 'CHECK_USER_SESSION';

export const SIGN_UP_START = 'SIGN_UP_START';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const EMAIL_SIGN_IN_START = 'EMAIL_SIGN_IN_START';
export const EMAIL_SIGN_IN_SUCCESS = 'EMAIL_SIGN_IN_SUCCESS';
export const EMAIL_SIGN_IN_FAILURE = 'EMAIL_SIGN_IN_FAILURE';

export const SIGN_OUT_START = 'SIGN_OUT_START';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE';

export const UPDATE_PROFILE_PIC_START = 'UPDATE_PROFILE_PIC_START';
export const UPDATE_PROFILE_PIC_SUCCESS = 'UPDATE_PROFILE_PIC_SUCCESS';
export const UPDATE_PROFILE_PIC_FAILURE = 'UPDATE_PROFILE_PIC_FAILURE';
export interface IUser {
  id?: string;
  displayName?: string;
  email?: string;
  profilePic?: ProfileAndCoverPicType;
  createdAt?: Date;
}

// Sign up
export interface ISignUpStart {
  type: typeof SIGN_UP_START;
}

export interface ISignUpSuccess {
  type: typeof SIGN_UP_SUCCESS;
  payload: IUser;
}

export interface ISignUpFailure {
  type: typeof SIGN_UP_FAILURE;
  payload: string; // error message
}

export type SignUpDispatchType = ISignUpStart | ISignUpSuccess | ISignUpFailure;

// Email sign in

export interface IEmailSignInStart {
  type: typeof EMAIL_SIGN_IN_START;
}

export interface IEmailSignInSuccess {
  type: typeof EMAIL_SIGN_IN_SUCCESS;
  payload: IUser;
}

export interface IEmailSignInFailure {
  type: typeof EMAIL_SIGN_IN_FAILURE;
  payload: string; // error message
}

export type EmailSignInDispatchType =
  | IEmailSignInStart
  | IEmailSignInSuccess
  | IEmailSignInFailure;

// Check user session

export interface ICheckUserSession {
  type: typeof CHECK_USER_SESSION;
}

export type CheckUserSessionDispatchType =
  | ICheckUserSession
  | IEmailSignInSuccess
  | IEmailSignInFailure;

// Sign out

export interface ISignOutStart {
  type: typeof SIGN_OUT_START;
}

export interface ISignOutSuccess {
  type: typeof SIGN_OUT_SUCCESS;
}

export interface ISignOutFailure {
  type: typeof SIGN_OUT_FAILURE;
  payload: string; // error message
}

export type SignOutDispatchType = ISignOutStart | ISignOutSuccess | ISignOutFailure;

// Add or Update profile picture
export interface IUpdateProfilePicStart {
  type: typeof UPDATE_PROFILE_PIC_START;
}

export interface IUpdateProfilePicSuccess {
  type: typeof UPDATE_PROFILE_PIC_SUCCESS;
  payload: ProfileAndCoverPicType;
}
export interface IUpdateProfilePicFailure {
  type: typeof UPDATE_PROFILE_PIC_FAILURE;
  payload: string; // error message
}

export type UpdateProfilePictureDispatchType =
  | IUpdateProfilePicStart
  | IUpdateProfilePicSuccess
  | IUpdateProfilePicFailure
  | IUpdateProfilePicInProfile;

// User Action Type

export type UserActionType =
  | ICheckUserSession
  | SignUpDispatchType
  | EmailSignInDispatchType
  | SignOutDispatchType
  | UpdateProfilePictureDispatchType;
