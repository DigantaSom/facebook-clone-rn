import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Text, View } from '../Themed';

import Colors from '../../constants/Colors';

import { PostSettingsType } from '../../types';

interface PostPrivacyItemProps {
  title: string;
  icon: React.ReactNode;
  postSettingsType: PostSettingsType;
}

const PostPrivacyItem: React.FC<PostPrivacyItemProps> = ({ title, icon }) => {
  return (
    // TODO: after onPress, navigate to different screens using 'postSettingsType' prop.
    <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={() => {}}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <AntDesign name='caretdown' size={11} color={Colors.dark.tabIconDefault} />
    </TouchableOpacity>
  );
};

export default PostPrivacyItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.dark.tabIconDefault,
    borderRadius: 5,
  },
  iconContainer: {},
  title: {
    paddingHorizontal: 5,
    fontSize: 11,
  },
});
