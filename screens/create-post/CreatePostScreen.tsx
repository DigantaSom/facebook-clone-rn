import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { createPostWithPhoto } from '../../redux/post/post.actions';

import { RootNavProps } from '../../types';

import { Text, View } from '../../components/Themed';
import Spinner from '../../components/UI/Spinner';
import HeaderActionButton from '../../components/UI/HeaderActionButton';
import DPcontainer from '../../components/UI/DPcontainer';
import PostSettingItem from '../../components/post/PostSettingItem';
import CreatePostBottomDrawer from '../../components/bottom-drawers/CreatePostBottomDrawer';

import useValues from '../../hooks/useValues';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

type CreatePostScreenProps = RootNavProps<'CreatePost'>;

const CreatePostScreen: React.FC<CreatePostScreenProps> = ({ navigation }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postPhoto, setPostPhoto] = useState('');

  const values = useValues();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { loading: postUploading, error } = useSelector((state: RootState) => state.post);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderActionButton
          actionType='Post'
          disabled={!postTitle || !postPhoto}
          onPressAction={() => {
            if ((postTitle || postPhoto) && currentUser) {
              dispatch(createPostWithPhoto(postTitle, postPhoto, currentUser));
            }
            if (!postUploading || !error) {
              navigation.navigate('Root');
            }
          }}
        />
      ),
    });
  }, [postTitle, postPhoto, currentUser, createPostWithPhoto, postUploading, error]);

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleCloseModal = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  // others
  const handlePostPhoto = (pickedImage: string) => {
    setPostPhoto(pickedImage);
  };

  if (postUploading) {
    return <Spinner />;
  }

  return !currentUser ? null : (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          height: Layout.window.height - values.tabHeaderHeight - 60,
        }}>
        <View style={styles.header}>
          <DPcontainer imageUri={currentUser.profilePic} />
          <View style={styles.headerRight}>
            <Text style={styles.displayName}>{currentUser.displayName}</Text>
            <View style={styles.postSettingsContainer}>
              {/* TODO: make it dynamic later, according to user's settings */}
              <PostSettingItem
                title='Friends'
                icon={
                  <FontAwesome5
                    name='user-friends'
                    size={12}
                    color={Colors.dark.tabIconDefault}
                  />
                }
                postSettingsType='Privacy'
              />
              <PostSettingItem
                title='Album'
                icon={
                  <AntDesign name='plus' size={14} color={Colors.dark.tabIconDefault} />
                }
                postSettingsType='Album'
              />
            </View>
          </View>
        </View>

        <ScrollView
          style={[
            styles.postContent,
            {
              maxHeight: Layout.window.height - values.tabHeaderHeight - 60 - 150,
            },
          ]}>
          <TextInput
            placeholder="What's on your mind?"
            placeholderTextColor={Colors.dark.placeholderColor}
            style={styles.input}
            value={postTitle}
            onChangeText={t => setPostTitle(t)}
            maxLength={values.maxLength_postTitle}
            multiline
            onFocus={handleCloseModal}
          />

          {!postPhoto ? null : (
            <View style={styles.postPhotoContainer}>
              <Image source={{ uri: postPhoto }} style={styles.postPhoto} />
            </View>
          )}
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handlePresentModalPress}
          style={styles.seeOptionsButtonContainer}>
          <View style={styles.seeOptionsButton}>
            <Text>Add to your Post</Text>
          </View>
        </TouchableOpacity>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <CreatePostBottomDrawer handlePostPhoto={handlePostPhoto} />
      </BottomSheetModal>
    </ScrollView>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  headerRight: {
    marginLeft: 20,
  },
  displayName: {
    fontWeight: 'bold',
  },
  postSettingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 150,
  },
  postContent: {
    marginVertical: 20,
    backgroundColor: Colors.dark.cardBackground,
    borderWidth: 1,
    borderColor: Colors.dark.tabIconDefault,
    borderRadius: 4,
  },
  input: {
    fontSize: 20,
    color: 'white',
    padding: 10,
    // maxHeight: '100%',
  },
  postPhotoContainer: {
    width: Layout.window.width - 30,
    height: Layout.window.width - 30,
    alignItems: 'center',
  },
  postPhoto: {
    width: '100%',
    height: '100%',
  },
  seeOptionsButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  seeOptionsButton: {
    backgroundColor: Colors.facebookSecondary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 4,
  },
});
