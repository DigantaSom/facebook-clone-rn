import { Dispatch } from 'redux';
import { Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import {
	RootStackParamList,
	IComment,
	GenderType,
	IReaction,
	ReactionType,
	AddOrDeleteType,
} from '../../types';
import {
	FetchAllCommentsDispatchType,
	FETCH_ALL_COMMENTS_START,
	FETCH_ALL_COMMENTS_SUCCESS,
	FETCH_ALL_COMMENTS_FAILURE,
	FetchSingleCommentDispatchType,
	FETCH_SINGLE_COMMENT_START,
	FETCH_SINGLE_COMMENT_SUCCESS,
	FETCH_SINGLE_COMMENT_FAILURE,
	AddCommentDispatchType,
	ADD_COMMENT_START,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILURE,
	DeleteCommentDispatchType,
	DELETE_COMMENT_START,
	DELETE_COMMENT_FAILURE,
	DELETE_COMMENT_SUCCESS,
	EditCommentDispatchType,
	EDIT_COMMENT_START,
	EDIT_COMMENT_SUCCESS,
	EDIT_COMMENT_FAILURE,
	UpdateReactOnCommentDispatchType,
	UPDATE_REACT_ON_COMMENT_START,
	UPDATE_REACT_ON_COMMENT_FAILURE,
	UPDATE_REACT_ON_COMMENT_SUCCESS,
	UpdateReplyCountDispatchType,
	UPDATE_REPLY_COUNT_START,
	UPDATE_REPLY_COUNT_SUCCESS,
	UPDATE_REPLY_COUNT_FAILURE,
} from './comment.types';
import { IUser } from '../user/user.types';

import firebase, { firestore } from '../../firebase/firebase.utils';
import { updateCommentCount } from '../post/post.actions';

// Fetch all comments of a post
export const fetchAllComments =
	(postId: string) => async (dispatch: Dispatch<FetchAllCommentsDispatchType>) => {
		dispatch({
			type: FETCH_ALL_COMMENTS_START,
		});

		const postRef = firestore.collection('posts').doc(postId);
		const commentsRef = postRef.collection('comments').orderBy('createdAt');

		try {
			const commentsSnapshot = await commentsRef.get();

			const commentsToDispatch: IComment[] = [];
			commentsSnapshot.docs.map(comment => {
				commentsToDispatch.push(comment.data() as IComment);
			});

			dispatch({
				type: FETCH_ALL_COMMENTS_SUCCESS,
				payload: commentsToDispatch,
			});
		} catch (err) {
			dispatch({
				type: FETCH_ALL_COMMENTS_FAILURE,
				payload: err.message,
			});
			Alert.alert('Failed to load comments', err.message);
		}
	};

// Fetch a particular single comment
export const fetchSingleComment =
	(postId: string, commentId: string) =>
	async (dispatch: Dispatch<FetchSingleCommentDispatchType>) => {
		dispatch({
			type: FETCH_SINGLE_COMMENT_START,
		});

		const postRef = firestore.collection('posts').doc(postId);
		const commentRef = postRef.collection('comments').doc(commentId);

		try {
			const commentSnapshot = await commentRef.get();

			if (!commentSnapshot.exists) {
				dispatch({
					type: FETCH_SINGLE_COMMENT_FAILURE,
					payload: "Comment doesn't exist.",
				});
				Alert.alert('Failed to load comment', "Comment doesn't exist.");
				return;
			}

			dispatch({
				type: FETCH_SINGLE_COMMENT_SUCCESS,
				payload: commentSnapshot.data() as IComment,
			});
		} catch (err) {
			dispatch({
				type: FETCH_SINGLE_COMMENT_FAILURE,
				payload: err.message,
			});
			Alert.alert('Failed to load comment', err.message);
		}
	};

// Add a comment to a post
export const addComment =
	(body: string, postId: string, currentUser: IUser) =>
	async (dispatch: Dispatch<AddCommentDispatchType>) => {
		dispatch({
			type: ADD_COMMENT_START,
		});

		const newCommentId = uuid();
		const newDate = new Date().toISOString();

		const postRef = firestore.collection('posts').doc(postId);
		const commentRef = postRef.collection('comments').doc(newCommentId);

		try {
			const postSnapshot = await postRef.get();
			if (!postSnapshot.exists) {
				dispatch({
					type: ADD_COMMENT_FAILURE,
					payload: 'Post not found!',
				});
				Alert.alert('Failed to add comment', 'Post not found!');
				return;
			}

			const newCommentObj: IComment = {
				postId,
				commentId: newCommentId,
				body,
				creator: {
					id: currentUser.id as string,
					displayName: currentUser.displayName as string,
					profilePicUri: currentUser.profilePic ? currentUser.profilePic : '',
					gender: currentUser.gender as GenderType,
				},
				createdAt: newDate,
				commentReactions: [],
				replyCount: 0,
			};

			await commentRef.set(newCommentObj);

			dispatch({
				type: ADD_COMMENT_SUCCESS,
				payload: newCommentObj,
			});
			// Update comment-count in post state.
			dispatch(updateCommentCount(postId, 'add') as any);

			// Alert.alert('Success!', 'Comment added.');
		} catch (err) {
			dispatch({
				type: ADD_COMMENT_FAILURE,
				payload: err.message,
			});
			Alert.alert('Failed to add comment', err.message);
		}
	};

// Delete a comment
export const deleteComment =
	(postId: string, commentId: string, currentUser: IUser) =>
	async (dispatch: Dispatch<DeleteCommentDispatchType>) => {
		dispatch({
			type: DELETE_COMMENT_START,
		});

		const postRef = firestore.collection('posts').doc(postId);
		const commentRef = postRef.collection('comments').doc(commentId);

		try {
			const postSnapshot = await postRef.get();
			if (!postSnapshot.exists) {
				dispatch({
					type: DELETE_COMMENT_FAILURE,
					payload: 'Post not found.',
				});
				Alert.alert('Failed to delete comment', 'Post not found.');
				return;
			}

			const commentSnapshot = await commentRef.get();
			if (!commentSnapshot.exists) {
				dispatch({
					type: DELETE_COMMENT_FAILURE,
					payload: 'Comment not found.',
				});
				Alert.alert('Failed to delete comment', 'Comment not found.');
				return;
			}

			const targetComment: IComment | undefined = commentSnapshot.data() as
				| IComment
				| undefined;

			// only the creator of the comment should be able to delete their comment
			if (targetComment?.creator.id !== currentUser.id) {
				dispatch({
					type: DELETE_COMMENT_FAILURE,
					payload: 'You are unauthorized to delete this comment!',
				});
				Alert.alert(
					'Failed to delete comment',
					'You are unauthorized to delete this comment!',
				);
				return;
			}

			// All good now. Delete the comment.
			await commentRef.delete();

			// Update comment count in post state.
			dispatch(updateCommentCount(postId, 'delete') as any);

			dispatch({
				type: DELETE_COMMENT_SUCCESS,
				payload: commentId,
			});

			Alert.alert('Success!', 'Comment deleted successfully.');
		} catch (err) {
			dispatch({
				type: DELETE_COMMENT_FAILURE,
				payload: err.message,
			});
			Alert.alert('Failed to delete comment', err.message);
		}
	};

// Edit a particular comment
export const editComment =
	(
		postId: string,
		commentId: string,
		body: string,
		currentUser: IUser,
		navigation: StackNavigationProp<RootStackParamList, 'EditComment'>,
	) =>
	async (dispatch: Dispatch<EditCommentDispatchType>) => {
		const postRef = firestore.collection('posts').doc(postId);
		const commentRef = postRef.collection('comments').doc(commentId);

		const modifiedAt = new Date().toISOString();

		dispatch({
			type: EDIT_COMMENT_START,
		});

		try {
			const postSnapshot = await postRef.get();
			if (!postSnapshot.exists) {
				dispatch({
					type: EDIT_COMMENT_FAILURE,
					payload: 'Post not found.',
				});
				Alert.alert('Failed to delete comment', 'Post not found.');
				return;
			}

			const commentSnapshot = await commentRef.get();
			if (!commentSnapshot.exists) {
				dispatch({
					type: EDIT_COMMENT_FAILURE,
					payload: 'Comment not found.',
				});
				Alert.alert('Failed to delete comment', 'Comment not found.');
				return;
			}

			const targetComment: IComment | undefined = commentSnapshot.data() as
				| IComment
				| undefined;

			// only the creator of the comment should be able to edit their comment
			if (targetComment?.creator.id !== currentUser.id) {
				dispatch({
					type: EDIT_COMMENT_FAILURE,
					payload: 'You are unauthorized to edit this comment!',
				});
				Alert.alert(
					'Failed to edit comment',
					'You are unauthorized to edit this comment!',
				);
				return;
			}

			// All good. Now edit the comment.
			await commentRef.update({
				body,
				modifiedAt,
			});

			dispatch({
				type: EDIT_COMMENT_SUCCESS,
				payload: {
					commentId,
					body,
					modifiedAt,
				},
			});
			Alert.alert('Edit success', 'Comment edited successfully');
			navigation.goBack();
		} catch (err) {
			dispatch({
				type: EDIT_COMMENT_FAILURE,
				payload: err.message,
			});
			Alert.alert('Failed to edit comment', err.message);
		}
	};

// React/update react on a comment
export const updateReactOnComment =
	(postId: string, commentId: string, reaction: ReactionType, reactorId: string) =>
	async (dispatch: Dispatch<UpdateReactOnCommentDispatchType>) => {
		dispatch({
			type: UPDATE_REACT_ON_COMMENT_START,
		});

		const postRef = firestore.collection('posts').doc(postId);
		const commentRef = postRef.collection('comments').doc(commentId);

		const newReactionObj: IReaction = {
			reactorId,
			reaction,
		};

		try {
			const batch = firestore.batch();

			const commentSnapshot = await commentRef.get();
			if (!commentSnapshot.exists) {
				dispatch({
					type: UPDATE_REACT_ON_COMMENT_FAILURE,
					payload: 'Comment does not exist.',
				});
				Alert.alert('Failed to react on comment', 'Comment does not exist.');
			}

			const userReactionData: IReaction[] = commentSnapshot.data()?.commentReactions;

			const userReactedObject: IReaction | undefined = userReactionData.find(
				r => r.reactorId === reactorId,
			);

			// if there's no reaction on this comment yet
			if (!userReactionData.length) {
				batch.update(commentRef, {
					commentReactions: firebase.firestore.FieldValue.arrayUnion(newReactionObj),
				});
			} else {
				// if the user has already reacted to this comment
				if (userReactedObject) {
					// if the user wants to change (not remove) their reaction
					if (userReactedObject.reaction !== reaction && reaction !== '') {
						batch.update(commentRef, {
							commentReactions:
								firebase.firestore.FieldValue.arrayRemove(userReactedObject),
						});
						batch.update(commentRef, {
							commentReactions: firebase.firestore.FieldValue.arrayUnion(newReactionObj),
						});
					} else if (reaction === '') {
						// else if the user wants to remove their reaction
						batch.update(commentRef, {
							commentReactions:
								firebase.firestore.FieldValue.arrayRemove(userReactedObject),
						});
					}
				} else {
					// else if the user hasn't yet reacted to this post, but commentReactions are not empty
					batch.update(commentRef, {
						commentReactions: firebase.firestore.FieldValue.arrayUnion(newReactionObj),
					});
				}
			}

			await batch.commit();

			dispatch({
				type: UPDATE_REACT_ON_COMMENT_SUCCESS,
				payload: {
					commentId,
					reaction,
					reactorId,
				},
			});
		} catch (err) {
			dispatch({
				type: UPDATE_REACT_ON_COMMENT_FAILURE,
				payload: err.message,
			});
		}
	};

// Update 'replyCount' field on comment reducer, after a reply is successfully added/deleted to/from reply state.
export const updateReplyCount =
	(postId: string, commentId: string, actionType: AddOrDeleteType) =>
	async (dispatch: Dispatch<UpdateReplyCountDispatchType>) => {
		dispatch({
			type: UPDATE_REPLY_COUNT_START,
		});

		const postRef = firestore.collection('posts').doc(postId);
		const commentRef = postRef.collection('comments').doc(commentId);

		try {
			if (actionType === 'add') {
				await commentRef.update({
					replyCount: firebase.firestore.FieldValue.increment(1),
				});
				dispatch({
					type: UPDATE_REPLY_COUNT_SUCCESS,
					payload: 'add',
				});
			} else if (actionType === 'delete') {
				await commentRef.update({
					replyCount: firebase.firestore.FieldValue.increment(-1),
				});
				dispatch({
					type: UPDATE_REPLY_COUNT_SUCCESS,
					payload: 'delete',
				});
			}
		} catch (err) {
			dispatch({
				type: UPDATE_REPLY_COUNT_FAILURE,
				payload: err.message,
			});
		}
	};
