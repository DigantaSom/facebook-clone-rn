import { IReply } from '../../types';
import { SIGN_OUT_SUCCESS } from '../user/user.types';
import {
	FETCH_ALL_REPLIES_START,
	FETCH_ALL_REPLIES_SUCCESS,
	FETCH_ALL_REPLIES_FAILURE,
	ReplyActionType,
	ADD_REPLY_START,
	ADD_REPLY_SUCCESS,
	ADD_REPLY_FAILURE,
	DELETE_REPLY_START,
	DELETE_REPLY_SUCCESS,
	DELETE_REPLY_FAILURE,
} from './reply.types';

interface IDefaultState {
	reply: IReply | null;
	replies: IReply[];
	loading: boolean;
	actionLoading: boolean;
	error: string;
}

const defaultState: IDefaultState = {
	reply: null,
	replies: [],
	loading: false,
	actionLoading: false,
	error: '',
};

const replyReducer = (
	state: IDefaultState = defaultState,
	action: ReplyActionType,
): IDefaultState => {
	switch (action.type) {
		// Fetch all replies of a comment of a post
		case FETCH_ALL_REPLIES_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_ALL_REPLIES_SUCCESS:
			return {
				...state,
				replies: action.payload,
				loading: false,
				error: '',
			};
		case FETCH_ALL_REPLIES_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		// Reply on a comment of a post
		case ADD_REPLY_START:
			return {
				...state,
				actionLoading: true,
			};
		case ADD_REPLY_SUCCESS:
			return {
				...state,
				replies: [...state.replies, action.payload],
				actionLoading: false,
				error: '',
			};
		case ADD_REPLY_FAILURE:
			return {
				...state,
				actionLoading: false,
				error: action.payload,
			};

		// Delete a reply
		case DELETE_REPLY_START:
			return {
				...state,
				actionLoading: true,
			};
		case DELETE_REPLY_SUCCESS:
			return {
				...state,
				reply: null,
				replies: state.replies.filter(reply => reply.replyId !== action.payload),
				actionLoading: false,
				error: '',
			};
		case DELETE_REPLY_FAILURE:
			return {
				...state,
				actionLoading: false,
				error: action.payload,
			};

		// Clear comment state after signing out
		case SIGN_OUT_SUCCESS:
			return state;

		default:
			return state;
	}
};

export default replyReducer;
