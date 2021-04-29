import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

const MoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MoreScreen</Text>
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
