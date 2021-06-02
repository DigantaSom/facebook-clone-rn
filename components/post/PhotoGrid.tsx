import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { AlbumsTabParamList, IPost } from '../../types';

import { View } from '../Themed';
import Center from '../UI/Center';
import EmptyContent from '../UI/EmptyContent';
import PhotoGridItem from './PhotoGridItem';

type PhotoGridProps = {
  photoList: IPost[];
  navigation:
    | StackNavigationProp<AlbumsTabParamList, 'AllPhotos'>
    | StackNavigationProp<AlbumsTabParamList, 'IndividualAlbum'>;
};

const PhotoGrid: React.FC<PhotoGridProps> = ({ photoList, navigation }) => {
  const noPhoto = photoList.length === 0;

  if (noPhoto) {
    return (
      <Center>
        <EmptyContent emptyType='photo' />
      </Center>
    );
  }

  return (
    <View style={styles.gridContainer}>
      <FlatList
        data={photoList}
        keyExtractor={item => item.imageUri}
        numColumns={3}
        renderItem={({ item }) => <PhotoGridItem photo={item} navigation={navigation} />}
      />
    </View>
  );
};

export default PhotoGrid;

const styles = StyleSheet.create({
  gridContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
});
