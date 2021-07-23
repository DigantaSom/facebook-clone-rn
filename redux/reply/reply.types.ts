import { IReply } from '../../types';
import { ISignOutSuccess } from '../user/user.types';

export const FETCH_ALL_REPLIES_START = 'FETCH_ALL_REPLIES_START';
export const FETCH_ALL_REPLIES_SUCCESS = 'FETCH_ALL_REPLIES_SUCCESS';
export const FETCH_ALL_REPLIES_FAILURE = 'FETCH_ALL_REPLIESFAILURET';

export const FETCH_SINGLE_REPLY_START = 'FETCH_SINGLE_REPLY_START';
export const FETCH_SINGLE_REPLY_SUCCESS = 'FETCH_SINGLE_REPLY_SUCCESS';
export const FETCH_SINGLE_REPLY_FAILURE = 'FETCH_SINGLE_REPLYFAILURET';

export const ADD_REPLY_START = 'ADD_REPLY_START';
export const ADD_REPLY_SUCCESS = 'ADD_REPLY_SUCCESS';
export const ADD_REPLY_FAILURE = 'ADD_REPLY_FAILURE';

export const DELETE_REPLY_START = 'DELETE_REPLY_START';
export const DELETE_REPLY_SUCCESS = 'DELETE_REPLY_SUCCESS';
export const DELETE_REPLY_FAILURE = 'DELETE_REPLY_FAILURE';

export const EDIT_REPLY_START = 'EDIT_REPLY_START';
export const EDIT_REPLY_SUCCESS = 'EDIT_REPLY_SUCCESS';
export const EDIT_REPLY_FAILURE = 'EDIT_REPLY_FAILURE';

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

// Fetch a single reply
export interface IFetchSingleReplyStart {
	type: typeof FETCH_SINGLE_REPLY_START;
}
export interface IFetchSingleReplySuccess {
	type: typeof FETCH_SINGLE_REPLY_SUCCESS;
	payload: IReply;
}
export interface IFetchSingleReplyFailure {
	type: typeof FETCH_SINGLE_REPLY_FAILURE;
	payload: string;
}
export type FetchSingleReplyDispatchType =
	| IFetchSingleReplyStart
	| IFetchSingleReplySuccess
	| IFetchSingleReplyFailure;

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

// Edit a particular reply
export interface IEditReplyStart {
	type: typeof EDIT_REPLY_START;
}
export interface IEditReplySuccess {
	type: typeof EDIT_REPLY_SUCCESS;
	payload: {
		replyId: string;
		body: string;
		modifiedAt: string;
	};
}
export interface IEditReplyFailure {
	type: typeof EDIT_REPLY_FAILURE;
	payload: string;
}
export type EditReplyDispatchType =
	| IEditReplyStart
	| IEditReplySuccess
	| IEditReplyFailure;

// Reply Action Type
export type ReplyActionType =
	| FetchAllRepliesDispatchType
	| FetchSingleReplyDispatchType
	| AddReplyDispatchType
	| DeleteReplyDispatchType
	| EditReplyDispatchType
	| ISignOutSuccess; // from user.types.ts
