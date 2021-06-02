import React from 'react';
import { StyleSheet, View as ViewRN } from 'react-native';
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Entypo,
} from '@expo/vector-icons';

import { StackNavigationProp } from '@react-navigation/stack';

import { MenuStackParamList, IPost } from '../../types';
import { IUser } from '../../redux/user/user.types';

import DrawerOption from '../bottom-drawers/DrawerOption';

import Colors from '../../constants/Colors';

type CoverPicBottomDrawerProps = {
  navigation: StackNavigationProp<MenuStackParamList, 'Profile'>;
  currentUser: IUser;
  coverPic?: IPost;
  handleCloseModal: () => void;
};

const CoverPicBottomDrawer: React.FC<CoverPicBottomDrawerProps> = ({
  navigation,
  currentUser,
  coverPic,
  handleCloseModal,
}) => {
  const onViewCoverPhotoHandler = () => {
    if (coverPic) {
      handleCloseModal();
      navigation.navigate('Photo', { photo: coverPic });
    }
  };

  const onSelectCoverPhotoHandler = () => {
    handleCloseModal();
    navigation.navigate('Upload', { currentUser, postType: 'Cover Pic' });
  };

  return (
    <ViewRN style={styles.container}>
      <DrawerOption
        icon={<FontAwesome name='photo' size={20} color='white' style={styles.icon} />}
        text='View Profile Cover'
        onPressDrawerOption={onViewCoverPhotoHandler}
        iconCircle
      />
      <DrawerOption
        icon={<Entypo name='upload' size={20} color='white' />}
        text='Upload Photo'
        onPressDrawerOption={onSelectCoverPhotoHandler}
        iconCircle
      />
      <DrawerOption
        icon={<FontAwesome5 name='facebook' size={20} color='white' />}
        text='Select Photo on Facebook'
        iconCircle
      />
      <DrawerOption
        icon={<MaterialCommunityIcons name='collage' size={20} color='white' />}
        text='Create cover collage'
        iconCircle
      />
      <DrawerOption
        icon={<FontAwesome name='paint-brush' size={20} color='white' />}
        text='Select artwork'
        iconCircle
      />
    </ViewRN>
  );
};

export default CoverPicBottomDrawer;

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
