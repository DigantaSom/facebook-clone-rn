import { IPost } from '../../types';
import { IRemoveProfilePicFromUser } from '../user/user.types';
import {
  IRemoveProfilePicFromProfile,
  IRemoveCoverPicFromProfile,
} from '../profile/profile.types';
import { IRemovePhotoFromAlbum } from '../album/album.types';

export const FETCH_USER_POSTS_START = 'FETCH_USER_POSTS_START';
export const FETCH_USER_POSTS_SUCCESS = 'FETCH_USER_POSTS_SUCCESS';
export const FETCH_USER_POSTS_FAILURE = 'FETCH_USER_POSTS_FAILURE';

export const FETCH_ALL_POSTS_START = 'FETCH_ALL_POSTS_START';
export const FETCH_ALL_POSTS_SUCCESS = 'FETCH_ALL_POSTS_SUCCESS';
export const FETCH_ALL_POSTS_FAILURE = 'FETCH_ALL_POSTS_FAILURE';

export const CREATE_POST_WITH_PHOTO_START = 'CREATE_POST_WITH_PHOTO_START';
export const CREATE_POST_WITH_PHOTO_SUCCESS = 'CREATE_POST_WITH_PHOTO_SUCCESS';
export const CREATE_POST_WITH_PHOTO_FAILURE = 'CREATE_POST_WITH_PHOTO_FAILURE';

export const DELETE_PHOTO_START = 'DELETE_PHOTO_START';
export const DELETE_PHOTO_SUCCESS = 'DELETE_PHOTO_SUCCESS';
export const DELETE_PHOTO_FAILURE = 'DELETE_PHOTO_FAILURE';

// Fetch a specific user's posts

export interface IFetchUserPostsStart {
  type: typeof FETCH_USER_POSTS_START;
}
export interface IFetchUserPostsSuccess {
  type: typeof FETCH_USER_POSTS_SUCCESS;
  payload: IPost[];
}
export interface IFetchUserPostsFailure {
  type: typeof FETCH_USER_POSTS_FAILURE;
  payload: string;
}
export type FetchUserPostsDispatchType =
  | IFetchUserPostsStart
  | IFetchUserPostsSuccess
  | IFetchUserPostsFailure;

// Fetch all posts (for News Feed)

export interface IFetchAllPostsStart {
  type: typeof FETCH_ALL_POSTS_START;
}
export interface IFetchAllPostsSuccess {
  type: typeof FETCH_ALL_POSTS_SUCCESS;
  payload: IPost[];
}
export interface IFetchAllPostsFailure {
  type: typeof FETCH_ALL_POSTS_FAILURE;
  payload: string;
}
export type FetchAllPostsDispatchType =
  | IFetchAllPostsStart
  | IFetchAllPostsSuccess
  | IFetchAllPostsFailure;

// Create post with photo

export interface ICreatePostWithPhotoStart {
  type: typeof CREATE_POST_WITH_PHOTO_START;
}
export interface ICreatePostWithPhotoSuccess {
  type: typeof CREATE_POST_WITH_PHOTO_SUCCESS;
  payload: IPost;
}
export interface ICreatePostWithPhotoFailure {
  type: typeof CREATE_POST_WITH_PHOTO_FAILURE;
  payload: string;
}
export type CreatePostWithPhotoDispatchType =
  | ICreatePostWithPhotoStart
  | ICreatePostWithPhotoSuccess
  | ICreatePostWithPhotoFailure;

// Delete a photo

export interface IDeletePhotoStart {
  type: typeof DELETE_PHOTO_START;
}
export interface IDeletePhotoSuccess {
  type: typeof DELETE_PHOTO_SUCCESS;
  payload: string; // postId
}
export interface IDeletePhotoFailure {
  type: typeof DELETE_PHOTO_FAILURE;
  payload: string;
}
export type DeletePhotoDispatchType =
  | IDeletePhotoStart
  | IDeletePhotoSuccess
  | IDeletePhotoFailure
  | IRemoveProfilePicFromUser // from user.types
  | IRemoveProfilePicFromProfile // from profile.types
  | IRemovePhotoFromAlbum // from album.types
  | IRemoveCoverPicFromProfile; // from profile.types

// Post Action type

export type PostActionType =
  | FetchUserPostsDispatchType
  | FetchAllPostsDispatchType
  | CreatePostWithPhotoDispatchType
  | DeletePhotoDispatchType;
