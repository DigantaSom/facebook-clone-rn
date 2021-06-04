import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../Themed';

type PostItemProps = {
  post: {
    id: number;
    postTitle: string;
  };
};

const PostItem: React.FC<PostItemProps> = ({ post: { postTitle } }) => {
  return (
    <View>
      <Text>{postTitle}</Text>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({});
