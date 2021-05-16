import {
  IProfile,
  ProfileActionType,
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  UPLOAD_COVER_PIC_FAILURE,
  UPLOAD_COVER_PIC_START,
  UPLOAD_COVER_PIC_SUCCESS,
  ADD_OR_EDIT_PROFILE_ABOUT_START,
  ADD_OR_EDIT_PROFILE_ABOUT_SUCCESS,
  ADD_OR_EDIT_PROFILE_ABOUT_FAILURE,
  UPDATE_PROFILE_PIC_IN_PROFILE,
} from './profile.types';

interface IDefaultState {
  profile: IProfile | null;
  loading: boolean;
  error: string;
}

const defaultState: IDefaultState = {
  profile: null,
  loading: false,
  error: '',
};

const profileReducer = (
  state: IDefaultState = defaultState,
  action: ProfileActionType,
): IDefaultState => {
  switch (action.type) {
    case GET_PROFILE_START:
    case UPLOAD_COVER_PIC_START:
    case ADD_OR_EDIT_PROFILE_ABOUT_START:
      return {
        ...state,
        loading: true,
      };

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: '',
      };

    case UPDATE_PROFILE_PIC_IN_PROFILE:
      return {
        ...state,
        profile: {
          ...(state.profile as IProfile),
          profilePic: action.payload,
        },
        loading: false,
        error: '',
      };

    case UPLOAD_COVER_PIC_SUCCESS:
      return {
        ...state,
        profile: {
          ...(state.profile as IProfile),
          coverPic: action.payload,
        },
        loading: false,
        error: '',
      };

    case ADD_OR_EDIT_PROFILE_ABOUT_SUCCESS:
      return {
        ...state,
        profile: {
          ...(state.profile as IProfile),
          about: action.payload,
        },
        loading: false,
        error: '',
      };

    case GET_PROFILE_FAILURE:
    case UPLOAD_COVER_PIC_FAILURE:
    case ADD_OR_EDIT_PROFILE_ABOUT_FAILURE:
      return {
        ...state,
        profile: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
