import { Dispatch } from 'redux';
import { Platform, Alert } from 'react-native';

import {
  IProfile,
  GetProfileDispatchType,
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  UploadCoverPicDispatchType,
  UPLOAD_COVER_PIC_FAILURE,
  UPLOAD_COVER_PIC_START,
  UPLOAD_COVER_PIC_SUCCESS,
  AddOrEditProfileAboutDispatchType,
  ProfileAboutType,
  RelationshipStatusType,
  ADD_OR_EDIT_PROFILE_ABOUT_FAILURE,
  ADD_OR_EDIT_PROFILE_ABOUT_START,
  ADD_OR_EDIT_PROFILE_ABOUT_SUCCESS,
  SearchProfilesDispatchType,
  SEARCH_PROFILES_START,
  SEARCH_PROFILES_SUCCESS,
  SEARCH_PROFILES_FAILURE,
} from './profile.types';
import { IUser } from '../user/user.types';
import { BlobType, ProfileAndCoverPicType } from '../../types';

import firebase from '../../firebase/firebase.utils';
import { firestore, storage } from '../../firebase/firebase.utils';

export const getProfile =
  (userId: string | undefined) => async (dispatch: Dispatch<GetProfileDispatchType>) => {
    try {
      const profileRef = firestore.doc(`profiles/${userId}`);

      dispatch({
        type: GET_PROFILE_START,
      });

      const profileSnapshot = await profileRef.get();
      if (profileSnapshot.data()) {
        dispatch({
          type: GET_PROFILE_SUCCESS,
          payload: profileSnapshot.data() as IProfile,
        });
      } else {
        dispatch({
          type: GET_PROFILE_FAILURE,
          payload: 'No profile found',
        });
        Alert.alert('Error while fetching profile', 'No profile found', [
          { text: 'Okay' },
        ]);
      }

      // dispatch({
      //   type: GET_PROFILE_SUCCESS,
      //   payload: profileSnapshot.data()
      // })
    } catch (err) {
      dispatch({
        type: GET_PROFILE_FAILURE,
        payload: err.message,
      });
      Alert.alert('Error while fetching profile', err.message, [{ text: 'Okay' }]);
    }
  };

export const uploadCoverPic =
  (currentUser: IUser, imageUri: string, caption: string) =>
  async (dispatch: Dispatch<UploadCoverPicDispatchType>) => {
    // const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;

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
      .ref(`cover_pics/${currentUser.displayName}`)
      .child(new Date().toISOString());

    const snapshot = ref.put(blob);

    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        dispatch({
          type: UPLOAD_COVER_PIC_START,
        });
      },
      err => {
        dispatch({
          type: UPLOAD_COVER_PIC_FAILURE,
          payload: err.message,
        });
        Alert.alert('Error uploading cover pic', err.message, [{ text: 'Okay' }]);
        console.log('Error uploading cover pic:', err);
        // blob.close();
        return;
      },
      () => {
        // success function
        snapshot.snapshot.ref.getDownloadURL().then(async url => {
          const profileRef = firestore.doc(`profiles/${currentUser.id}`);
          const coverPicsAlbum_Ref = firestore
            .collection('albums')
            .doc(currentUser.id)
            .collection('cover_pics')
            .doc();
          const allPicsAlbum_Ref = firestore
            .collection('albums')
            .doc(currentUser.id)
            .collection('cover_pics')
            .doc();

          const newCoverPicObj: ProfileAndCoverPicType = {
            imageUri: url,
            caption,
            creator: {
              id: currentUser.id as string,
              displayName: currentUser.displayName as string,
            },
            createdAt: new Date().toISOString(),
          };

          try {
            const batch = firestore.batch();

            batch.update(profileRef, {
              coverPic: newCoverPicObj,
            });
            batch.set(coverPicsAlbum_Ref, newCoverPicObj);
            batch.set(allPicsAlbum_Ref, newCoverPicObj);

            await batch.commit();

            dispatch({
              type: UPLOAD_COVER_PIC_SUCCESS,
              payload: newCoverPicObj,
            });
            Alert.alert(
              'Cover Photo updated!',
              'Your new Cover Photo is set successfully.',
              [{ text: 'Noice!' }],
            );
          } catch (err) {
            dispatch({
              type: UPLOAD_COVER_PIC_FAILURE,
              payload: err.message,
            });
            Alert.alert('Error uploading cover pic', err.message, [{ text: 'Okay' }]);
            console.log('Error uploading cover pic:', err);
          }

          return url;
        });
      },
    );
  };

export const addOrEditProfileAbout =
  (
    userId: string,
    livesInLocation: string,
    fromLocation: string,
    relationshipStatus: RelationshipStatusType,
    isEdit: boolean,
  ) =>
  async (dispatch: Dispatch<AddOrEditProfileAboutDispatchType>) => {
    try {
      dispatch({
        type: ADD_OR_EDIT_PROFILE_ABOUT_START,
      });

      const profileRef = firestore.doc(`profiles/${userId}`);

      const newProfileAboutObj: ProfileAboutType = {
        location: {
          from: fromLocation,
          livesIn: livesInLocation,
        },
        relationshipStatus,
      };

      await profileRef.update({
        about: newProfileAboutObj,
      });

      dispatch({
        type: ADD_OR_EDIT_PROFILE_ABOUT_SUCCESS,
        payload: newProfileAboutObj,
      });

      Alert.alert(
        'Success!',
        `Profile information ${isEdit ? 'edited' : 'added'} successfully.`,
        [{ text: 'Hurray!' }],
      );
    } catch (err) {
      dispatch({
        type: ADD_OR_EDIT_PROFILE_ABOUT_FAILURE,
        payload: err.message,
      });
      Alert.alert('Error while adding profile about', err.message, [{ text: 'Okay' }]);
    }
  };

export const searchProfiles =
  (searchQuery: string) => async (dispatch: Dispatch<SearchProfilesDispatchType>) => {
    if (searchQuery.trim().length < 3) {
      dispatch({
        type: SEARCH_PROFILES_FAILURE,
        payload: '',
      });
      return;
    }

    try {
      const profileRef = firestore.collection('profiles');

      dispatch({
        type: SEARCH_PROFILES_START,
      });

      const profiles = await profileRef
        .orderBy('displayName')
        .startAt(searchQuery)
        .endAt(searchQuery + '\uf8ff')
        .get();

      const results: IProfile[] = [];
      profiles.docs.forEach(doc => results.push(doc.data() as IProfile));

      dispatch({
        type: SEARCH_PROFILES_SUCCESS,
        payload: results,
      });
    } catch (err) {
      dispatch({
        type: SEARCH_PROFILES_FAILURE,
        payload: err.message,
      });
    }
  };
