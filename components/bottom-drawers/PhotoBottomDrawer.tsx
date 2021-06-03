import React from 'react';
import { StyleSheet, View as ViewRN } from 'react-native';
import { Entypo, FontAwesome5, Octicons, Ionicons } from '@expo/vector-icons';

import DrawerOption from './DrawerOption';

import Colors from '../../constants/Colors';

import { IPost } from '../../types';
import { IUser } from '../../redux/user/user.types';

interface PhotoBottomDrawerProps {
  photo: IPost;
  isMyPhoto: boolean;
}

const PhotoBottomDrawer: React.FC<PhotoBottomDrawerProps> = ({ photo, isMyPhoto }) => {
  const handleDeletePhoto = () => {};

  return (
    <ViewRN style={styles.container}>
      {!isMyPhoto ? null : (
        <DrawerOption
          icon={<Ionicons name='trash' size={24} color='white' />}
          text='Delete photo'
          onPressDrawerOption={handleDeletePhoto}
          iconCircle
        />
      )}
      <DrawerOption
        icon={<Entypo name='download' size={20} color='white' />}
        text='Save to phone'
        onPressDrawerOption={() => {}}
        iconCircle
      />
      <DrawerOption
        icon={<FontAwesome5 name='share' size={20} color='white' />}
        text='Share external'
        iconCircle
      />
      <DrawerOption
        icon={<FontAwesome5 name='facebook-messenger' size={20} color='white' />}
        text='Send in Messenger'
        iconCircle
      />
      <DrawerOption
        icon={<Octicons name='report' size={20} color='white' />}
        text='Find support or report photo'
        iconCircle
      />
    </ViewRN>
  );
};

export default PhotoBottomDrawer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.cardBackground,
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
