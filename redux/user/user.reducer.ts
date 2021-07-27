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
	REMOVE_PROFILE_PIC_FROM_USER,
} from './user.types';

interface IDefaultState {
	currentUser: IUser | null;
	user: IUser | null;
	loading: boolean;
	uploading: boolean;
	error: string;
}

const defaultState: IDefaultState = {
	currentUser: null,
	user: null,
	loading: false,
	uploading: false,
	error: '',
};

const userReducer = (
	state: IDefaultState = defaultState,
	action: UserActionType,
): IDefaultState => {
	switch (action.type) {
		// Check user session
		case CHECK_USER_SESSION:
			return {
				...state,
				loading: true,
			};

		// Sign Up
		case SIGN_UP_START:
			return {
				...state,
				loading: true,
			};
		case SIGN_UP_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				loading: false,
				error: '',
			};
		case SIGN_UP_FAILURE:
			return {
				...state,
				currentUser: null,
				loading: false,
				error: action.payload,
			};

		// Email Sign In
		case EMAIL_SIGN_IN_START:
			return {
				...state,
				loading: true,
			};
		case EMAIL_SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				loading: false,
				error: '',
			};
		case EMAIL_SIGN_IN_FAILURE:
			return {
				...state,
				currentUser: null,
				loading: false,
				error: action.payload,
			};

		// Sign Out
		case SIGN_OUT_START:
			return {
				...state,
				loading: true,
			};
		case SIGN_OUT_SUCCESS:
			return defaultState;
		case SIGN_OUT_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		// Update Profile Picture (in user state only)
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
		case UPDATE_PROFILE_PIC_FAILURE:
			return {
				...state,
				loading: false,
				uploading: false,
				error: action.payload,
			};

		// After deletion of current profile pic from post.actions
		case REMOVE_PROFILE_PIC_FROM_USER:
			return {
				...state,
				currentUser: {
					...state.currentUser,
					profilePic: '',
				},
				loading: false,
				error: '',
			};

		default:
			return state;
	}
};

export default userReducer;
