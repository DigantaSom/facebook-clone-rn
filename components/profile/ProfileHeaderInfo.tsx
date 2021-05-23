import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';

import { Text, View } from '../Themed';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

import { IUser } from '../../redux/user/user.types';

type ProfileHeaderInfoProps = {
  userDisplayName: string;
  isMyProfile: boolean;
};

const ProfileHeaderInfo: React.FC<ProfileHeaderInfoProps> = ({
  userDisplayName,
  isMyProfile,
}) => {
  return (
    <View style={styles.headerBottom}>
      <Text style={styles.displayName}>{userDisplayName}</Text>
      <Text style={styles.bio}>Here's an amazing bio! Noice toit smort.</Text>
      {!isMyProfile ? null : (
        <View style={styles.headerOptions}>
          <TouchableOpacity style={styles.addStoryButton} activeOpacity={0.8}>
            <Entypo name='circle-with-plus' size={20} color='white' />
            <Text style={styles.addStoryText}>Add to Story</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileSettings_button}>
            <Feather name='more-horizontal' size={20} color='white' />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileHeaderInfo;

const styles = StyleSheet.create({
  headerBottom: {
    alignItems: 'center',
    // backgroundColor: Colors.dark.cardBackground,
  },
  displayName: {
    fontSize: 26,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  bio: {
    color: '#bbb',
    textAlign: 'center',
  },
  headerOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    // backgroundColor: Colors.dark.cardBackground,
  },
  addStoryButton: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.facebookPrimary,
    color: 'white',
    paddingVertical: 6,
    borderRadius: Layout.default_borderRadius,
  },
  addStoryText: {
    fontSize: 14,
    paddingLeft: 8,
  },
  profileSettings_button: {
    backgroundColor: Colors.grayButton,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: 8,
  },
});
