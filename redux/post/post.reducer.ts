import { IPost, IReaction } from '../../types';
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
	UPDATE_REACT_ON_POST_START,
	UPDATE_REACT_ON_POST_SUCCESS,
	UPDATE_REACT_ON_POST_FAILURE,
	UPDATE_POSTS,
	FETCH_SINGLE_POST_START,
	FETCH_SINGLE_POST_FAILURE,
	FETCH_SINGLE_POST_SUCCESS,
	ADD_COMMENT_START,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILURE,
} from './post.types';
import { updateReactionOnPost } from './post.utils';

interface IDefaultState {
	post: IPost | null;
	posts: IPost[];
	loading: boolean;
	reactionLoading: boolean;
	commentsLoading: boolean;
	error: string;
}

const defaultState: IDefaultState = {
	post: null,
	posts: [],
	loading: false,
	reactionLoading: false,
	commentsLoading: false,
	error: '',
};

const postReducer = (
	state: IDefaultState = defaultState,
	action: PostActionType,
): IDefaultState => {
	switch (action.type) {
		// Fetch a single post
		case FETCH_SINGLE_POST_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_SINGLE_POST_SUCCESS:
			return {
				...state,
				post: action.payload,
				loading: false,
				error: '',
			};
		case FETCH_SINGLE_POST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

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
				error: '',
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
				error: '',
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
				error: '',
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

		// React/remove react on a post
		case UPDATE_REACT_ON_POST_START:
			return {
				...state,
				reactionLoading: true,
			};
		case UPDATE_REACT_ON_POST_SUCCESS:
			const newReactionObj: IReaction = {
				reactorId: action.payload.reactorId,
				reaction: action.payload.reaction,
			};
			return {
				...state,
				post: state.post
					? {
							...state.post,
							reactions: updateReactionOnPost(state.post.reactions, newReactionObj),
					  }
					: null,
				posts: state.posts.map(post =>
					post.postId === action.payload.postId
						? {
								...post,
								reactions:
									newReactionObj.reaction !== ''
										? [newReactionObj, ...post.reactions]
										: post.reactions.filter(
												r => r.reactorId !== newReactionObj.reactorId,
										  ),
						  }
						: post,
				),
				loading: false,
				reactionLoading: false,
			};
		case UPDATE_REACT_ON_POST_FAILURE:
			return {
				...state,
				loading: false,
				reactionLoading: false,
				error: action.payload,
			};

		// Comment on a post
		case ADD_COMMENT_START:
			return {
				...state,
				commentsLoading: true,
			};
		case ADD_COMMENT_SUCCESS:
			return {
				...state,
				commentsLoading: false,
				post: state.post
					? {
							...state.post,
							comments: [action.payload, ...state.post.comments],
					  }
					: null,
				posts: state.posts.map(post =>
					post.postId === action.payload.postId
						? {
								...post,
								comments: [action.payload, ...post.comments],
						  }
						: post,
				),
				loading: false,
			};
		case ADD_COMMENT_FAILURE:
			return {
				...state,
				loading: false,
				commentsLoading: false,
				error: action.payload,
			};

		// Update posts[] array to have the newly created profile/cover pic
		case UPDATE_POSTS:
			return {
				...state,
				posts: [action.payload, ...state.posts],
				loading: false,
			};

		default:
			return state;
	}
};

export default postReducer;
