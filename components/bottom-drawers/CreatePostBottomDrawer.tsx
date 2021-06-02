import React, { useEffect } from 'react';
import { Platform, StyleSheet, View as ViewRN } from 'react-native';
import {
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import DrawerOption from './DrawerOption';

import Colors from '../../constants/Colors';

interface CreatePostBottomDrawerProps {
  handlePostPhoto: (pickedImage: string) => void;
}

const CreatePostBottomDrawer: React.FC<CreatePostBottomDrawerProps> = ({
  handlePostPhoto,
}) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      handlePostPhoto(result.uri);
    }
  };

  return (
    <ViewRN style={styles.container}>
      <DrawerOption
        icon={<Fontisto name='photograph' size={20} color='lime' style={styles.icon} />}
        text='Photo'
        onPressDrawerOption={pickImage}
      />
      <DrawerOption
        icon={<AntDesign name='tago' size={20} color='blue' />}
        text='Tag People'
      />
      <DrawerOption
        icon={<Fontisto name='smiley' size={20} color='yellow' />}
        text='Feeling/Activity'
      />
      <DrawerOption
        icon={<MaterialIcons name='place' size={20} color='#dc143c' />}
        text='Check in'
      />
      <DrawerOption
        icon={<MaterialIcons name='live-tv' size={20} color='red' />}
        text='Live video'
      />
      <DrawerOption
        icon={
          <MaterialCommunityIcons
            name='sort-alphabetical-variant'
            size={20}
            color='#35d8bd'
          />
        }
        text='Background color'
      />
      <DrawerOption
        icon={<FontAwesome5 name='camera' size={20} color='#0000FF' />}
        text='Camera'
      />
      <DrawerOption
        icon={<MaterialIcons name='gif' size={20} color='#35d88c' />}
        text='GIF'
      />
      <DrawerOption
        icon={
          <MaterialCommunityIcons name='comment-question' size={20} color='#dd2b49' />
        }
        text='Ask for recommendations'
      />
      <DrawerOption
        icon={<FontAwesome5 name='hand-holding-usd' size={20} color='#07bd68' />}
        text='Sell something'
      />
      <DrawerOption
        icon={<MaterialCommunityIcons name='comment-question' size={20} color='red' />}
        text='Host a Q&A'
      />
    </ViewRN>
  );
};

export default CreatePostBottomDrawer;

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
