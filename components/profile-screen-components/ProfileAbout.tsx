import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import { Text, View } from '../Themed';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

const ProfileAbout = () => {
  return (
    <View>
      <View style={styles.aboutLine}>
        <Ionicons name='md-home-sharp' size={22} color={Colors.dark.tabIconDefault} />
        <Text style={styles.aboutText}>
          Lives in <Text style={styles.boldText}>Kolkata</Text>
        </Text>
      </View>
      <View style={styles.aboutLine}>
        <MaterialIcons name='place' size={22} color={Colors.dark.tabIconDefault} />
        <Text style={styles.aboutText}>
          From <Text style={styles.boldText}>Kolkata</Text>
        </Text>
      </View>
      <View style={styles.aboutLine}>
        <AntDesign name='heart' size={22} color={Colors.dark.tabIconDefault} />
        <Text style={styles.aboutText}>Single</Text>
      </View>
      <View style={styles.aboutLine}>
        <Feather name='clock' size={24} color={Colors.dark.tabIconDefault} />
        <Text style={styles.aboutText}>Joined August 2013</Text>
      </View>
      <TouchableOpacity style={styles.aboutLine} activeOpacity={0.6}>
        <Feather name='more-horizontal' size={24} color={Colors.dark.tabIconDefault} />
        <Text style={styles.aboutText}>See Your About Info</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.editPublicDetails_button} activeOpacity={0.8}>
        <Text style={styles.editPublicDetails_text}>Edit Public Details</Text>
      </TouchableOpacity>
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
