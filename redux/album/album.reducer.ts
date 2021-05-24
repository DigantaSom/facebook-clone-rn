import { IPhoto } from '../../types';
import {
  AlbumActionType,
  GET_ALL_PHOTOS_START,
  GET_ALL_PHOTOS_SUCCESS,
  GET_ALL_PHOTOS_FAILURE,
} from './album.types';

interface IDefaultState {
  all_photos: IPhoto[];
  loading: boolean;
  error: string;
}

const defaultState: IDefaultState = {
  all_photos: [],
  loading: false,
  error: '',
};

const albumReducer = (
  state: IDefaultState = defaultState,
  action: AlbumActionType,
): IDefaultState => {
  switch (action.type) {
    case GET_ALL_PHOTOS_START:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_PHOTOS_SUCCESS:
      return {
        ...state,
        all_photos: action.payload,
        loading: false,
      };

    case GET_ALL_PHOTOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default albumReducer;
