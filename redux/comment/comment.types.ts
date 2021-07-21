import { IComment } from '../../types';

export const FETCH_ALL_COMMENTS_START = 'FETCH_ALL_COMMENTS_START';
export const FETCH_ALL_COMMENTS_SUCCESS = 'FETCH_ALL_COMMENTS_SUCCESS';
export const FETCH_ALL_COMMENTS_FAILURE = 'FETCH_ALL_COMMENTS_FAILURE';

export const ADD_COMMENT_START = 'ADD_COMMENT_START';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const DELETE_COMMENT_START = 'DELETE_COMMENT_START';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

// Fetch all comments of a post
export interface IFetchAllCommentsStart {
	type: typeof FETCH_ALL_COMMENTS_START;
}
export interface IFetchAllCommentsSuccess {
	type: typeof FETCH_ALL_COMMENTS_SUCCESS;
	payload: IComment[];
}
export interface IFetchAllCommentsFailure {
	type: typeof FETCH_ALL_COMMENTS_FAILURE;
	payload: string;
}
export type FetchAllCommentsDispatchType =
	| IFetchAllCommentsStart
	| IFetchAllCommentsSuccess
	| IFetchAllCommentsFailure;

// Comment on a post
export interface IAddCommentStart {
	type: typeof ADD_COMMENT_START;
}
export interface IAddCommentSuccess {
	type: typeof ADD_COMMENT_SUCCESS;
	payload: IComment;
}
export interface IAddCommentFailure {
	type: typeof ADD_COMMENT_FAILURE;
	payload: string;
}
export type AddCommentDispatchType =
	| IAddCommentStart
	| IAddCommentSuccess
	| IAddCommentFailure;

// Delete a particular comment
export interface IDeleteCommentStart {
	type: typeof DELETE_COMMENT_START;
}
export interface IDeleteCommentSuccess {
	type: typeof DELETE_COMMENT_SUCCESS;
	payload: string; // commentId
}
export interface IDeleteCommentFailure {
	type: typeof DELETE_COMMENT_FAILURE;
	payload: string;
}
export type DeleteCommentDispatchType =
	| IDeleteCommentStart
	| IDeleteCommentSuccess
	| IDeleteCommentFailure;

// Comment Action Type
export type CommentActionType =
	| FetchAllCommentsDispatchType
	| AddCommentDispatchType
	| DeleteCommentDispatchType;
