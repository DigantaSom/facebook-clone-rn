import { ProfileAndCoverPicType } from '../../types';

export const GET_PROFILE_START = 'GET_PROFILE_START';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const UPDATE_PROFILE_PIC_IN_PROFILE = 'UPDATE_PROFILE_PIC_IN_PROFILE';

export const UPLOAD_COVER_PIC_START = 'UPLOAD_COVER_PIC_START';
export const UPLOAD_COVER_PIC_SUCCESS = 'UPLOAD_COVER_PIC_SUCCESS';
export const UPLOAD_COVER_PIC_FAILURE = 'UPLOAD_COVER_PIC_FAILURE';

export const ADD_OR_EDIT_PROFILE_ABOUT_START = 'ADD_OR_EDIT_PROFILE_ABOUT_START';
export const ADD_OR_EDIT_PROFILE_ABOUT_SUCCESS = 'ADD_OR_EDIT_PROFILE_ABOUT_SUCCESS';
export const ADD_OR_EDIT_PROFILE_ABOUT_FAILURE = 'ADD_OR_EDIT_PROFILE_ABOUT_FAILURE';

export type RelationshipStatusType =
  | 'Single'
  | 'Commited'
  | 'Married'
  | "It's complicated"
  | 'In an Open Relationship'
  | '';

export type ProfileAboutType = {
  location?: {
    livesIn?: string;
    from?: string;
  };
  relationshipStatus?: RelationshipStatusType;
  birthday?: string;
};

export interface IProfile {
  userId: string;
  displayName: string;
  joined: string;
  profilePic?: ProfileAndCoverPicType;
  coverPic?: ProfileAndCoverPicType;
  about?: ProfileAboutType;
  // TODO: add more gradually
}

// Get a single profile

export interface IGetProfileStart {
  type: typeof GET_PROFILE_START;
}

export interface IGetProfileSuccess {
  type: typeof GET_PROFILE_SUCCESS;
  payload: IProfile;
}

export interface IGetProfileFailure {
  type: typeof GET_PROFILE_FAILURE;
  payload: string; // error message
}

export type GetProfileDispatchType =
  | IGetProfileStart
  | IGetProfileSuccess
  | IGetProfileFailure;

// Upload a profile picture (just update the profile state)

export interface IUpdateProfilePicInProfile {
  type: typeof UPDATE_PROFILE_PIC_IN_PROFILE;
  payload: ProfileAndCoverPicType;
}

// Upload a Cover pic

export interface IUploadCoverPicStart {
  type: typeof UPLOAD_COVER_PIC_START;
}

export interface IUploadCoverPicSuccess {
  type: typeof UPLOAD_COVER_PIC_SUCCESS;
  payload: ProfileAndCoverPicType;
}

export interface IUploadCoverPicFailure {
  type: typeof UPLOAD_COVER_PIC_FAILURE;
  payload: string;
}

export type UploadCoverPicDispatchType =
  | IUploadCoverPicStart
  | IUploadCoverPicSuccess
  | IUploadCoverPicFailure;

// Add or Edit profile about information

export interface IAddOrEditProfileAboutStart {
  type: typeof ADD_OR_EDIT_PROFILE_ABOUT_START;
}

export interface IAddOrEditProfileAboutSuccess {
  type: typeof ADD_OR_EDIT_PROFILE_ABOUT_SUCCESS;
  payload: ProfileAboutType;
}

export interface IAddOrEditProfileAboutFailure {
  type: typeof ADD_OR_EDIT_PROFILE_ABOUT_FAILURE;
  payload: string;
}

export type AddOrEditProfileAboutDispatchType =
  | IAddOrEditProfileAboutStart
  | IAddOrEditProfileAboutSuccess
  | IAddOrEditProfileAboutFailure;

// Profile Action Type

export type ProfileActionType =
  | GetProfileDispatchType
  | IUpdateProfilePicInProfile
  | UploadCoverPicDispatchType
  | AddOrEditProfileAboutDispatchType;
