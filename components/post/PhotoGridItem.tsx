import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { AlbumsTabParamList, IPost } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';

import Layout from '../../constants/Layout';

type PhotoGridItemProps = {
  photo: IPost;
  navigation:
    | StackNavigationProp<AlbumsTabParamList, 'AllPhotos'>
    | StackNavigationProp<AlbumsTabParamList, 'IndividualAlbum'>;
};

const PhotoGridItem: React.FC<PhotoGridItemProps> = ({ photo, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => navigation.navigate('Photo', { postId: photo.postId })}>
      <Image source={{ uri: photo.imageUri }} style={styles.image} />
    </TouchableOpacity>
  );
};

export default PhotoGridItem;

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width / 3.4,
    height: Layout.window.width / 3.4,
    margin: 2.5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
