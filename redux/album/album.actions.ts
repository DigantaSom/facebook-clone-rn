import { Dispatch } from 'redux';
import { Alert } from 'react-native';

import {
  GetAllPhotosDispatchType,
  GET_ALL_PHOTOS_START,
  GET_ALL_PHOTOS_SUCCESS,
  GET_ALL_PHOTOS_FAILURE,
  GetAlbumsDispatchType,
  AlbumPreviewType,
  GET_ALBUMS_START,
  GET_ALBUMS_SUCCESS,
  GET_ALBUMS_FAILURE,
  GetAlbumPicsDispatchType,
  GET_ALBUM_PICS_START,
  GET_ALBUM_PICS_SUCCESS,
  GET_ALBUM_PICS_FAILURE,
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
    dispatch({
      type: GET_ALBUMS_START,
    });

    try {
      const albumsRef = firestore.collection('albums').doc(userId);
      const albumsSnapshot = await albumsRef.get();

      const all_albums_obj = albumsSnapshot.data();
      const all_albums_array: string[] = [];

      if (all_albums_obj) {
        if (Object.keys(all_albums_obj).length) {
          all_albums_obj['all_albums'].forEach((albumTitle: string) => {
            all_albums_array.push(albumTitle);
          });
        }
      }

      let customAlbumRef, customAlbumSnapshot;
      const all_albums_dispatchArray: AlbumPreviewType[] = [];

      if (all_albums_array.length) {
        all_albums_array.forEach(async albumTitle => {
          customAlbumRef = firestore
            .collection('albums')
            .doc(userId)
            .collection(albumTitle)
            .orderBy('createdAt', 'desc');
          customAlbumSnapshot = await customAlbumRef.get();

          if (customAlbumSnapshot.docs[0].data()) {
            all_albums_dispatchArray.push({
              albumTitle,
              lastImageUri: customAlbumSnapshot.docs[0].data().imageUri,
            });
          }
          // TODO: dispatch it outside forEach loop,
          // before that make sure that 'all_albums_dispatchArray' isn't coming [] -_-
          dispatch({
            type: GET_ALBUMS_SUCCESS,
            payload: all_albums_dispatchArray,
          });
        });
      }
    } catch (err) {
      dispatch({
        type: GET_ALBUMS_FAILURE,
        payload: err.message,
      });
    }
  };

export const getAlbumPics =
  (userId: string, albumName: string) =>
  async (dispatch: Dispatch<GetAlbumPicsDispatchType>) => {
    try {
      const albumPicsRef = firestore
        .collection('albums')
        .doc(userId)
        .collection(albumName)
        .orderBy('createdAt', 'desc');

      dispatch({
        type: GET_ALBUM_PICS_START,
      });

      const albumPicsSnapshot = await albumPicsRef.get();

      const photosToDispatch: IPhoto[] = [];

      albumPicsSnapshot.docs.forEach(doc => {
        photosToDispatch.push(doc.data() as IPhoto);
      });

      dispatch({
        type: GET_ALBUM_PICS_SUCCESS,
        payload: photosToDispatch,
      });
    } catch (err) {
      Alert.alert('Error while fetching pics', err.message);
      dispatch({
        type: GET_ALBUM_PICS_FAILURE,
        payload: err.message,
      });
    }
  };
