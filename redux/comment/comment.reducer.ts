import { IComment, IReaction } from '../../types';
import { SIGN_OUT_SUCCESS } from '../user/user.types';
import {
	CommentActionType,
	FETCH_ALL_COMMENTS_START,
	FETCH_ALL_COMMENTS_SUCCESS,
	FETCH_ALL_COMMENTS_FAILURE,
	FETCH_SINGLE_COMMENTS_START,
	FETCH_SINGLE_COMMENTS_SUCCESS,
	FETCH_SINGLE_COMMENTS_FAILURE,
	ADD_COMMENT_START,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILURE,
	DELETE_COMMENT_START,
	DELETE_COMMENT_SUCCESS,
	DELETE_COMMENT_FAILURE,
	EDIT_COMMENT_START,
	EDIT_COMMENT_SUCCESS,
	EDIT_COMMENT_FAILURE,
	UPDATE_REACT_ON_COMMENT_START,
	UPDATE_REACT_ON_COMMENT_SUCCESS,
	UPDATE_REACT_ON_COMMENT_FAILURE,
	UPDATE_REPLY_COUNT_START,
	UPDATE_REPLY_COUNT_SUCCESS,
	UPDATE_REPLY_COUNT_FAILURE,
} from './comment.types';

import { updateReactionOnComment, updateReplyCountOnComment } from './comment.utils';

interface IDefaultState {
	comment: IComment | null;
	comments: IComment[];
	loading: boolean;
	actionLoading: boolean;
	error: string;
}

const defaultState: IDefaultState = {
	comment: null,
	comments: [],
	loading: false,
	actionLoading: false,
	error: '',
};

const commentReducer = (
	state: IDefaultState = defaultState,
	action: CommentActionType,
): IDefaultState => {
	switch (action.type) {
		// Fetch all comments of a post
		case FETCH_ALL_COMMENTS_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_ALL_COMMENTS_SUCCESS:
			return {
				...state,
				comments: action.payload,
				loading: false,
				error: '',
			};
		case FETCH_ALL_COMMENTS_FAILURE:
			return {
				...state,
				comment: null,
				comments: [],
				loading: false,
				error: '',
			};

		// Fetch a particular single comment
		case FETCH_SINGLE_COMMENTS_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_SINGLE_COMMENTS_SUCCESS:
			return {
				...state,
				comment: action.payload,
				loading: false,
				error: '',
			};
		case FETCH_SINGLE_COMMENTS_FAILURE:
			return {
				...state,
				comment: null,
				loading: false,
				error: action.payload,
			};

		// Comment on a post
		case ADD_COMMENT_START:
			return {
				...state,
				actionLoading: true,
			};
		case ADD_COMMENT_SUCCESS:
			return {
				...state,
				comments: [...state.comments, action.payload],
				actionLoading: false,
				error: '',
			};
		case ADD_COMMENT_FAILURE:
			return {
				...state,
				actionLoading: false,
				error: action.payload,
			};

		// Delete a comment
		case DELETE_COMMENT_START:
			return {
				...state,
				actionLoading: true,
			};
		case DELETE_COMMENT_SUCCESS:
			return {
				...state,
				comment: null,
				comments: state.comments.filter(com => com.commentId !== action.payload),
				actionLoading: false,
				error: '',
			};
		case DELETE_COMMENT_FAILURE:
			return {
				...state,
				actionLoading: false,
				error: action.payload,
			};

		// Edit a particular comment
		case EDIT_COMMENT_START:
			return {
				...state,
				actionLoading: true,
			};
		case EDIT_COMMENT_SUCCESS:
			return {
				...state,
				comment: state.comment
					? {
							...state.comment,
							...action.payload,
					  }
					: null,
				comments: state.comments.map(com =>
					com.commentId === action.payload.commentId
						? {
								...com,
								...action.payload,
						  }
						: com,
				),
				actionLoading: false,
				error: '',
			};
		case EDIT_COMMENT_FAILURE:
			return {
				...state,
				actionLoading: false,
				error: action.payload,
			};

		// React/update react on a comment
		case UPDATE_REACT_ON_COMMENT_START:
			return {
				...state,
				actionLoading: true,
			};
		case UPDATE_REACT_ON_COMMENT_SUCCESS:
			const newReactionObj: IReaction = {
				reactorId: action.payload.reactorId,
				reaction: action.payload.reaction,
			};
			return {
				...state,
				comment: state.comment
					? {
							...state.comment,
							commentReactions: updateReactionOnComment(
								state.comment.commentReactions,
								newReactionObj,
							),
					  }
					: null,
				comments: state.comments.map(comment =>
					comment.commentId === action.payload.commentId
						? {
								...comment,
								commentReactions:
									newReactionObj.reaction !== ''
										? [newReactionObj, ...comment.commentReactions]
										: comment.commentReactions.filter(
												r => r.reactorId !== newReactionObj.reactorId,
										  ),
						  }
						: comment,
				),
				actionLoading: false,
			};
		case UPDATE_REACT_ON_COMMENT_FAILURE:
			return {
				...state,
				actionLoading: false,
				error: action.payload,
			};

		// Update 'replyCount' field on comment reducer, after a reply is successfully added/deleted to/from reply state.
		case UPDATE_REPLY_COUNT_START:
			return {
				...state,
				// actionLoading: true,
			};
		case UPDATE_REPLY_COUNT_SUCCESS:
			return {
				...state,
				comment: state.comment
					? {
							...state.comment,
							replyCount: updateReplyCountOnComment(
								state.comment.replyCount,
								action.payload,
							),
					  }
					: null,
				// actionLoading: false,
			};
		case UPDATE_REPLY_COUNT_FAILURE:
			return {
				...state,
				// actionLoading: false,
				error: action.payload,
			};

		// Clear comment state after signing out
		case SIGN_OUT_SUCCESS:
			return defaultState;

		default:
			return state;
	}
};

export default commentReducer;
