import { IComment } from '../../types';
import {
	ADD_COMMENT_FAILURE,
	ADD_COMMENT_START,
	ADD_COMMENT_SUCCESS,
	CommentActionType,
	DELETE_COMMENT_FAILURE,
	DELETE_COMMENT_START,
	DELETE_COMMENT_SUCCESS,
	FETCH_ALL_COMMENTS_FAILURE,
	FETCH_ALL_COMMENTS_START,
	FETCH_ALL_COMMENTS_SUCCESS,
} from './comment.types';

interface IDefaultState {
	comment: IComment | null;
	comments: IComment[];
	loading: boolean;
	error: string;
}

const defaultState: IDefaultState = {
	comment: null,
	comments: [],
	loading: false,
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

		// Comment on a post
		case ADD_COMMENT_START:
			return {
				...state,
				loading: true,
			};
		case ADD_COMMENT_SUCCESS:
			return {
				...state,
				comments: [...state.comments, action.payload],
				loading: false,
				error: '',
			};
		case ADD_COMMENT_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		// Delete a comment
		case DELETE_COMMENT_START:
			return {
				...state,
				loading: true,
			};
		case DELETE_COMMENT_SUCCESS:
			return {
				...state,
				comment: null,
				comments: state.comments.filter(com => com.commentId !== action.payload),
				loading: false,
				error: '',
			};
		case DELETE_COMMENT_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default commentReducer;
