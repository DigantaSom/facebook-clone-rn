import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import { Text, View } from '../Themed';

import DayJS from 'dayjs';
import firebase from '../../firebase/firebase.utils';

import { StackNavigationProp } from '@react-navigation/stack';
import { MenuStackParamList } from '../../types';
import { ProfileAboutType } from '../../redux/profile/profile.types';
import { IUser } from '../../redux/user/user.types';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

interface ProfileAboutProps {
  profileAbout: ProfileAboutType;
  joined: firebase.firestore.FieldValue;
  navigation?: StackNavigationProp<MenuStackParamList, 'Profile'>;
  currentUser?: IUser;
  isMyProfile?: boolean;
}

const ProfileAbout: React.FC<ProfileAboutProps> = ({
  profileAbout,
  joined,
  navigation,
  currentUser,
  isMyProfile,
}) => {
  return (
    <View>
      {profileAbout.location?.livesIn ? (
        <View style={styles.aboutLine}>
          <Ionicons name='md-home-sharp' size={22} color={Colors.dark.tabIconDefault} />
          <Text style={styles.aboutText}>
            Lives in <Text style={styles.boldText}>{profileAbout.location.livesIn}</Text>
          </Text>
        </View>
      ) : null}
      {profileAbout.location?.from ? (
        <View style={styles.aboutLine}>
          <MaterialIcons name='place' size={22} color={Colors.dark.tabIconDefault} />
          <Text style={styles.aboutText}>
            From <Text style={styles.boldText}>{profileAbout.location.from}</Text>
          </Text>
        </View>
      ) : null}
      {profileAbout.relationshipStatus ? (
        <View style={styles.aboutLine}>
          <AntDesign name='heart' size={22} color={Colors.dark.tabIconDefault} />
          <Text style={styles.aboutText}>{profileAbout.relationshipStatus}</Text>
        </View>
      ) : null}
      <View style={styles.aboutLine}>
        <Feather name='clock' size={24} color={Colors.dark.tabIconDefault} />
        {/* <Text style={styles.aboutText}>Joined August 2013</Text> */}
        <Text style={styles.aboutText}>
          Joined {DayJS(profileAbout.birthday).format('MMM YYYY')}
        </Text>
      </View>
      <TouchableOpacity style={styles.aboutLine} activeOpacity={0.6}>
        <Feather name='more-horizontal' size={24} color={Colors.dark.tabIconDefault} />
        <Text style={styles.aboutText}>See Your About Info</Text>
      </TouchableOpacity>

      {isMyProfile && navigation && currentUser ? (
        <TouchableOpacity
          style={styles.editPublicDetails_button}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('AddOrEditProfileAbout', {
              isEdit: true,
              currentUser,
              profileAbout,
            })
          }>
          <Text style={styles.editPublicDetails_text}>Edit Public Details</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ProfileAbout;

const styles = StyleSheet.create({
  aboutLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    // backgroundColor: Colors.dark.cardBackground,
  },
  aboutText: {
    paddingLeft: 12,
    fontSize: 15,
  },
  boldText: {
    fontWeight: 'bold',
  },
  editPublicDetails_button: {
    marginVertical: 10,
    paddingVertical: 7,
    backgroundColor: '#063a7e',
    alignItems: 'center',
    borderRadius: Layout.default_borderRadius,
  },
  editPublicDetails_text: {
    color: Colors.facebookSecondary,
  },
});
