import { IPost } from '../../types';
import {
  AlbumPreviewType,
  AlbumActionType,
  GET_ALL_PHOTOS_START,
  GET_ALL_PHOTOS_SUCCESS,
  GET_ALL_PHOTOS_FAILURE,
  GET_ALBUMS_START,
  GET_ALBUMS_SUCCESS,
  GET_ALBUMS_FAILURE,
  GET_ALBUM_PICS_START,
  GET_ALBUM_PICS_SUCCESS,
  GET_ALBUM_PICS_FAILURE,
  REMOVE_PHOTO_FROM_ALBUM,
} from './album.types';

interface IDefaultState {
  albumsPreview: AlbumPreviewType[];
  allPhotos: IPost[];
  photos: IPost[];
  loading: boolean;
  error: string;
}

const defaultState: IDefaultState = {
  allPhotos: [],
  photos: [],
  albumsPreview: [],
  loading: false,
  error: '',
};

const albumReducer = (
  state: IDefaultState = defaultState,
  action: AlbumActionType,
): IDefaultState => {
  switch (action.type) {
    case GET_ALL_PHOTOS_START:
    case GET_ALBUMS_START:
    case GET_ALBUM_PICS_START:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_PHOTOS_SUCCESS:
      return {
        ...state,
        allPhotos: action.payload,
        loading: false,
      };

    case GET_ALBUMS_SUCCESS:
      return {
        ...state,
        albumsPreview: action.payload,
        loading: false,
      };

    case GET_ALBUM_PICS_SUCCESS:
      return {
        ...state,
        photos: action.payload,
        loading: false,
      };

    case GET_ALL_PHOTOS_FAILURE:
    case GET_ALBUMS_FAILURE:
    case GET_ALBUM_PICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // After deletion of current profile pic from post.actions
    case REMOVE_PHOTO_FROM_ALBUM:
      return {
        ...state,
        allPhotos: state.allPhotos.filter(photo => photo.postId !== action.payload),
        photos: state.photos.filter(photo => photo.postId !== action.payload),
        loading: false,
      };

    default:
      return state;
  }
};

export default albumReducer;
