import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { Image, StyleSheet, View as ViewRN, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import DayJS from 'dayjs';
import { useHeaderHeight } from '@react-navigation/stack';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { Text, View } from '../components/Themed';
import Divider from '../components/UI/Divider';
import PostActions from '../components/post/PostActions';
import PhotoBottomDrawer from '../components/bottom-drawers/PhotoBottomDrawer';

import { RootNavProps } from '../types';

type PhotoScreenProps = RootNavProps<'Photo'>;

const PhotoScreen: React.FC<PhotoScreenProps> = ({ navigation, route }) => {
  const { photo } = route.params;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [isMyPhoto, setIsMyPhoto] = useState<Boolean>(false);
  const headerHeight = useHeaderHeight();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['40%', '40%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(() => {}, []);

  useEffect(() => {
    if (photo.creator.id === currentUser?.id) {
      setIsMyPhoto(true);
    }
  }, [photo.creator.id, currentUser]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightIcons}>
          {!isMyPhoto ? null : (
            <>
              <AntDesign name='tago' size={24} color='white' style={styles.icon} />
              <MaterialIcons name='place' size={24} color='white' style={styles.icon} />
            </>
          )}
          <TouchableOpacity activeOpacity={0.6} onPress={handlePresentModalPress}>
            <Feather name='more-vertical' size={24} color='white' style={styles.icon} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [isMyPhoto]);

  const handleCloseModal = () => bottomSheetModalRef.current?.collapse();

  return (
    <TouchableOpacity
      style={[styles.container, { marginTop: -headerHeight / 2 }]}
      activeOpacity={0.9}
      onLongPress={handlePresentModalPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: photo.imageUri }} style={styles.image} />
      </View>

      <ViewRN style={styles.info}>
        <ViewRN style={styles.captionContainer}>
          <Text style={styles.username}>{photo.creator.displayName}</Text>
          {photo.caption ? <Text style={styles.caption}>{photo.caption}</Text> : null}
          <Text style={styles.date}>
            {DayJS(photo.createdAt).format('MMM DD [at] HH:mm')}
          </Text>
        </ViewRN>

        <ViewRN style={styles.reactCommentContainer}>
          <Text style={styles.reactCommentText}>57 Reacts</Text>
          <Text style={styles.reactCommentText}>12 Comments</Text>
        </ViewRN>

        <Divider marginVerticalValue={10} />

        <PostActions />
      </ViewRN>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <PhotoBottomDrawer />
      </BottomSheetModal>
    </TouchableOpacity>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    paddingRight: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    maxHeight: 350,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    left: 0,
    paddingHorizontal: 10,
    minHeight: 100,
    width: '100%',
  },
  captionContainer: {},
  username: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  caption: {
    marginTop: 5,
    fontSize: 14,
  },
  date: {
    marginTop: 15,
    textTransform: 'uppercase',
    fontSize: 10,
    color: '#CCC',
  },
  reactCommentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  reactCommentText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
