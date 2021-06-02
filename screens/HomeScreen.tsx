import React from 'react';
import { StyleSheet } from 'react-native';

import { TopTabNavProps } from '../types';

import { Text, View } from '../components/Themed';
import CreatePostWidget from '../components/post/CreatePostWidget';

type HomeScreenProps = TopTabNavProps<'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CreatePostWidget navigation={navigation} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
});
