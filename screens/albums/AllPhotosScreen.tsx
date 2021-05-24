import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getAllPhotos } from '../../redux/album/album.actions';

import { AlbumsTabNavProps } from '../../types';

import { View, Text } from '../../components/Themed';
import Spinner from '../../components/UI/Spinner';
import PhotoGridItem from '../../components/post/PhotoGridItem';
import NoPhotoComponent from '../../components/post/NoPhotoComponent';

type AllPhotosScreenProps = AlbumsTabNavProps<'AllPhotos'>;

const AllPhotosScreen: React.FC<AllPhotosScreenProps> = ({ navigation, route }) => {
  const { userId } = route.params;
  const dispatch = useDispatch();
  const { all_photos, loading } = useSelector((state: RootState) => state.album);

  useEffect(() => {
    dispatch(getAllPhotos(userId));
  }, [dispatch, getAllPhotos, userId]);

  const noPhoto = all_photos.length === 0;

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={noPhoto ? styles.noPhoto_parentContainer : styles.gridContainer}>
      {noPhoto ? (
        <NoPhotoComponent />
      ) : (
        <FlatList
          data={all_photos}
          keyExtractor={item => item.imageUri}
          numColumns={3}
          renderItem={({ item }) => (
            <PhotoGridItem photo={item} navigation={navigation} />
          )}
        />
      )}
    </View>
  );
};

export default AllPhotosScreen;

const styles = StyleSheet.create({
  gridContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  noPhoto_parentContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
});
