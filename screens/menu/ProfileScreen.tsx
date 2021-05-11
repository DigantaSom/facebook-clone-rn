import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { StyleSheet, FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { View, Text } from '../../components/Themed';

import { MenuNavProps } from '../../types';
import { IUser } from '../../redux/user/user.types';
import { ProfileAboutType } from '../../redux/profile/profile.types';

import { RootState } from '../../redux/store';
import { getProfile } from '../../redux/profile/profile.actions';

import ProfileHeader from '../../components/profile-screen-components/ProfileHeader';
import ProfileHeaderInfo from '../../components/profile-screen-components/ProfileHeaderInfo';
import ProfileAbout from '../../components/profile-screen-components/ProfileAbout';
import ProfileFriends from '../../components/profile-screen-components/ProfileFriends';
import ProfileCreatePost from '../../components/profile-screen-components/ProfileCreatePost';

import Divider from '../../components/UI/Divider';
import Spinner from '../../components/UI/Spinner';
import Center from '../../components/UI/Center';

import posts from '../../utils/dummy-posts';
import PostItem from '../../components/post/PostItem';

import ProfilePicBottomDrawer from '../../components/bottom-drawers/ProfilePicBottomDrawer';
import CoverPicBottomDrawer from '../../components/bottom-drawers/CoverPicBottomDrawer';

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

  useEffect(() => {
    dispatch(getProfile(userId));
  }, [dispatch, getProfile, userId]);

  const { profile, loading: profileLoading } = useSelector(
    (state: RootState) => state.profile,
  );

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
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  if (userLoading || profileLoading || uploading) {
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
              isMyProfile={profile.userId === userId}
            />
            <Divider />

            {profile.userId === userId ? (
              profile.about ? (
                <ProfileAbout
                  profileAbout={profile.about}
                  joined={profile.joined}
                  navigation={navigation}
                  currentUser={currentUser as IUser}
                  isMyProfile
                />
              ) : (
                <View style={styles.addProfileAboutButtonContainer}>
                  <Button
                    title='Add profile about'
                    onPress={() =>
                      navigation.navigate('AddOrEditProfileAbout', {
                        isEdit: false,
                        currentUser: currentUser!,
                        profileAbout: profile.about as ProfileAboutType,
                      })
                    }
                  />
                </View>
              )
            ) : profile.about ? (
              <ProfileAbout profileAbout={profile.about} joined={profile.joined} />
            ) : (
              <Text style={{ textAlign: 'center' }}>No profile information</Text>
            )}

            <Divider />

            <ProfileFriends />
            <Divider />

            <ProfileCreatePost navigation={navigation} />
          </View>
        }
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <PostItem post={item} />}
      />

      <BottomSheetModalProvider>
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
                />
              ) : (
                <CoverPicBottomDrawer navigation={navigation} currentUser={currentUser} />
              )}
            </View>
          )}
        </BottomSheetModal>
      </BottomSheetModalProvider>
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
