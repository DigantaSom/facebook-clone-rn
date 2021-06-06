import { IPost } from '../../types';
import {
  CREATE_POST_WITH_PHOTO_START,
  CREATE_POST_WITH_PHOTO_SUCCESS,
  CREATE_POST_WITH_PHOTO_FAILURE,
  PostActionType,
  DELETE_PHOTO_START,
  DELETE_PHOTO_SUCCESS,
  DELETE_PHOTO_FAILURE,
  FETCH_USER_POSTS_START,
  FETCH_USER_POSTS_SUCCESS,
  FETCH_USER_POSTS_FAILURE,
  FETCH_ALL_POSTS_START,
  FETCH_ALL_POSTS_SUCCESS,
  FETCH_ALL_POSTS_FAILURE,
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
    // Fetch all posts (News Feed)
    case FETCH_ALL_POSTS_START:
      return {
        ...state,
        post: null,
        posts: [],
        loading: true,
      };
    case FETCH_ALL_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case FETCH_ALL_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Fetch a specific user's posts
    case FETCH_USER_POSTS_START:
      return {
        ...state,
        post: null,
        posts: [],
        loading: true,
      };
    case FETCH_USER_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case FETCH_USER_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

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
        posts: [action.payload, ...state.posts],
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
