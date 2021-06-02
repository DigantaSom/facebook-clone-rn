import { IPost } from '../../types';

export const GET_ALL_PHOTOS_START = 'GET_ALL_PHOTOS_START';
export const GET_ALL_PHOTOS_SUCCESS = 'GET_ALL_PHOTOS_SUCCESS';
export const GET_ALL_PHOTOS_FAILURE = 'GET_ALL_PHOTOS_FAILURE';

export const GET_ALBUMS_START = 'GET_ALBUMS_START';
export const GET_ALBUMS_SUCCESS = 'GET_ALBUMS_SUCCESS';
export const GET_ALBUMS_FAILURE = 'GET_ALBUMS_FAILURE';

export const GET_ALBUM_PICS_START = 'GET_ALBUM_PICS_START';
export const GET_ALBUM_PICS_SUCCESS = 'GET_ALBUM_PICS_SUCCESS';
export const GET_ALBUM_PICS_FAILURE = 'GET_ALBUM_PICS_FAILURE';

export type AlbumPreviewType = {
  albumTitle: string;
  lastImageUri: string;
};

// Get all photos

export interface IGetAllPhotosStart {
  type: typeof GET_ALL_PHOTOS_START;
}
export interface IGetAllPhotosSuccess {
  type: typeof GET_ALL_PHOTOS_SUCCESS;
  payload: IPost[];
}
export interface IGetAllPhotosFailure {
  type: typeof GET_ALL_PHOTOS_FAILURE;
  payload: string;
}

export type GetAllPhotosDispatchType =
  | IGetAllPhotosStart
  | IGetAllPhotosSuccess
  | IGetAllPhotosFailure;

// Get albums

export interface IGetAlbumsStart {
  type: typeof GET_ALBUMS_START;
}
export interface IGetAlbumsSuccess {
  type: typeof GET_ALBUMS_SUCCESS;
  payload: AlbumPreviewType[];
}
export interface IGetAlbumsFailure {
  type: typeof GET_ALBUMS_FAILURE;
  payload: string;
}

export type GetAlbumsDispatchType =
  | IGetAlbumsStart
  | IGetAlbumsSuccess
  | IGetAlbumsFailure;

// Get Album pics

export interface IGetAlbumPicsStart {
  type: typeof GET_ALBUM_PICS_START;
}
export interface IGetAlbumPicsSuccess {
  type: typeof GET_ALBUM_PICS_SUCCESS;
  payload: IPost[];
}
export interface IGetAlbumPicsFailure {
  type: typeof GET_ALBUM_PICS_FAILURE;
  payload: string;
}

export type GetAlbumPicsDispatchType =
  | IGetAlbumPicsStart
  | IGetAlbumPicsSuccess
  | IGetAlbumPicsFailure;

// Album action type

export type AlbumActionType =
  | GetAllPhotosDispatchType
  | GetAlbumsDispatchType
  | GetAlbumPicsDispatchType;
