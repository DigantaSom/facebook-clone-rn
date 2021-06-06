import React from 'react';
import { StyleSheet, TouchableOpacity, View as ViewRN } from 'react-native';

import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from '../Themed';

const PostActions: React.FC<{}> = ({}) => {
  return (
    <ViewRN style={styles.postActions}>
      <TouchableOpacity style={styles.actionItem} activeOpacity={0.4} onPress={() => {}}>
        <AntDesign name='like2' size={20} color='white' style={styles.actionIcon} />
        <Text style={styles.actionText}>Like</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem} activeOpacity={0.4} onPress={() => {}}>
        <FontAwesome5 name='comment' size={20} color='white' style={styles.actionIcon} />
        <Text style={styles.actionText}>Comment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem} activeOpacity={0.4} onPress={() => {}}>
        <MaterialCommunityIcons name='share-outline' size={24} color='white' />
        <Text style={styles.actionText}>Share</Text>
      </TouchableOpacity>
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
