import { IPost, IReaction } from '../../types';
import { IRemoveProfilePicFromUser } from '../user/user.types';
import {
  IRemoveProfilePicFromProfile,
  IRemoveCoverPicFromProfile,
} from '../profile/profile.types';
import { IRemovePhotoFromAlbum } from '../album/album.types';

export const FETCH_SINGLE_POST_START = 'FETCH_SINGLE_POST_START';
export const FETCH_SINGLE_POST_SUCCESS = 'FETCH_SINGLE_POST_SUCCESS';
export const FETCH_SINGLE_POST_FAILURE = 'FETCH_SINGLE_POST_FAILURE';

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

export const UPDATE_REACT_ON_POST_START = 'UPDATE_REACT_ON_POST_START';
export const UPDATE_REACT_ON_POST_SUCCESS = 'UPDATE_REACT_ON_POST_SUCCESS';
export const UPDATE_REACT_ON_POST_FAILURE = 'UPDATE_REACT_ON_POST_FAILURE';

export const UPDATE_POSTS = 'UPDATE_POSTS';

// Fetch a single post by it's postId
export interface IFetchSinglePostStart {
  type: typeof FETCH_SINGLE_POST_START;
}
export interface IFetchSinglePostSuccess {
  type: typeof FETCH_SINGLE_POST_SUCCESS;
  payload: IPost;
}
export interface IFetchSinglePostFailure {
  type: typeof FETCH_SINGLE_POST_FAILURE;
  payload: string;
}
export type FetchSinglePostDispatchType =
  | IFetchSinglePostStart
  | IFetchSinglePostSuccess
  | IFetchSinglePostFailure;

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

// React/update react on a post
export interface IUpdateReactOnPostStart {
  type: typeof UPDATE_REACT_ON_POST_START;
}
export interface IUpdateReactOnPostSuccess {
  type: typeof UPDATE_REACT_ON_POST_SUCCESS;
  payload: IReaction & { postId: string };
}
export interface IUpdateReactOnPostFailure {
  type: typeof UPDATE_REACT_ON_POST_FAILURE;
  payload: string;
}
export type UpdateReactOnPostDispatchType =
  | IUpdateReactOnPostStart
  | IUpdateReactOnPostSuccess
  | IUpdateReactOnPostFailure;

// Update posts[] array of posts reducer state, upon adding a new profile/cover pic. (p.s. posts[] array is update logic is already there for timeline_pics upload)
export interface IUpdatePosts {
  type: typeof UPDATE_POSTS;
  payload: IPost;
}

// Post Action type

export type PostActionType =
  | FetchSinglePostDispatchType
  | FetchUserPostsDispatchType
  | FetchAllPostsDispatchType
  | CreatePostWithPhotoDispatchType
  | DeletePhotoDispatchType
  | UpdateReactOnPostDispatchType
  | IUpdatePosts;
