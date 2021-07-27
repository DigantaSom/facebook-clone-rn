import { Dispatch } from 'redux';
import { Alert, Platform } from 'react-native';

import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import firebase, { firestore, storage } from '../../firebase/firebase.utils';

import {
	FetchSinglePostDispatchType,
	FETCH_SINGLE_POST_START,
	FETCH_SINGLE_POST_SUCCESS,
	FETCH_SINGLE_POST_FAILURE,
	FetchUserPostsDispatchType,
	FETCH_USER_POSTS_START,
	FETCH_USER_POSTS_SUCCESS,
	FETCH_USER_POSTS_FAILURE,
	FetchAllPostsDispatchType,
	FETCH_ALL_POSTS_START,
	FETCH_ALL_POSTS_SUCCESS,
	FETCH_ALL_POSTS_FAILURE,
	CreatePostWithPhotoDispatchType,
	CREATE_POST_WITH_PHOTO_START,
	CREATE_POST_WITH_PHOTO_SUCCESS,
	CREATE_POST_WITH_PHOTO_FAILURE,
	DeletePhotoDispatchType,
	DELETE_PHOTO_START,
	DELETE_PHOTO_SUCCESS,
	DELETE_PHOTO_FAILURE,
	UpdateReactOnPostDispatchType,
	UPDATE_REACT_ON_POST_START,
	UPDATE_REACT_ON_POST_SUCCESS,
	UPDATE_REACT_ON_POST_FAILURE,
	UpdateCommentCountDispatchType,
	UPDATE_COMMENT_COUNT_START,
	UPDATE_COMMENT_COUNT_SUCCESS,
	UPDATE_COMMENT_COUNT_FAILURE,
} from './post.types';
import {
	BlobType,
	GenderType,
	IPost,
	IReaction,
	PostType,
	ReactionType,
	AddOrDeleteType,
	ReactorType,
} from '../../types';
import { IUser, REMOVE_PROFILE_PIC_FROM_USER } from '../user/user.types';
import {
	REMOVE_PROFILE_PIC_FROM_PROFILE,
	REMOVE_COVER_PIC_FROM_PROFILE,
} from '../profile/profile.types';
import { REMOVE_PHOTO_FROM_ALBUM } from '../album/album.types';

export const fetchSinglePost =
	(postId: string) => async (dispatch: Dispatch<FetchSinglePostDispatchType>) => {
		dispatch({
			type: FETCH_SINGLE_POST_START,
		});

		const postRef = firestore.collection('posts').doc(postId);

		try {
			const postSnapshot = await postRef.get();

			if (postSnapshot.exists) {
				dispatch({
					type: FETCH_SINGLE_POST_SUCCESS,
					payload: postSnapshot.data() as IPost,
				});
			} else {
				dispatch({
					type: FETCH_SINGLE_POST_FAILURE,
					payload: 'Post not found!',
				});
				Alert.alert('Error fetching post', 'Post not found!');
			}
		} catch (err) {
			dispatch({
				type: FETCH_SINGLE_POST_FAILURE,
				payload: err.message,
			});
			Alert.alert('Error fetching post', err.message);
		}
	};

export const fetchUserPosts =
	(userId: string) => async (dispatch: Dispatch<FetchUserPostsDispatchType>) => {
		dispatch({
			type: FETCH_USER_POSTS_START,
		});

		try {
			// TODO: Cursor Pagination

			const postsRef = firestore.collection('posts').orderBy('createdAt', 'desc');
			const postsSnapshot = await postsRef.get();

			// had to create an index for this in firestore
			const userPosts = await postsSnapshot.query.where('creator.id', '==', userId).get();

			const postsToDispatch: IPost[] = [];

			userPosts.docs.map(doc => {
				postsToDispatch.push(doc.data() as IPost);
			});

			dispatch({
				type: FETCH_USER_POSTS_SUCCESS,
				payload: postsToDispatch,
			});
		} catch (err) {
			dispatch({
				type: FETCH_USER_POSTS_FAILURE,
				payload: err.message,
			});
			Alert.alert("Error fetch user's posts", err.message);
		}
	};

export const fetchAllPosts =
	() => async (dispatch: Dispatch<FetchAllPostsDispatchType>) => {
		dispatch({
			type: FETCH_ALL_POSTS_START,
		});

		try {
			// TODO: Cursor Pagination
			const allPostsRef = firestore.collection('posts').orderBy('createdAt', 'desc');
			const allPostsSnapshot = await allPostsRef.get();

			const allPostsToDispatch: IPost[] = [];

			allPostsSnapshot.docs.map(doc => {
				allPostsToDispatch.push(doc.data() as IPost);
			});

			dispatch({
				type: FETCH_ALL_POSTS_SUCCESS,
				payload: allPostsToDispatch,
			});
		} catch (err) {
			dispatch({
				type: FETCH_ALL_POSTS_FAILURE,
				payload: err.message,
			});
			Alert.alert("Error fetch user's posts", err.message);
		}
	};

export const createPostWithPhoto =
	(postTitle: string, postPhoto: string, currentUser: IUser) =>
	async (dispatch: Dispatch<CreatePostWithPhotoDispatchType>) => {
		const uploadUri =
			Platform.OS === 'ios' ? postPhoto.replace('file://', '') : postPhoto;
		const newPostId = uuid();
		const newDate = new Date().toISOString();

		const blob: BlobType = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = () => {
				resolve(xhr.response);
			};
			xhr.onerror = () => {
				reject(new TypeError('Network request failed'));
			};
			xhr.responseType = 'blob';
			xhr.open('GET', uploadUri, true);
			xhr.send(null);
		});

		const ref = storage
			.ref(`timeline_pics/${currentUser.displayName}_${currentUser.id}`)
			.child(newPostId);

		const snapshot = ref.put(blob);

		snapshot.on(
			firebase.storage.TaskEvent.STATE_CHANGED,
			() => {
				dispatch({
					type: CREATE_POST_WITH_PHOTO_START,
				});
			},
			err => {
				dispatch({
					type: CREATE_POST_WITH_PHOTO_FAILURE,
					payload: err.message,
				});
				Alert.alert('Error posting', err.message, [{ text: 'Okay' }]);
				console.log('Error posting:', err);
				// blob.close();
				return;
			},
			() => {
				// success function
				snapshot.snapshot.ref.getDownloadURL().then(async url => {
					const albumsRef = firestore.collection('albums').doc(currentUser.id);
					const timelinePicsAlbum_Ref = albumsRef
						.collection('timeline_pics')
						.doc(newPostId);
					const allPicsAlbum_Ref = albumsRef.collection('all_pics').doc(newPostId);

					const postsRef = firestore.collection('posts').doc(newPostId);

					const newPostObj: IPost = {
						postId: newPostId,
						imageUri: url,
						title: postTitle,
						creator: {
							id: currentUser.id as string,
							displayName: currentUser.displayName as string,
							profilePicUri: currentUser.profilePic ? currentUser.profilePic : '',
							gender: currentUser.gender as GenderType,
						},
						createdAt: newDate,
						postType: 'Photo',
						reactions: [],
						commentCount: 0,
					};

					try {
						const batch = firestore.batch();

						batch.set(timelinePicsAlbum_Ref, newPostObj);
						batch.set(allPicsAlbum_Ref, newPostObj);
						batch.set(postsRef, newPostObj);

						const albumsSnapshot = await albumsRef.get();
						const all_albums_obj = albumsSnapshot.data();
						if (all_albums_obj) {
							// if 'timeline_pics' album does not already exists
							if (!all_albums_obj['all_albums'].includes('timeline_pics')) {
								await albumsSnapshot.ref.update({
									all_albums: firebase.firestore.FieldValue.arrayUnion('timeline_pics'),
								});
							}
						}

						await batch.commit();

						dispatch({
							type: CREATE_POST_WITH_PHOTO_SUCCESS,
							payload: newPostObj,
						});
						Alert.alert('Posted!', 'Your new post is uploaded.', [{ text: 'Noice!' }]);
					} catch (err) {
						dispatch({
							type: CREATE_POST_WITH_PHOTO_FAILURE,
							payload: err.message,
						});
						Alert.alert('Error posting pic', err.message, [{ text: 'Okay' }]);
						console.log('Error posting pic:', err);
					}

					return url;
				});
			},
		);
	};

export const deletePhoto =
	(photo: IPost, currentUser: IUser, postType: PostType) =>
	async (dispatch: Dispatch<DeletePhotoDispatchType>) => {
		dispatch({
			type: DELETE_PHOTO_START,
		});

		const userRef = firestore.collection('users').doc(currentUser.id);
		const profileRef = firestore.collection('profiles').doc(currentUser.id);

		const albumsRef = firestore.collection('albums').doc(currentUser.id);
		const allPicsAlbum_Ref = albumsRef.collection('all_pics').doc(photo.postId);

		const postsRef = firestore.collection('posts').doc(photo.postId);

		if (postType === 'Profile Pic') {
			const isCurrentProfilePic: boolean = photo.imageUri === currentUser.profilePic;

			const profilePic_StorageRef = storage
				.ref(`profile_pics/${currentUser.displayName}_${currentUser.id}`)
				.child(photo.postId);

			const profilePicsAlbum_Ref = albumsRef.collection('profile_pics').doc(photo.postId);

			try {
				await profilePic_StorageRef.delete();

				try {
					const batch = firestore.batch();

					// if it's the current profile pic, only then, delete from 'users' and 'profiles' collections.
					if (isCurrentProfilePic) {
						batch.update(userRef, {
							profilePic: firebase.firestore.FieldValue.delete(),
						});
						batch.update(profileRef, {
							profilePic: firebase.firestore.FieldValue.delete(),
						});
					}
					batch.delete(allPicsAlbum_Ref);
					batch.delete(profilePicsAlbum_Ref);
					batch.delete(postsRef);

					await batch.commit();

					if (isCurrentProfilePic) {
						dispatch({
							type: REMOVE_PROFILE_PIC_FROM_USER,
						});
						dispatch({
							type: REMOVE_PROFILE_PIC_FROM_PROFILE,
						});
					}
					dispatch({
						type: REMOVE_PHOTO_FROM_ALBUM,
						payload: photo.postId,
					});
					dispatch({
						type: DELETE_PHOTO_SUCCESS,
						payload: photo.postId,
					});
					Alert.alert('Deletion success!', 'Your profile pic is deleted successfully');
				} catch (err) {
					Alert.alert('Error deleting profile pic', err.message);
					dispatch({
						type: DELETE_PHOTO_FAILURE,
						payload: err.message,
					});
				}
			} catch (err) {
				Alert.alert('Error deleting profile pic', err.message);
				dispatch({
					type: DELETE_PHOTO_FAILURE,
					payload: err.message,
				});
			}
		} else if (postType === 'Cover Pic') {
			const profileSnapshot = await profileRef.get();
			const isCurrentProfilePic: boolean =
				photo.postId === profileSnapshot?.data()?.coverPic.postId;

			const coverPic_StorageRef = storage
				.ref(`cover_pics/${currentUser.displayName}_${currentUser.displayName}`)
				.child(photo.postId);

			const coverPicsAlbum_Ref = albumsRef.collection('cover_pics').doc(photo.postId);

			try {
				await coverPic_StorageRef.delete();

				try {
					const batch = firestore.batch();

					// if it's the current cover pic, only then, delete from 'profiles' collection.
					if (isCurrentProfilePic) {
						batch.update(profileRef, {
							coverPic: firebase.firestore.FieldValue.delete(),
						});
					}
					batch.delete(allPicsAlbum_Ref);
					batch.delete(coverPicsAlbum_Ref);
					batch.delete(postsRef);

					await batch.commit();

					if (isCurrentProfilePic) {
						dispatch({
							type: REMOVE_COVER_PIC_FROM_PROFILE,
						});
					}
					dispatch({
						type: REMOVE_PHOTO_FROM_ALBUM,
						payload: photo.postId,
					});
					dispatch({
						type: DELETE_PHOTO_SUCCESS,
						payload: photo.postId,
					});
					Alert.alert('Deletion success!', 'Your cover pic is deleted successfully');
				} catch (err) {
					Alert.alert('Error deleting cover pic', err.message);
					dispatch({
						type: DELETE_PHOTO_FAILURE,
						payload: err.message,
					});
				}
			} catch (err) {
				Alert.alert('Error deleting cover pic', err.message);
				dispatch({
					type: DELETE_PHOTO_FAILURE,
					payload: err.message,
				});
			}
		} else if (postType === 'Photo') {
			const timelinePic_StorageRef = storage
				.ref(`timeline_pics/${currentUser.displayName}_${currentUser.displayName}`)
				.child(photo.postId);

			const timelinePicsAlbum_Ref = albumsRef
				.collection('timeline_pics')
				.doc(photo.postId);

			try {
				await timelinePic_StorageRef.delete();

				try {
					const batch = firestore.batch();

					batch.delete(allPicsAlbum_Ref);
					batch.delete(timelinePicsAlbum_Ref);
					batch.delete(postsRef);

					await batch.commit();

					dispatch({
						type: REMOVE_PHOTO_FROM_ALBUM,
						payload: photo.postId,
					});
					dispatch({
						type: DELETE_PHOTO_SUCCESS,
						payload: photo.postId,
					});
					Alert.alert('Deletion success!', 'Your cover pic is deleted successfully');
				} catch (err) {
					Alert.alert('Error deleting photo', err.message);
					dispatch({
						type: DELETE_PHOTO_FAILURE,
						payload: err.message,
					});
				}
			} catch (err) {
				Alert.alert('Error deleting photo', err.message);
				dispatch({
					type: DELETE_PHOTO_FAILURE,
					payload: err.message,
				});
			}
		}
	};

export const updateReactOnPost =
	(postId: string, reaction: ReactionType, currentUser: IUser) =>
	async (dispatch: Dispatch<UpdateReactOnPostDispatchType>) => {
		dispatch({
			type: UPDATE_REACT_ON_POST_START,
		});

		const postRef = firestore.collection('posts').doc(postId);

		const newReactor: ReactorType = {
			reactorId: currentUser.id as string,
			reactorDisplayName: currentUser.displayName as string,
			reactorProfilePicUri: currentUser.profilePic ? currentUser.profilePic : '',
		};

		const newReactionObj: IReaction = {
			reaction,
			...newReactor,
		};

		try {
			const batch = firestore.batch();

			const postSnapshot = await postRef.get();
			const userReactionData: IReaction[] = postSnapshot.data()?.reactions;
			// console.log('userReactionData:', userReactionData);

			const userReactedObject: IReaction | undefined = userReactionData.find(
				r => r.reactorId === currentUser.id,
			);
			// console.log('userReactedObject:', userReactedObject);

			if (postSnapshot.exists) {
				// if there's no reaction on this post yet
				if (!userReactionData.length) {
					batch.update(postRef, {
						reactions: firebase.firestore.FieldValue.arrayUnion(newReactionObj),
					});
				} else {
					// if the user has already reacted to this post
					if (userReactedObject) {
						// if the user wants to change (not remove) their reaction
						if (userReactedObject.reaction !== reaction && reaction !== '') {
							batch.update(postRef, {
								reactions: firebase.firestore.FieldValue.arrayRemove(userReactedObject),
							});
							batch.update(postRef, {
								reactions: firebase.firestore.FieldValue.arrayUnion(newReactionObj),
							});
						} else if (reaction === '') {
							// else if the user wants to remove their reaction
							batch.update(postRef, {
								reactions: firebase.firestore.FieldValue.arrayRemove(userReactedObject),
							});
						}
					} else {
						// else if the user hasn't yet reacted to this post, but reactions are not empty
						batch.update(postRef, {
							reactions: firebase.firestore.FieldValue.arrayUnion(newReactionObj),
						});
					}
				}

				await batch.commit();

				dispatch({
					type: UPDATE_REACT_ON_POST_SUCCESS,
					payload: {
						postId,
						reaction,
						...newReactor,
					},
				});
			}
		} catch (err) {
			dispatch({
				type: UPDATE_REACT_ON_POST_FAILURE,
				payload: err.message,
			});
		}
	};

// Update 'commentCount' field on post reducer, after a comment is successfully added/deleted to/from comment state.
export const updateCommentCount =
	(postId: string, actionType: AddOrDeleteType) =>
	async (dispatch: Dispatch<UpdateCommentCountDispatchType>) => {
		dispatch({
			type: UPDATE_COMMENT_COUNT_START,
		});

		const postRef = firestore.collection('posts').doc(postId);

		try {
			if (actionType === 'add') {
				await postRef.update({
					commentCount: firebase.firestore.FieldValue.increment(1),
				});
				dispatch({
					type: UPDATE_COMMENT_COUNT_SUCCESS,
					payload: 'add',
				});
			} else if (actionType === 'delete') {
				await postRef.update({
					commentCount: firebase.firestore.FieldValue.increment(-1),
				});
				dispatch({
					type: UPDATE_COMMENT_COUNT_SUCCESS,
					payload: 'delete',
				});
			}
		} catch (err) {
			dispatch({
				type: UPDATE_COMMENT_COUNT_FAILURE,
				payload: err.message,
			});
		}
	};
