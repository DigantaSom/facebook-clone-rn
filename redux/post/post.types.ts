import { IPost } from '../../types';

export const CREATE_POST_WITH_PHOTO_START = 'CREATE_POST_WITH_PHOTO_START';
export const CREATE_POST_WITH_PHOTO_SUCCESS = 'CREATE_POST_WITH_PHOTO_SUCCESS';
export const CREATE_POST_WITH_PHOTO_FAILURE = 'CREATE_POST_WITH_PHOTO_FAILURE';

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

// Post Action type

export type PostActionType = CreatePostWithPhotoDispatchType;
