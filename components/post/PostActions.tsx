import React from 'react';
import { StyleSheet, View as ViewRN } from 'react-native';

import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '../Themed';

const PostActions = () => {
  return (
    <ViewRN style={styles.postActions}>
      <ViewRN style={styles.actionItem}>
        <AntDesign name='like2' size={20} color='white' style={styles.actionIcon} />
        <Text style={styles.actionText}>Like</Text>
      </ViewRN>
      <ViewRN style={styles.actionItem}>
        <FontAwesome5 name='comment' size={20} color='white' style={styles.actionIcon} />
        <Text style={styles.actionText}>Comment</Text>
      </ViewRN>
      <ViewRN style={styles.actionItem}>
        <MaterialCommunityIcons name='share-outline' size={24} color='white' />
        <Text style={styles.actionText}>Share</Text>
      </ViewRN>
    </ViewRN>
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
