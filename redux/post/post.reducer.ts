import { IPost } from '../../types';
import {
  CREATE_POST_WITH_PHOTO_START,
  CREATE_POST_WITH_PHOTO_SUCCESS,
  CREATE_POST_WITH_PHOTO_FAILURE,
  PostActionType,
  DELETE_PHOTO_START,
  DELETE_PHOTO_SUCCESS,
  DELETE_PHOTO_FAILURE,
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
    // Create post with photo
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

    // Delete a photo
    case DELETE_PHOTO_START:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PHOTO_SUCCESS:
      return {
        ...state,
        post: null,
        posts: state.posts.filter(post => post.postId !== action.payload),
        loading: false,
        error: '',
      };
    case DELETE_PHOTO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default postReducer;
