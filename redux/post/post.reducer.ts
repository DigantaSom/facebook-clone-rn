import { IPost } from '../../types';
import {
  CREATE_POST_WITH_PHOTO_START,
  CREATE_POST_WITH_PHOTO_SUCCESS,
  CREATE_POST_WITH_PHOTO_FAILURE,
  PostActionType,
} from './post.types';

interface IDefaultState {
  post: IPost | null;
  posts: IPost[];
  loading: boolean;
  error: string;
}

const defaultState: IDefaultState = {
  post: null,
  posts: [],
  loading: false,
  error: '',
};

const postReducer = (
  state: IDefaultState = defaultState,
  action: PostActionType,
): IDefaultState => {
  switch (action.type) {
    case CREATE_POST_WITH_PHOTO_START:
      return {
        ...state,
        loading: true,
      };

    case CREATE_POST_WITH_PHOTO_SUCCESS:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };

    case CREATE_POST_WITH_PHOTO_FAILURE:
      return {
        ...state,
        post: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default postReducer;
