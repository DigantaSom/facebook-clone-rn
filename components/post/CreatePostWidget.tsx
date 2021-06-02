import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { TopTabParamList } from '../../types';

import { Text, View } from '../Themed';
import DPcontainer from '../UI/DPcontainer';

import Colors from '../../constants/Colors';

interface CreatePostWidgetProps {
  navigation: StackNavigationProp<TopTabParamList, 'Home'>;
}

const CreatePostWidget: React.FC<CreatePostWidgetProps> = ({ navigation }) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return !currentUser ? null : (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dp}
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate('Profile', { userId: currentUser.id as string })
        }>
        <DPcontainer imageUri={currentUser?.profilePic} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.inputContainer}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CreatePost')}>
        <Text style={styles.inputText}>Write something here...</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.uploadPhotoContainer}
        activeOpacity={0.6}
        onPress={() => {}}>
        <MaterialIcons name='photo-library' size={24} color={Colors.grayText} />
        <Text style={styles.uploadPhotoText}>Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostWidget;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },
  dp: {
    flex: 1 / 4,
  },
  inputContainer: {
    flex: 1,
    height: 55,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 30,
    padding: 10,
  },
  inputText: {},
  input: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 30,
    padding: 10,
  },
  uploadPhotoContainer: {
    flex: 1 / 4,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: -5,
    // borderWidth: 1,
    // borderColor: 'white',
  },
  uploadPhotoText: {
    color: Colors.grayText,
    paddingTop: 3,
  },
});
