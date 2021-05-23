import { Dispatch } from 'redux';

import {
  GetAllPhotosDispatchType,
  GET_ALL_PHOTOS_START,
  GET_ALL_PHOTOS_SUCCESS,
  GET_ALL_PHOTOS_FAILURE,
  GetAlbumsDispatchType,
  GET_ALBUMS_START,
  GET_ALBUMS_FAILURE,
} from './album.types';

import { firestore } from '../../firebase/firebase.utils';

export const getAllPhotos =
  (userId: string) => async (dispatch: Dispatch<GetAllPhotosDispatchType>) => {
    try {
      const albumsRef = firestore.collection('albums').doc(userId);
      const profile_pics_Ref = albumsRef.collection('profile_pics');
      const cover_pics_Ref = albumsRef.collection('cover_pics');

      dispatch({
        type: GET_ALL_PHOTOS_START,
      });

      const profile_pics_Snapshot = await profile_pics_Ref.get();
      const cover_pics_Snapshot = await cover_pics_Ref.get();

      const all_photos: any[] = [];

      profile_pics_Snapshot.docs.forEach(doc => {
        all_photos.push(doc.data());
      });
      cover_pics_Snapshot.docs.forEach(doc => {
        all_photos.push(doc.data());
      });

      console.log('=======================================');

      console.log('all_photos:', all_photos);
    } catch (err) {
      dispatch({
        type: GET_ALL_PHOTOS_FAILURE,
        payload: err.message,
      });
    }
  };

export const getAlbums =
  (userId: string) => async (dispatch: Dispatch<GetAlbumsDispatchType>) => {
    try {
      const albumsRef = firestore.collection('albums').doc(userId);

      dispatch({
        type: GET_ALBUMS_START,
      });

      const albumsSnapshot = await albumsRef.get();
      console.log(albumsSnapshot.data());
    } catch (err) {
      dispatch({
        type: GET_ALBUMS_FAILURE,
        payload: err.message,
      });
    }
  };
