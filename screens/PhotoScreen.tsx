import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Image, StyleSheet, View as ViewRN, Text as TextRN } from 'react-native';
import {
  AntDesign,
  MaterialIcons,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import DayJS from 'dayjs';
import { useHeaderHeight } from '@react-navigation/stack';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { Text, View } from '../components/Themed';

import { RootNavProps } from '../types';
import Divider from '../components/UI/Divider';

type PhotoScreenProps = RootNavProps<'Photo'>;

const PhotoScreen: React.FC<PhotoScreenProps> = ({ navigation, route }) => {
  const { photo } = route.params;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [isMyPhoto, setIsMyPhoto] = useState<Boolean>(false);
  const headerHeight = useHeaderHeight();

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
          <Feather name='more-vertical' size={24} color='white' style={styles.icon} />
        </View>
      ),
    });
  }, [isMyPhoto]);

  return (
    <View style={[styles.container, { marginTop: -headerHeight / 2 }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: photo.imageUri }} style={styles.image} />
      </View>
      <ViewRN style={styles.info}>
        <ViewRN style={styles.captionContainer}>
          <TextRN style={[styles.text, styles.username]}>
            {photo.creator.displayName}
          </TextRN>
          {photo.caption ? (
            <TextRN style={[styles.text, styles.caption]}>{photo.caption}</TextRN>
          ) : null}
          <Text style={[styles.text, styles.date]}>
            {DayJS(photo.createdAt).format('MMM DD [at] HH:mm')}
          </Text>
        </ViewRN>
        <ViewRN style={styles.reactCommentContainer}>
          <TextRN style={[styles.text, styles.reactCommentText]}>57 Reacts</TextRN>
          <TextRN style={[styles.text, styles.reactCommentText]}>12 Comments</TextRN>
        </ViewRN>
        <Divider marginVerticalValue={10} />
        {/* TODO: put this to a new component */}
        <ViewRN style={styles.postActions}>
          <ViewRN style={styles.actionItem}>
            <AntDesign name='like2' size={20} color='white' style={styles.actionIcon} />
            <Text style={styles.actionText}>Like</Text>
          </ViewRN>
          <ViewRN style={styles.actionItem}>
            <FontAwesome5
              name='comment'
              size={20}
              color='white'
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Comment</Text>
          </ViewRN>
          <ViewRN style={styles.actionItem}>
            <MaterialCommunityIcons name='share-outline' size={20} color='white' />
            <Text style={styles.actionText}>Share</Text>
          </ViewRN>
        </ViewRN>
      </ViewRN>
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
  captionContainer: {},
  text: {
    color: 'white',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  caption: {
    fontSize: 14,
  },
  date: {
    marginTop: 10,
    textTransform: 'uppercase',
    fontSize: 10,
    color: '#CCC',
  },
  reactCommentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  reactCommentText: {
    fontSize: 12,
    fontWeight: '700',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1 / 3,
    justifyContent: 'center',
    paddingVertical: 5,
  },
  actionIcon: {
    paddingRight: 5,
  },
  actionText: {
    fontSize: 13,
  },
});
