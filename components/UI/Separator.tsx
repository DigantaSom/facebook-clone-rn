import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../Themed';

const Separator = () => (
  <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
);

export default Separator;

const styles = StyleSheet.create({
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%'
  }
});
