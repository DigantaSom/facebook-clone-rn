import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../Themed';

type PostItemProps = {
  post: {
    id: number;
    caption: string;
  };
};

const PostItem: React.FC<PostItemProps> = ({ post: { caption } }) => {
  return (
    <View>
      <Text>{caption}</Text>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({});
