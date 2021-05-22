import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View as ViewRN,
  Text as TextRN,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../types';
import { IProfile } from '../../redux/profile/profile.types';

import DPcontainer from '../UI/DPcontainer';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

type ProfileItemProps = {
  profile: IProfile;
  navigation: StackNavigationProp<RootStackParamList, 'Search'>;
};

const ProfileSearchItem: React.FC<ProfileItemProps> = ({ profile, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.4}
      onPress={() => {
        navigation.navigate('Profile', { userId: profile.userId });
      }}>
      <DPcontainer imageUri={profile.profilePic?.imageUri} />
      <ViewRN style={styles.info}>
        <TextRN style={styles.displayName}>{profile.displayName}</TextRN>
        {/* TODO: add more stuffs here */}
      </ViewRN>
    </TouchableOpacity>
  );
};

export default ProfileSearchItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.cardBackground,
    marginVertical: 5,
    padding: 10,
    borderRadius: Layout.default_borderRadius,
  },
  info: {
    marginLeft: 15,
  },
  displayName: {
    color: 'white',
    fontWeight: 'bold',
  },
});
