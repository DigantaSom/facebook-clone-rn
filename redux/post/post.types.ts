import { IPost } from '../../types';

export const CREATE_POST_WITH_PHOTO_START = 'CREATE_POST_WITH_PHOTO_START';
export const CREATE_POST_WITH_PHOTO_SUCCESS = 'CREATE_POST_WITH_PHOTO_SUCCESS';
export const CREATE_POST_WITH_PHOTO_FAILURE = 'CREATE_POST_WITH_PHOTO_FAILURE';

export const DELETE_PHOTO_START = 'DELETE_PHOTO_START';
export const DELETE_PHOTO_SUCCESS = 'DELETE_PHOTO_SUCCESS';
export const DELETE_PHOTO_FAILURE = 'DELETE_PHOTO_FAILURE';

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
  type: typeof DELETE_PHOTO_START;
  payload: any; // TODO: apt type
}
export interface IDeletePhotoFailure {
  type: typeof DELETE_PHOTO_FAILURE;
  payload: string;
}
export type DeletePhotoDispatchType =
  | IDeletePhotoStart
  | IDeletePhotoSuccess
  | IDeletePhotoFailure;

// Post Action type

export type PostActionType = CreatePostWithPhotoDispatchType | DeletePhotoDispatchType;
