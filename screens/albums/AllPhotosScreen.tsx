import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { useDispatch } from 'react-redux';
import { getAllPhotos } from '../../redux/album/album.actions';

import { Text, View } from '../../components/Themed';

import { AlbumsTabNavProps } from '../../types';

type AllPhotosScreenProps = AlbumsTabNavProps<'AllPhotos'>;

const AllPhotosScreen: React.FC<AllPhotosScreenProps> = ({ route }) => {
  const { userId } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPhotos(userId));
  }, [dispatch, getAllPhotos, userId]);

  return (
    <View>
      <Text>AllPhotosScreen</Text>
    </View>
  );
};

export default AllPhotosScreen;

const styles = StyleSheet.create({});
