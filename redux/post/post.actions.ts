import { Dispatch } from 'redux';
import { Alert, Platform } from 'react-native';

import {
  CreatePostWithPhotoDispatchType,
  CREATE_POST_WITH_PHOTO_START,
  CREATE_POST_WITH_PHOTO_SUCCESS,
  CREATE_POST_WITH_PHOTO_FAILURE,
  DeletePhotoDispatchType,
} from './post.types';
import { IUser } from '../user/user.types';
import { BlobType, IPost, PostType } from '../../types';

import firebase, { firestore, storage } from '../../firebase/firebase.utils';

export const createPostWithPhoto =
  (postTitle: string, postPhoto: string, currentUser: IUser) =>
  async (dispatch: Dispatch<CreatePostWithPhotoDispatchType>) => {
    const uploadUri =
      Platform.OS === 'ios' ? postPhoto.replace('file://', '') : postPhoto;

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
      .ref(`timeline_pics/${currentUser.displayName}`)
      .child(new Date().toISOString());

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
          const timelinePicsAlbum_Ref = albumsRef.collection('timeline_pics').doc();
          const allPicsAlbum_Ref = albumsRef.collection('all_pics').doc();

          const postRef = firestore.doc(`posts/${currentUser.id}`);
          const userPostsRef = postRef.collection('user_posts').doc();

          const newPostObj: IPost = {
            imageUri: url,
            title: postTitle,
            creator: {
              id: currentUser.id as string,
              displayName: currentUser.displayName as string,
            },
            createdAt: new Date().toISOString(),
            postType: 'Photo',
          };

          try {
            const batch = firestore.batch();

            batch.set(timelinePicsAlbum_Ref, newPostObj);
            batch.set(allPicsAlbum_Ref, newPostObj);
            batch.set(userPostsRef, newPostObj);

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
  (imageUri: string, postType: PostType) =>
  async (dispatch: Dispatch<DeletePhotoDispatchType>) => {};
