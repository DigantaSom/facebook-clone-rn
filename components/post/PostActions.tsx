import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View as ViewRN } from 'react-native';

import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from '../Themed';
import Colors from '../../constants/Colors';

type LikeTextStyleType = {
  color?: string;
  fontWeight?: 'bold';
};

const PostActions: React.FC<{}> = ({}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePost = () => {
    setIsLiked(prevState => !prevState);
  };
  let likeTextStyle: LikeTextStyleType = {
    color: 'white',
  };
  if (isLiked) {
    likeTextStyle = {
      color: Colors.facebookPrimary,
      fontWeight: 'bold',
    };
  }

  return (
    <ViewRN style={styles.postActions}>
      {/* Like post */}
      <TouchableOpacity
        style={styles.actionItem}
        activeOpacity={0.4}
        onPress={handleLikePost}>
        <AntDesign
          name={isLiked ? 'like1' : 'like2'}
          size={20}
          color={isLiked ? Colors.facebookPrimary : 'white'}
          style={styles.actionIcon}
        />
        <Text style={[styles.actionText, likeTextStyle]}>Like</Text>
      </TouchableOpacity>

      {/* Comment on post */}
      <TouchableOpacity style={styles.actionItem} activeOpacity={0.4} onPress={() => {}}>
        <FontAwesome5 name='comment' size={20} color='white' style={styles.actionIcon} />
        <Text style={styles.actionText}>Comment</Text>
      </TouchableOpacity>

      {/* Share post */}
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
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.grayButton,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayButton,
    paddingVertical: 5,
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
    fontSize: 12,
  },
});
