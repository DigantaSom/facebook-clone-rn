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
  CHECK_USER_SESSION
} from './user.types';

interface IDefaultState {
  currentUser: IUser | null;
  loading: boolean;
  error: string;
}

const defaultState: IDefaultState = {
  currentUser: null,
  loading: false,
  error: ''
};

const userReducer = (
  state: IDefaultState = defaultState,
  action: UserActionType
): IDefaultState => {
  switch (action.type) {
    case CHECK_USER_SESSION:
    case SIGN_UP_START:
    case EMAIL_SIGN_IN_START:
    case SIGN_OUT_START:
      return {
        ...state,
        loading: true
      };

    case SIGN_UP_SUCCESS:
    case EMAIL_SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        error: ''
      };

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        loading: false,
        error: ''
      };

    case SIGN_UP_FAILURE:
    case EMAIL_SIGN_IN_FAILURE:
      return {
        ...state,
        currentUser: null,
        loading: false,
        error: action.payload
      };

    case SIGN_OUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
