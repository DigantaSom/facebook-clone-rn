import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';

import Colors from '../../constants/Colors';
import { MenuNavProps } from '../../types';

import ProfileHeader from '../../components/profile-screen-components/ProfileHeader';
import ProfileHeaderInfo from '../../components/profile-screen-components/ProfileHeaderInfo';
import ProfileAbout from '../../components/profile-screen-components/ProfileAbout';
import ProfileFriends from '../../components/profile-screen-components/ProfileFriends';
import ProfileCreatePost from '../../components/profile-screen-components/ProfileCreatePost';
import Divider from '../../components/UI/Divider';

const ProfileScreen = ({ navigation }: MenuNavProps<'Profile'>) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileScreen_top}>
        <ProfileHeader />
        <ProfileHeaderInfo />
        <Divider />

        <ProfileAbout />
        <Divider />

        <ProfileFriends />
        <Divider />

        <ProfileCreatePost navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
    // backgroundColor: Colors.dark.cardBackground,
  },
  profileScreen_top: {},
});
