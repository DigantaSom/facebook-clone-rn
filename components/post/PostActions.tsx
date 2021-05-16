import React from 'react';
import { StyleSheet } from 'react-native';

import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '../Themed';

const PostActions = () => {
  return (
    <View style={styles.postActions}>
      <View style={styles.actionItem}>
        <AntDesign name='like2' size={20} color='white' style={styles.actionIcon} />
        <Text style={styles.actionText}>Like</Text>
      </View>
      <View style={styles.actionItem}>
        <FontAwesome5 name='comment' size={20} color='white' style={styles.actionIcon} />
        <Text style={styles.actionText}>Comment</Text>
      </View>
      <View style={styles.actionItem}>
        <MaterialCommunityIcons name='share-outline' size={24} color='white' />
        <Text style={styles.actionText}>Share</Text>
      </View>
    </View>
  );
};

export default PostActions;

const styles = StyleSheet.create({
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1 / 3,
    justifyContent: 'center',
    paddingVertical: 5,
  },
  actionIcon: {
    paddingRight: 5,
  },
  actionText: {
    fontSize: 13,
  },
});
