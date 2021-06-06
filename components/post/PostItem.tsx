import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import DayJS from 'dayjs';

import { Entypo } from '@expo/vector-icons';
import { Text, View } from '../Themed';
import Colors from '../../constants/Colors';

import { IPost, MenuStackParamList, TopTabParamList } from '../../types';

import DPcontainer from '../UI/DPcontainer';
import Divider from '../UI/Divider';
import ReactCommentShow from './ReactCommentShow';
import PostActions from './PostActions';

interface PostItemProps {
  post: IPost;
  navigationFromHome?: StackNavigationProp<TopTabParamList, 'Home'>;
  navigationFromProfile?: StackNavigationProp<MenuStackParamList, 'Profile'>;
}

const PostItem: React.FC<PostItemProps> = ({
  post,
  navigationFromHome,
  navigationFromProfile,
}) => {
  const { creator, postType, title, imageUri, createdAt } = post;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => {
        // TODO: go to comment section of this post
        console.log('hello');
      }}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigationFromHome
                ? navigationFromHome.navigate('Profile', { userId: creator.id })
                : navigationFromProfile?.navigate('Profile', { userId: creator.id });
            }}>
            <DPcontainer imageUri={creator.profilePicUri} />
          </TouchableOpacity>

          <View style={styles.info}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigationFromHome
                  ? navigationFromHome.navigate('Profile', { userId: creator.id })
                  : navigationFromProfile?.navigate('Profile', { userId: creator.id });
              }}>
              <Text style={styles.displayName}>{creator.displayName}</Text>
            </TouchableOpacity>
            <Text style={styles.createdAt}>{DayJS(createdAt).format('MMM DD')}</Text>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
          <Entypo name='dots-three-horizontal' size={20} color={Colors.grayText} />
        </TouchableOpacity>
      </View>

      <View style={styles.postContent}>
        {!title ? null : <Text style={styles.postTitle}>{title}</Text>}
        {!imageUri ? null : (
          <TouchableOpacity
            style={styles.photoContainer}
            activeOpacity={0.6}
            onPress={() => {
              navigationFromHome
                ? navigationFromHome.navigate('Photo', { photo: post })
                : navigationFromProfile?.navigate('Photo', { photo: post });
            }}>
            <Image source={{ uri: imageUri }} style={styles.photo} />
          </TouchableOpacity>
        )}
      </View>

      <ReactCommentShow />
      <PostActions />

      <Divider />
    </TouchableOpacity>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.dark.cardBackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    paddingLeft: 12,
  },
  displayName: {
    fontWeight: 'bold',
  },
  createdAt: {
    fontSize: 13,
    color: Colors.grayText,
  },
  postContent: {},
  postTitle: {
    padding: 10,
    fontSize: 15,
  },
  photoContainer: {
    width: '100%',
    maxHeight: 350,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
});
