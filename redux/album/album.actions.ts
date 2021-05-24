import { Dispatch } from 'redux';
import { Alert } from 'react-native';

import {
  GetAllPhotosDispatchType,
  GET_ALL_PHOTOS_START,
  GET_ALL_PHOTOS_SUCCESS,
  GET_ALL_PHOTOS_FAILURE,
  GetAlbumsDispatchType,
  GET_ALBUMS_START,
  GET_ALBUMS_FAILURE,
} from './album.types';
import { IPhoto } from '../../types';

import { firestore } from '../../firebase/firebase.utils';

export const getAllPhotos =
  (userId: string) => async (dispatch: Dispatch<GetAllPhotosDispatchType>) => {
    try {
      const all_pics_Ref = firestore
        .collection('albums')
        .doc(userId)
        .collection('all_pics')
        .orderBy('createdAt', 'desc');

      dispatch({
        type: GET_ALL_PHOTOS_START,
      });

      const all_pics_Snapshot = await all_pics_Ref.get();

      const all_photos: IPhoto[] = [];
      all_pics_Snapshot.docs.forEach(doc => {
        all_photos.push(doc.data() as IPhoto);
      });

      dispatch({
        type: GET_ALL_PHOTOS_SUCCESS,
        payload: all_photos,
      });
    } catch (err) {
      Alert.alert('Error fetching all photos', err.message);
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
