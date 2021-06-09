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
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { Text, View } from '../components/Themed';
import PostActions from '../components/post/PostActions';
import PhotoBottomDrawer from '../components/bottom-drawers/PhotoBottomDrawer';
import ReactCommentShow from '../components/post/ReactCommentShow';

import { RootNavProps } from '../types';
import useValues from '../hooks/useValues';
import { fetchSinglePost } from '../redux/post/post.actions';
import Spinner from '../components/UI/Spinner';

type PhotoScreenProps = RootNavProps<'Photo'>;

const PhotoScreen: React.FC<PhotoScreenProps> = ({ navigation, route }) => {
  const { postId } = route.params;
  const [isMyPhoto, setIsMyPhoto] = useState(false);
  const { tabHeaderHeight } = useValues();

  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { post, loading: postLoading } = useSelector((state: RootState) => state.post);

  console.log('post:', post);

  useEffect(() => {
    dispatch(fetchSinglePost(postId));
  }, [fetchSinglePost, postId]);

  useEffect(() => {
    if (post?.creator.id === currentUser?.id) {
      setIsMyPhoto(true);
    }
  }, [post, currentUser]);

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

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['40%', '40%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(() => {}, []);

  const handleCloseModal = () => bottomSheetModalRef.current?.collapse();

  if (postLoading) {
    return <Spinner />;
  }
  if (!post) {
    return null;
  }

  return (
    <View style={[styles.container, { marginTop: -tabHeaderHeight / 2 }]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={handlePresentModalPress}
        style={styles.imageContainer}>
        <Image source={{ uri: post.imageUri }} style={styles.image} />
      </TouchableOpacity>

      <ViewRN style={styles.info}>
        <ViewRN style={styles.titleContainer}>
          <Text style={styles.username}>{post.creator.displayName}</Text>
          {post.title ? <Text style={styles.title}>{post.title}</Text> : null}
          <Text style={styles.date}>
            {DayJS(post.createdAt).format('MMM DD [at] HH:mm')}
          </Text>
        </ViewRN>

        <ReactCommentShow reactions={post.reactions} />

        {!currentUser ? null : <PostActions currentUser={currentUser} post={post} />}
      </ViewRN>

      {!currentUser ? null : (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <PhotoBottomDrawer
            photo={post}
            currentUser={currentUser}
            isMyPhoto={isMyPhoto}
            navigation={navigation}
          />
        </BottomSheetModal>
      )}
    </View>
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
  titleContainer: {},
  username: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    marginTop: 5,
    fontSize: 14,
  },
  date: {
    marginTop: 15,
    textTransform: 'uppercase',
    fontSize: 10,
    color: '#CCC',
  },
});
