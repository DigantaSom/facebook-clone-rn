import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

const VideosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>VideosScreen</Text>
    </View>
  );
};

export default VideosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
