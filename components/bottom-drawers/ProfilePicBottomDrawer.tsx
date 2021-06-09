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
import { MenuStackParamList, IPost } from '../../types';

import DrawerOption from './DrawerOption';
import Colors from '../../constants/Colors';

import { IUser } from '../../redux/user/user.types';

type ProfilePicBottomDrawer = {
  navigation: StackNavigationProp<MenuStackParamList, 'Profile'>;
  currentUser: IUser;
  profilePic?: IPost;
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
      navigation.navigate('Upload', { currentUser, postType: 'Profile Pic' });
    }
  };

  const onViewProfilePictureHandler = () => {
    if (profilePic) {
      handleCloseModal();
      navigation.navigate('Photo', { postId: profilePic.postId });
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
        iconCircle
      />
      <DrawerOption
        icon={<Ionicons name='md-videocam' size={20} color='white' />}
        text='Take new profile video'
        iconCircle
      />
      <DrawerOption
        icon={<Ionicons name='md-logo-youtube' size={20} color='white' />}
        text='Select profile video'
        iconCircle
      />
      <DrawerOption
        icon={<Fontisto name='photograph' size={20} color='white' />}
        text='Select profile picture'
        onPressDrawerOption={onSelectProfilePictureHandler}
        iconCircle
      />
      <DrawerOption
        icon={<FontAwesome name='user' size={20} color='white' />}
        text='View profile picture'
        onPressDrawerOption={onViewProfilePictureHandler}
        iconCircle
      />
      <DrawerOption
        icon={<Entypo name='shield' size={20} color='white' />}
        text='Turn on profile picture guard'
        iconCircle
      />
      <DrawerOption
        icon={<FontAwesome name='paint-brush' size={20} color='white' />}
        text='Add design'
        iconCircle
      />
      <DrawerOption
        icon={<Ionicons name='happy' size={20} color='white' />}
        text='Make avatar profile picture'
        iconCircle
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
