import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { AlbumsTabParamList, IPhoto } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';

import Layout from '../../constants/Layout';

interface PhotoGridItemProps {
  photo: IPhoto;
  navigation: StackNavigationProp<AlbumsTabParamList, 'AllPhotos'>;
}

const PhotoGridItem: React.FC<PhotoGridItemProps> = ({ photo, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => navigation.navigate('Photo', { photo })}>
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
