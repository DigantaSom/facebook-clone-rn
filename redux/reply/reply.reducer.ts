import { IReaction, IReply } from '../../types';
import { SIGN_OUT_SUCCESS } from '../user/user.types';
import {
	ReplyActionType,
	FETCH_ALL_REPLIES_START,
	FETCH_ALL_REPLIES_SUCCESS,
	FETCH_ALL_REPLIES_FAILURE,
	FETCH_SINGLE_REPLY_START,
	FETCH_SINGLE_REPLY_SUCCESS,
	FETCH_SINGLE_REPLY_FAILURE,
	ADD_REPLY_START,
	ADD_REPLY_SUCCESS,
	ADD_REPLY_FAILURE,
	DELETE_REPLY_START,
	DELETE_REPLY_SUCCESS,
	DELETE_REPLY_FAILURE,
	EDIT_REPLY_START,
	EDIT_REPLY_SUCCESS,
	EDIT_REPLY_FAILURE,
	UPDATE_REACT_ON_REPLY_START,
	UPDATE_REACT_ON_REPLY_SUCCESS,
	UPDATE_REACT_ON_REPLY_FAILURE,
} from './reply.types';

import { updateReactionOnReply } from './reply.utils';

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

		// Fetch a single reply
		case FETCH_SINGLE_REPLY_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_SINGLE_REPLY_SUCCESS:
			return {
				...state,
				reply: action.payload,
				loading: false,
				error: '',
			};
		case FETCH_SINGLE_REPLY_FAILURE:
			return {
				...state,
				reply: null,
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

		// Edit a particular reply
		case EDIT_REPLY_START:
			return {
				...state,
				actionLoading: true,
			};
		case EDIT_REPLY_SUCCESS:
			return {
				...state,
				reply: state.reply
					? {
							...state.reply,
							...action.payload,
					  }
					: null,
				replies: state.replies.map(reply =>
					reply.replyId === action.payload.replyId
						? {
								...reply,
								...action.payload,
						  }
						: reply,
				),
				actionLoading: false,
				error: '',
			};
		case EDIT_REPLY_FAILURE:
			return {
				...state,
				actionLoading: false,
				error: action.payload,
			};

		// React/update reaction on a reply
		case UPDATE_REACT_ON_REPLY_START:
			return {
				...state,
				actionLoading: true,
			};
		case UPDATE_REACT_ON_REPLY_SUCCESS:
			const newReactionObj: IReaction = {
				reactorId: action.payload.reactorId,
				reaction: action.payload.reaction,
			};
			return {
				...state,
				reply: state.reply
					? {
							...state.reply,
							replyReactions: updateReactionOnReply(
								state.reply.replyReactions,
								newReactionObj,
							),
					  }
					: null,
				replies: state.replies.map(reply =>
					reply.replyId === action.payload.replyId
						? {
								...reply,
								replyReactions:
									newReactionObj.reaction !== ''
										? [newReactionObj, ...reply.replyReactions]
										: reply.replyReactions.filter(
												r => r.reactorId !== newReactionObj.reactorId,
										  ),
						  }
						: reply,
				),
				actionLoading: false,
			};
		case UPDATE_REACT_ON_REPLY_FAILURE:
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
