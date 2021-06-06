import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { FlatList, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchAllPosts } from '../redux/post/post.actions';

import { TopTabNavProps } from '../types';

import { Text, View } from '../components/Themed';
import CreatePostWidget from '../components/post/CreatePostWidget';
import Spinner from '../components/UI/Spinner';
import PostItem from '../components/post/PostItem';

type HomeScreenProps = TopTabNavProps<'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { posts, loading: postsLoading } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  // TODO: 'postsLoading' is not becoming true while fetching posts, i.e., it remains false, so the spinner isn't showing.

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAllPosts());
    }, [fetchAllPosts]),
  );

  if (postsLoading) {
    return <Spinner />;
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      ListHeaderComponent={<CreatePostWidget navigation={navigation} />}
      data={posts}
      keyExtractor={item => item.postId}
      renderItem={({ item }) => <PostItem post={item} navigationFromHome={navigation} />}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
