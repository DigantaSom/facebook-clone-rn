import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getAllPhotos } from '../../redux/album/album.actions';

import { AlbumsTabNavProps } from '../../types';

import Spinner from '../../components/UI/Spinner';
import PhotoGrid from '../../components/post/PhotoGrid';

type AllPhotosScreenProps = AlbumsTabNavProps<'AllPhotos'>;

const AllPhotosScreen: React.FC<AllPhotosScreenProps> = ({ navigation, route }) => {
  const { userId } = route.params;
  const dispatch = useDispatch();
  const { allPhotos, loading } = useSelector((state: RootState) => state.album);

  useEffect(() => {
    dispatch(getAllPhotos(userId));
  }, [dispatch, getAllPhotos, userId]);

  if (loading) {
    return <Spinner />;
  }

  return <PhotoGrid photoList={allPhotos} navigation={navigation} />;
};

export default AllPhotosScreen;
