import React from 'react';
import { Alert, StyleSheet, View as ViewRN } from 'react-native';
import { Entypo, FontAwesome5, Octicons, Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { useDispatch } from 'react-redux';
import { deletePhoto } from '../../redux/post/post.actions';

import { IPost, RootStackParamList } from '../../types';
import { IUser } from '../../redux/user/user.types';

import DrawerOption from './DrawerOption';

import Colors from '../../constants/Colors';

interface PhotoBottomDrawerProps {
  photo: IPost;
  currentUser: IUser;
  isMyPhoto: boolean;
  navigation: StackNavigationProp<RootStackParamList, 'Photo'>;
}

const PhotoBottomDrawer: React.FC<PhotoBottomDrawerProps> = ({
  photo,
  currentUser,
  isMyPhoto,
  navigation,
}) => {
  const dispatch = useDispatch();

  const handleDeletePhoto = () => {
    if (!isMyPhoto) {
      return;
    }
    Alert.alert(
      'Delete Confirmation',
      'Are you sure that you want to delete this photo?',
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(deletePhoto(photo, currentUser, photo.postType));
            navigation.goBack();
          },
        },
        { text: 'No' },
      ],
    );
  };

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
