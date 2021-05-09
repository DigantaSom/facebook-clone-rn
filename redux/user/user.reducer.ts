import {
  IUser,
  UserActionType,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  EMAIL_SIGN_IN_START,
  EMAIL_SIGN_IN_SUCCESS,
  EMAIL_SIGN_IN_FAILURE,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  CHECK_USER_SESSION,
  UPDATE_PROFILE_PIC_START,
  UPDATE_PROFILE_PIC_SUCCESS,
  UPDATE_PROFILE_PIC_FAILURE,
} from './user.types';

interface IDefaultState {
  currentUser: IUser | null;
  loading: boolean;
  uploading: boolean;
  error: string;
}

const defaultState: IDefaultState = {
  currentUser: null,
  loading: false,
  uploading: false,
  error: '',
};

const userReducer = (
  state: IDefaultState = defaultState,
  action: UserActionType,
): IDefaultState => {
  switch (action.type) {
    case CHECK_USER_SESSION:
    case SIGN_UP_START:
    case EMAIL_SIGN_IN_START:
    case SIGN_OUT_START:
      return {
        ...state,
        loading: true,
      };

    case SIGN_UP_SUCCESS:
    case EMAIL_SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        error: '',
      };

    case SIGN_OUT_SUCCESS:
      return defaultState;

    case UPDATE_PROFILE_PIC_START:
      return {
        ...state,
        loading: false,
        uploading: true,
      };

    case UPDATE_PROFILE_PIC_SUCCESS:
      return {
        ...state,
        loading: false,
        uploading: false,
        currentUser: { ...state.currentUser, profilePic: action.payload },
      };

    case SIGN_UP_FAILURE:
    case EMAIL_SIGN_IN_FAILURE:
      return {
        ...state,
        currentUser: null,
        loading: false,
        error: action.payload,
      };

    case SIGN_OUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_PIC_FAILURE:
      return {
        ...state,
        loading: false,
        uploading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
