import { IReply } from '../../types';
import { ISignOutSuccess } from '../user/user.types';

export const FETCH_ALL_REPLIES_START = 'FETCH_ALL_REPLIES_START';
export const FETCH_ALL_REPLIES_SUCCESS = 'FETCH_ALL_REPLIES_SUCCESS';
export const FETCH_ALL_REPLIES_FAILURE = 'FETCH_ALL_REPLIESFAILURET';

export const ADD_REPLY_START = 'ADD_REPLY_START';
export const ADD_REPLY_SUCCESS = 'ADD_REPLY_SUCCESS';
export const ADD_REPLY_FAILURE = 'ADD_REPLY_FAILURE';

export const DELETE_REPLY_START = 'DELETE_REPLY_START';
export const DELETE_REPLY_SUCCESS = 'DELETE_REPLY_SUCCESS';
export const DELETE_REPLY_FAILURE = 'DELETE_REPLY_FAILURE';

// Fetch all replies of a comment of a post
export interface IFetchAllRepliesStart {
	type: typeof FETCH_ALL_REPLIES_START;
}
export interface IFetchAllRepliesSuccess {
	type: typeof FETCH_ALL_REPLIES_SUCCESS;
	payload: IReply[];
}
export interface IFetchAllRepliesFailure {
	type: typeof FETCH_ALL_REPLIES_FAILURE;
	payload: string;
}
export type FetchAllRepliesDispatchType =
	| IFetchAllRepliesStart
	| IFetchAllRepliesSuccess
	| IFetchAllRepliesFailure;

// Reply on a comment of a post
export interface IAddReplyStart {
	type: typeof ADD_REPLY_START;
}
export interface IAddReplySuccess {
	type: typeof ADD_REPLY_SUCCESS;
	payload: IReply;
}
export interface IAddReplyFailure {
	type: typeof ADD_REPLY_FAILURE;
	payload: string;
}
export type AddReplyDispatchType = IAddReplyStart | IAddReplySuccess | IAddReplyFailure;

// Delete a reply
export interface IDeleteReplyStart {
	type: typeof DELETE_REPLY_START;
}
export interface IDeleteReplySuccess {
	type: typeof DELETE_REPLY_SUCCESS;
	payload: string; // replyId
}
export interface IDeleteReplyFailure {
	type: typeof DELETE_REPLY_FAILURE;
	payload: string; // error message
}
export type DeleteReplyDispatchType =
	| IDeleteReplyStart
	| IDeleteReplySuccess
	| IDeleteReplyFailure;

// Reply Action Type
export type ReplyActionType =
	| FetchAllRepliesDispatchType
	| AddReplyDispatchType
	| DeleteReplyDispatchType
	| ISignOutSuccess; // from user.types.ts
