import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Platform,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { RootNavProps } from '../../types';

import { View, Text } from '../../components/Themed';
import Spinner from '../../components/UI/Spinner';

import { updateProfilePic } from '../../redux/user/user.actions';
import { RootState } from '../../redux/store';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

type UploadProfilePicScreenProps = RootNavProps<'UploadProfilePic'>;

const UploadProfilePicScreen: React.FC<UploadProfilePicScreenProps> = ({
  navigation,
  route,
}) => {
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');

  const currentUser = route.params.currentUser;

  const dispatch = useDispatch();
  const { uploading, error } = useSelector((state: RootState) => state.user);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Upload a Profile Picture',
      headerTitleStyle: {
        fontSize: 15,
        marginLeft: -15,
      },
      headerRight: () =>
        !image ? null : (
          <TouchableOpacity
            style={styles.headerRightContainer}
            activeOpacity={0.8}
            onPress={() => {
              dispatch(updateProfilePic(currentUser, image, caption));
              if (!uploading && !error) {
                navigation.navigate('Profile');
              }
            }}>
            <Text ellipsizeMode='clip'>Save</Text>
          </TouchableOpacity>
        ),
    });
  }, [image, caption, uploading, error]);

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

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (uploading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Button title='Pick an image from camera roll' onPress={pickImage} />
      ) : (
        <View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          <TextInput
            value={caption}
            onChangeText={text => setCaption(text)}
            placeholder='Set a caption (optional)'
            placeholderTextColor='#c5c5c5'
            style={styles.input}
          />
        </View>
      )}
    </View>
  );
};

export default UploadProfilePicScreen;

const styles = StyleSheet.create({
  headerRightContainer: {
    marginRight: 10,
    backgroundColor: Colors.grayButton,
    padding: 10,
    borderRadius: 5,
  },
  container: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imageContainer: {
    width: Layout.window.width - 20,
    height: Layout.window.width - 20,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  input: {
    padding: 5,
    fontSize: 16,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
});
