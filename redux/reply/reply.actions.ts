import { Dispatch } from 'redux';
import { Alert } from 'react-native';

import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import { IReply, GenderType } from '../../types';
import {
	FetchAllRepliesDispatchType,
	FETCH_ALL_REPLIES_START,
	FETCH_ALL_REPLIES_SUCCESS,
	FETCH_ALL_REPLIES_FAILURE,
	AddReplyDispatchType,
	ADD_REPLY_START,
	ADD_REPLY_SUCCESS,
	ADD_REPLY_FAILURE,
	DeleteReplyDispatchType,
	DELETE_REPLY_START,
	DELETE_REPLY_SUCCESS,
	DELETE_REPLY_FAILURE,
} from './reply.types';
import { IUser } from '../user/user.types';

import { firestore } from '../../firebase/firebase.utils';
import { updateReplyCount } from '../comment/comment.actions';

// Fetch all replies of a comment of a post
export const fetchAllReplies =
	(postId: string, commentId: string) =>
	async (dispatch: Dispatch<FetchAllRepliesDispatchType>) => {
		const postRef = firestore.collection('posts').doc(postId);
		const commentRef = postRef.collection('comments').doc(commentId);
		const repliesRef = commentRef.collection('replies').orderBy('createdAt');

		dispatch({
			type: FETCH_ALL_REPLIES_START,
		});

		try {
			const repliesSnapshot = await repliesRef.get();

			const repliesToDispatch: IReply[] = [];
			repliesSnapshot.docs.map(reply => {
				repliesToDispatch.push(reply.data() as IReply);
			});

			dispatch({
				type: FETCH_ALL_REPLIES_SUCCESS,
				payload: repliesToDispatch,
			});
		} catch (err) {
			dispatch({
				type: FETCH_ALL_REPLIES_FAILURE,
				payload: err.message,
			});
			Alert.alert('Failed to load replies', err.message);
		}
	};

// Reply on a comment of a post
export const addReply =
	(body: string, postId: string, commentId: string, currentUser: IUser) =>
	async (dispatch: Dispatch<AddReplyDispatchType>) => {
		const newReplyId = uuid();
		const newDate = new Date().toISOString();

		const postRef = firestore.collection('posts').doc(postId);
		const commentRef = postRef.collection('comments').doc(commentId);
		const replyRef = commentRef.collection('replies').doc(newReplyId);

		dispatch({
			type: ADD_REPLY_START,
		});

		try {
			const commentsSnapshot = await commentRef.get();
			if (!commentsSnapshot.exists) {
				dispatch({
					type: ADD_REPLY_FAILURE,
					payload: 'Comment does not exist.',
				});
				Alert.alert('Failed to reply', 'Comment does not exist.');
				return;
			}

			const newReplyObj: IReply = {
				postId,
				commentId,
				replyId: newReplyId,
				body,
				creator: {
					id: currentUser.id as string,
					displayName: currentUser.displayName as string,
					profilePicUri: currentUser.profilePic ? currentUser.profilePic : '',
					gender: currentUser.gender as GenderType,
				},
				createdAt: newDate,
				replyReactions: [],
			};

			await replyRef.set(newReplyObj);

			dispatch({
				type: ADD_REPLY_SUCCESS,
				payload: newReplyObj,
			});

			// Update reply-count in comment state.
			dispatch(updateReplyCount(postId, commentId, 'add') as any);
		} catch (err) {
			dispatch({
				type: ADD_REPLY_FAILURE,
				payload: err.message,
			});
			Alert.alert('Failed to reply', err.message);
			console.log('Failed to reply:', err.message);
		}
	};

// Delete a reply
export const deleteReply =
	(postId: string, commentId: string, replyId: string, currentUser: IUser) =>
	async (dispatch: Dispatch<DeleteReplyDispatchType>) => {
		const postRef = firestore.collection('posts').doc(postId);
		const commentRef = postRef.collection('comments').doc(commentId);
		const replyRef = commentRef.collection('replies').doc(replyId);

		dispatch({
			type: DELETE_REPLY_START,
		});

		try {
			const replySnapshot = await replyRef.get();

			if (!replySnapshot.exists) {
				dispatch({
					type: DELETE_REPLY_FAILURE,
					payload: 'Reply does not exist.',
				});
				Alert.alert('Failed to delete reply', 'Reply does not exist.');
				return;
			}

			const targetReply: IReply | undefined = replySnapshot.data() as IReply | undefined;

			// only the creator of the reply should be able to delete their reply
			if (targetReply?.creator.id !== currentUser.id) {
				dispatch({
					type: DELETE_REPLY_FAILURE,
					payload: 'You are unauthorized to delete this reply',
				});
				Alert.alert(
					'Failed to delete reply',
					'You are unauthorized to delete this reply',
				);
				return;
			}

			// All good now. Delete the reply.
			await replyRef.delete();

			// Update the replyCount in comment state
			dispatch(updateReplyCount(postId, commentId, 'delete') as any);

			dispatch({
				type: DELETE_REPLY_SUCCESS,
				payload: replyId,
			});
			Alert.alert('Success!', 'Reply deleted successfully.');
		} catch (err) {
			dispatch({
				type: DELETE_REPLY_FAILURE,
				payload: err.message,
			});
			Alert.alert('Failed to delete reply', err.message);
		}
	};
