import React from 'react';
import { StyleSheet, View as ViewRN } from 'react-native';
import {
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
  FontAwesome,
  Entypo,
} from '@expo/vector-icons';

import { StackNavigationProp } from '@react-navigation/stack';
import { MenuStackParamList, ProfileAndCoverPicType } from '../../types';

import DrawerOption from './DrawerOption';
import Colors from '../../constants/Colors';

import { IUser } from '../../redux/user/user.types';

type ProfilePicBottomDrawer = {
  navigation: StackNavigationProp<MenuStackParamList, 'Profile'>;
  currentUser: IUser;
  profilePic?: ProfileAndCoverPicType;
  handleCloseModal: () => void;
};

const ProfilePicBottomDrawer: React.FC<ProfilePicBottomDrawer> = ({
  navigation,
  currentUser,
  profilePic,
  handleCloseModal,
}) => {
  const onSelectProfilePictureHandler = () => {
    if (currentUser) {
      handleCloseModal();
      navigation.navigate('UploadProfileOrCoverPic', { currentUser, isCoverPic: false });
    }
  };

  const onViewProfilePictureHandler = () => {
    if (profilePic) {
      handleCloseModal();
      navigation.navigate('Photo', { photo: profilePic });
    }
  };

  return (
    <ViewRN style={styles.container}>
      <DrawerOption
        icon={
          <MaterialCommunityIcons
            name='image-filter-frames'
            size={20}
            color='white'
            style={styles.icon}
          />
        }
        text='Add Frame'
      />
      <DrawerOption
        icon={<Ionicons name='md-videocam' size={20} color='white' />}
        text='Take new profile video'
      />
      <DrawerOption
        icon={<Ionicons name='md-logo-youtube' size={20} color='white' />}
        text='Select profile video'
      />
      <DrawerOption
        icon={<Fontisto name='photograph' size={20} color='white' />}
        text='Select profile picture'
        onPressDrawerOption={onSelectProfilePictureHandler}
      />
      <DrawerOption
        icon={<FontAwesome name='user' size={20} color='white' />}
        text='View profile picture'
        onPressDrawerOption={onViewProfilePictureHandler}
      />
      <DrawerOption
        icon={<Entypo name='shield' size={20} color='white' />}
        text='Turn on profile picture guard'
      />
      <DrawerOption
        icon={<FontAwesome name='paint-brush' size={20} color='white' />}
        text='Add design'
      />
      <DrawerOption
        icon={<Ionicons name='happy' size={20} color='white' />}
        text='Make avatar profile picture'
      />
    </ViewRN>
  );
};

export default ProfilePicBottomDrawer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.cardBackground,
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  icon: {
    padding: 5,
  },
});
