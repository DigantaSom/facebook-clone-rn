import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Platform, Button, Image, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { RootNavProps } from '../../types';

import { View } from '../../components/Themed';
import Spinner from '../../components/UI/Spinner';
import HeaderActionButton from '../../components/UI/HeaderActionButton';

import { RootState } from '../../redux/store';
import { updateProfilePic } from '../../redux/user/user.actions';
import { uploadCoverPic } from '../../redux/profile/profile.actions';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

type UploadScreenProps = RootNavProps<'Upload'>;

const UploadScreen: React.FC<UploadScreenProps> = ({ navigation, route }) => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');

  const { currentUser, uploadType } = route.params;

  const dispatch = useDispatch();
  const { uploading, error } = useSelector((state: RootState) => state.user);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Upload a ${uploadType === 'Cover Pic' ? 'Cover' : 'Profile'} Picture`,
      headerTitleStyle: {
        fontSize: 15,
        marginLeft: -15,
      },
      headerRight: () =>
        !image ? null : (
          <HeaderActionButton
            actionType='Post'
            onPressAction={() => {
              if (uploadType === 'Cover Pic') {
                dispatch(uploadCoverPic(currentUser, image, title));
              } else {
                dispatch(updateProfilePic(currentUser, image, title));
              }
              if (!uploading && !error) {
                navigation.navigate('Profile', { userId: currentUser.id as string });
              }
            }}
          />
        ),
    });
  }, [image, title, uploading, error]);

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

    // console.log(result);

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
            value={title}
            onChangeText={text => setTitle(text)}
            placeholder='Set a title (optional)'
            placeholderTextColor='#c5c5c5'
            style={styles.input}
          />
        </View>
      )}
    </View>
  );
};

export default UploadScreen;

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
