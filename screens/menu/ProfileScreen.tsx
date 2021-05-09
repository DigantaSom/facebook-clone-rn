import React, { useRef, useMemo, useCallback, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { View } from '../../components/Themed';

import { MenuNavProps } from '../../types';
import { RootState } from '../../redux/store';
import posts from '../../utils/dummy-posts';

import ProfileHeader from '../../components/profile-screen-components/ProfileHeader';
import ProfileHeaderInfo from '../../components/profile-screen-components/ProfileHeaderInfo';
import ProfileAbout from '../../components/profile-screen-components/ProfileAbout';
import ProfileFriends from '../../components/profile-screen-components/ProfileFriends';
import ProfileCreatePost from '../../components/profile-screen-components/ProfileCreatePost';

import Divider from '../../components/UI/Divider';
import Spinner from '../../components/UI/Spinner';
import PostItem from '../../components/post/PostItem';
import ProfilePicBottomDrawer from '../../components/bottom-drawers/ProfilePicBottomDrawer';
import CoverPicBottomDrawer from '../../components/bottom-drawers/CoverPicBottomDrawer';

type ProfileScreenProps = MenuNavProps<'Profile'>;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { currentUser, loading, uploading } = useSelector(
    (state: RootState) => state.user,
  );
  const [isProfilePicPressed, setIsProfilePicPressed] = useState(false);

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

  if (loading || uploading) {
    return <Spinner />;
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
            />

            <ProfileHeaderInfo currentUser={currentUser} />
            <Divider />

            <ProfileAbout />
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
          <View style={styles.bottomSheet}>
            {isProfilePicPressed ? (
              <ProfilePicBottomDrawer navigation={navigation} currentUser={currentUser} />
            ) : (
              <CoverPicBottomDrawer />
            )}
          </View>
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
    // backgroundColor: Colors.dark.cardBackground,
  },
  profileScreen_top: {},
  bottomSheet: {
    // alignItems: 'center',
    // flex: 1,
  },
});
