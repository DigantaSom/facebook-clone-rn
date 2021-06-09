import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AlbumsTabNavProps } from '../../types';

import { RootState } from '../../redux/store';
import { getAlbums } from '../../redux/album/album.actions';

import { Text, View } from '../../components/Themed';
import Spinner from '../../components/UI/Spinner';
import Center from '../../components/UI/Center';
import EmptyContent from '../../components/UI/EmptyContent';

import Layout from '../../constants/Layout';
import snakeCaseToCapitalizedSentence from '../../utils/snakeCaseToCapitalizedSentence';

type AlbumScreenProps = AlbumsTabNavProps<'Albums'>;

const AlbumsScreen: React.FC<AlbumScreenProps> = ({ navigation, route }) => {
  const { userId } = route.params;

  const dispatch = useDispatch();
  const { albumsPreview, loading } = useSelector((state: RootState) => state.album);

  useEffect(() => {
    dispatch(getAlbums(userId));
  }, [dispatch, getAlbums, userId]);

  if (loading) {
    return <Spinner />;
  }

  if (!albumsPreview.length) {
    return (
      <Center>
        <EmptyContent emptyType='Album' />
      </Center>
    );
  }

  return (
    <FlatList
      data={albumsPreview}
      keyExtractor={item => item.lastImageUri}
      numColumns={2}
      contentContainerStyle={styles.albumList}
      renderItem={({ item: { albumTitle, lastImageUri } }) => (
        <TouchableOpacity
          style={styles.albumContainer}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('IndividualAlbum', { albumTitle, userId })}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: lastImageUri }} style={styles.image} />
          </View>
          <Text style={styles.albumTitle}>
            {snakeCaseToCapitalizedSentence(albumTitle)}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default AlbumsScreen;

const styles = StyleSheet.create({
  albumList: {
    alignItems: 'center',
  },
  albumContainer: {
    margin: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  imageContainer: {
    width: Layout.window.width / 2.5,
    height: Layout.window.width / 2.5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  albumTitle: {
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 5,
  },
});
