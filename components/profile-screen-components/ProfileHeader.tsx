import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import { View } from '../Themed';

import Layout from '../../constants/Layout';
import { RootState } from '../../redux/store';

type ProfileHeaderProps = {
  handleShowPicOptions: () => void;
  handleIsProfilePicPressed: () => void;
  handleIsCoverPicPressed: () => void;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  handleShowPicOptions,
  handleIsProfilePicPressed,
  handleIsCoverPicPressed,
}) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const onProfilePicPress = () => {
    handleShowPicOptions();
    handleIsProfilePicPressed();
  };

  const onCoverPicPress = () => {
    handleShowPicOptions();
    handleIsCoverPicPressed();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.picsContainer}
        activeOpacity={0.4}
        onPress={onCoverPicPress}>
        <Image
          source={require('../../assets/images/cover-pic-placeholder.jpg')}
          style={styles.coverPic}
        />
        <TouchableOpacity
          style={styles.profilePicContainer}
          activeOpacity={0.4}
          onPress={onProfilePicPress}>
          {currentUser && currentUser.profilePic ? (
            <Image
              source={{ uri: currentUser.profilePic.imageUri }}
              style={styles.profilePic}
            />
          ) : (
            <Image
              source={require('../../assets/images/no-dp.jpg')}
              style={styles.profilePic}
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    marginBottom: Layout.window.width / 4,
    flex: 1,
    // backgroundColor: Colors.dark.cardBackground,
  },
  picsContainer: {
    backgroundColor: '#bbb',
    height: 200,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    // overflow: 'hidden',
    position: 'relative',
  },
  coverPic: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  profilePicContainer: {
    width: Layout.window.width / 2,
    height: Layout.window.width / 2,
    // backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 10,
    top: 200 - Layout.window.width / 4,
    left: (Layout.window.width - 20) / 2,
    transform: [
      {
        translateX: -Layout.window.width / 4,
      },
    ],
  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: Layout.window.width / 4,
    borderWidth: 2,
    borderColor: 'white',
  },
});
