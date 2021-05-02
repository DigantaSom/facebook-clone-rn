import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../Themed';

interface CenterProps {}

const Center: React.FC<CenterProps> = ({ children }) => {
  return <View style={styles.center}>{children}</View>;
};

export default Center;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});
