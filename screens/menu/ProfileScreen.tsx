import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { StyleSheet, FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { View, Text } from '../../components/Themed';

import { MenuNavProps, TopTabNavProps } from '../../types';

import { RootState } from '../../redux/store';
import { getProfile } from '../../redux/profile/profile.actions';

import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileHeaderInfo from '../../components/profile/ProfileHeaderInfo';
import ProfileAbout from '../../components/profile/ProfileAbout';
import ProfileFriends from '../../components/profile/ProfileFriends';
import ProfileCreatePost from '../../components/profile/ProfileCreatePost';

import Divider from '../../components/UI/Divider';
import Spinner from '../../components/UI/Spinner';
import Center from '../../components/UI/Center';
import PostItem from '../../components/post/PostItem';

import ProfilePicBottomDrawer from '../../components/bottom-drawers/ProfilePicBottomDrawer';
import CoverPicBottomDrawer from '../../components/bottom-drawers/CoverPicBottomDrawer';
import ProfileWidgets from '../../components/profile/ProfileWidgets';
import { fetchUserPosts } from '../../redux/post/post.actions';

type ProfileScreenProps = MenuNavProps<'Profile'>;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  const [isProfilePicPressed, setIsProfilePicPressed] = useState(false);

  const {
    currentUser,
    loading: userLoading,
    uploading,
  } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { userId } = route.params;
  const isMyProfile = currentUser!.id === userId;

  const { profile, loading: profileLoading } = useSelector(
    (state: RootState) => state.profile,
  );
  const { posts, loading: postsLoading } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch(getProfile(userId));
  }, [getProfile, userId]);

  useEffect(() => {
    dispatch(fetchUserPosts(userId));
  }, [fetchUserPosts, userId]);

  const handleIsProfilePicPressed = () => {
    setIsProfilePicPressed(true);
  };

  const handleIsCoverPicPressed = () => {
    setIsProfilePicPressed(false);
  };

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['75%', '75%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    if (isMyProfile) {
      bottomSheetModalRef.current?.present();
    } else {
      if (isProfilePicPressed && profile?.profilePic) {
        navigation.navigate('Photo', { postId: profile.profilePic.postId });
      } else if (!isProfilePicPressed && profile?.coverPic) {
        navigation.navigate('Photo', { postId: profile.coverPic.postId });
      }
    }
  }, [isMyProfile, isProfilePicPressed, profile?.profilePic, profile?.coverPic]);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleCloseModal = () => bottomSheetModalRef.current?.close();

  if (userLoading || profileLoading || uploading || postsLoading) {
    return <Spinner />;
  }

  if (!profile) {
    return (
      <Center>
        <Text>Profile not found</Text>
      </Center>
    );
  }

  return (
    <View>
      <FlatList
        style={styles.container}
        ListHeaderComponent={
          <View style={styles.profileScreen_top}>
            <ProfileHeader
              handleShowPicOptions={handlePresentModalPress}
              handleIsProfilePicPressed={handleIsProfilePicPressed}
              handleIsCoverPicPressed={handleIsCoverPicPressed}
              profilePic={profile.profilePic ? profile.profilePic : undefined}
              coverPic={profile.coverPic ? profile.coverPic : undefined}
            />

            <ProfileHeaderInfo
              userDisplayName={profile.displayName}
              isMyProfile={isMyProfile}
            />
            <Divider />

            {isMyProfile && currentUser ? (
              profile.about ? (
                <ProfileAbout
                  profileAbout={profile.about}
                  profileDisplayName={profile.displayName}
                  joined={profile.joined}
                  navigation={navigation}
                  currentUser={currentUser}
                  isMyProfile
                />
              ) : (
                <View style={styles.addProfileAboutButtonContainer}>
                  <Button
                    title='Add profile about'
                    onPress={() => {
                      navigation.navigate('AddOrEditProfileAbout', {
                        isEdit: false,
                        currentUser: currentUser,
                      });
                    }}
                  />
                </View>
              )
            ) : profile.about && currentUser ? (
              <ProfileAbout
                profileAbout={profile.about}
                profileDisplayName={profile.displayName} // not using this in this condition. TODO: fix it.
                joined={profile.joined}
              />
            ) : (
              <Text style={{ textAlign: 'center' }}>No profile information</Text>
            )}

            <Divider />

            <ProfileFriends />
            <Divider />

            {isMyProfile ? (
              <ProfileCreatePost currentUser={currentUser} navigation={navigation} />
            ) : null}

            <ProfileWidgets
              navigation={navigation}
              userId={profile.userId}
              displayName={profile.displayName}
            />
            <Divider />
          </View>
        }
        data={posts}
        keyExtractor={item => item.postId}
        renderItem={({ item }) => (
          <PostItem post={item} navigationFromProfile={navigation} />
        )}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        {!currentUser ? null : (
          <View style={styles.bottomSheet}>
            {isProfilePicPressed ? (
              <ProfilePicBottomDrawer
                navigation={navigation}
                currentUser={currentUser}
                profilePic={profile.profilePic}
                handleCloseModal={handleCloseModal}
              />
            ) : (
              <CoverPicBottomDrawer
                navigation={navigation}
                currentUser={currentUser}
                coverPic={profile.coverPic}
                handleCloseModal={handleCloseModal}
              />
            )}
          </View>
        )}
      </BottomSheetModal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  profileScreen_top: {},
  bottomSheet: {},
  addProfileAboutButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
