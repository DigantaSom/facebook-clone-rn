import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Ionicons, Entypo, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '../Themed';

import { StackNavigationProp } from '@react-navigation/stack';
import { MenuStackParamList } from '../../types';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

type ProfileCreatePostProps = {
  navigation: StackNavigationProp<MenuStackParamList, 'Profile'>;
};

const ProfileCreatePost: React.FC<ProfileCreatePostProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Posts</Text>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.icon} activeOpacity={0.7}>
            <Ionicons name='filter' size={22} color='white' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} activeOpacity={0.7}>
            <Ionicons name='md-settings-sharp' size={22} color='white' />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.postFormContainer}
        activeOpacity={0.6}
        onPress={() => navigation.navigate('CreatePost')}>
        <View style={styles.dpContainer}>
          <Image style={styles.dp} source={require('../../assets/images/no-dp.jpg')} />
        </View>
        <View style={styles.form}>
          <Text style={styles.formText}>What's on your mind?</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionItem} activeOpacity={0.6}>
          <Entypo name='video-camera' size={20} color='red' />
          <Text style={styles.actionText}>Live</Text>
        </TouchableOpacity>
        <View style={styles.borderVertical}></View>
        <TouchableOpacity style={styles.actionItem} activeOpacity={0.6}>
          <Fontisto name='photograph' size={20} color='lime' />
          <Text style={styles.actionText}>Photo</Text>
        </TouchableOpacity>
        <View style={styles.borderVertical}></View>
        <TouchableOpacity style={styles.actionItem} activeOpacity={0.6}>
          <MaterialCommunityIcons name='flag' size={24} color='blue' />
          <Text style={styles.actionText}>Life Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileCreatePost;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  top: {
    marginBottom: 15,
    // backgroundColor: Colors.dark.cardBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 0.75,
    fontSize: 18,
    fontWeight: 'bold',
  },
  icons: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: Colors.dark.cardBackground,
  },
  icon: {
    backgroundColor: Colors.grayButton,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: Layout.default_borderRadius,
  },
  postFormContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.tabIconDefault,
    // backgroundColor: Colors.dark.cardBackground,
  },
  dpContainer: {
    width: 50,
    height: 50,
    // backgroundColor: Colors.dark.cardBackground,
  },
  dp: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  form: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
    // backgroundColor: Colors.dark.cardBackground,
  },
  formText: {
    color: Colors.grayText,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.tabIconDefault,
    height: 50,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1 / 3,
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 12,
    paddingLeft: 6,
  },
  borderVertical: {
    borderRightWidth: 1,
    borderRightColor: Colors.dark.tabIconDefault,
    height: 20,
  },
});
