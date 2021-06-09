import React, { useEffect, useLayoutEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getAlbumPics } from '../../redux/album/album.actions';

import Spinner from '../../components/UI/Spinner';
import PhotoGrid from '../../components/post/PhotoGrid';

import { AlbumsTabNavProps } from '../../types';

import snakeCaseToCapitalizedSentence from '../../utils/snakeCaseToCapitalizedSentence';

type IndividualAlbumScreenProps = AlbumsTabNavProps<'IndividualAlbum'>;

const IndividualAlbumScreen: React.FC<IndividualAlbumScreenProps> = ({
  navigation,
  route,
}) => {
  const { albumTitle, userId } = route.params;
  const dispatch = useDispatch();
  const { photos, loading } = useSelector((state: RootState) => state.album);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: snakeCaseToCapitalizedSentence(albumTitle),
    });
  }, [albumTitle]);

  useEffect(() => {
    dispatch(getAlbumPics(userId, albumTitle));
  }, [getAlbumPics, userId, albumTitle]);

  if (loading) {
    return <Spinner />;
  }

  return <PhotoGrid photoList={photos} navigation={navigation} />;
};

export default IndividualAlbumScreen;
