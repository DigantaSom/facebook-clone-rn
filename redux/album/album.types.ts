export const GET_ALL_PHOTOS_START = 'GET_ALL_PHOTOS_START';
export const GET_ALL_PHOTOS_SUCCESS = 'GET_ALL_PHOTOS_SUCCESS';
export const GET_ALL_PHOTOS_FAILURE = 'GET_ALL_PHOTOS_FAILURE';

export const GET_ALBUMS_START = 'GET_ALBUMS_START';
export const GET_ALBUMS_SUCCESS = 'GET_ALBUMS_SUCCESS';
export const GET_ALBUMS_FAILURE = 'GET_ALBUMS_FAILURE';

export interface IGetAllPhotosStart {
  type: typeof GET_ALL_PHOTOS_START;
}
export interface IGetAllPhotosSuccess {
  type: typeof GET_ALL_PHOTOS_SUCCESS;
  payload: any; // TODO: add apt type
}
export interface IGetAllPhotosFailure {
  type: typeof GET_ALL_PHOTOS_FAILURE;
  payload: string;
}

export type GetAllPhotosDispatchType =
  | IGetAllPhotosStart
  | IGetAllPhotosSuccess
  | IGetAllPhotosFailure;

export interface IGetAlbumsStart {
  type: typeof GET_ALBUMS_START;
}
export interface IGetAlbumsSuccess {
  type: typeof GET_ALBUMS_SUCCESS;
  payload: any; // TODO: add apt type
}
export interface IGetAlbumsFailure {
  type: typeof GET_ALBUMS_FAILURE;
  payload: string;
}

export type GetAlbumsDispatchType =
  | IGetAlbumsStart
  | IGetAlbumsSuccess
  | IGetAlbumsFailure;

export type AlbumActionType = GetAllPhotosDispatchType | GetAlbumsDispatchType;
