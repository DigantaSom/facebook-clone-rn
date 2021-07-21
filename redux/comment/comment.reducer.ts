import { IComment } from '../../types';
import {
	CommentActionType,
	FETCH_ALL_COMMENTS_FAILURE,
	FETCH_ALL_COMMENTS_START,
	FETCH_ALL_COMMENTS_SUCCESS,
	FETCH_SINGLE_COMMENTS_START,
	FETCH_SINGLE_COMMENTS_SUCCESS,
	FETCH_SINGLE_COMMENTS_FAILURE,
	ADD_COMMENT_FAILURE,
	ADD_COMMENT_START,
	ADD_COMMENT_SUCCESS,
	DELETE_COMMENT_FAILURE,
	DELETE_COMMENT_START,
	DELETE_COMMENT_SUCCESS,
	EDIT_COMMENT_START,
	EDIT_COMMENT_SUCCESS,
	EDIT_COMMENT_FAILURE,
} from './comment.types';

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

		default:
			return state;
	}
};

export default commentReducer;
