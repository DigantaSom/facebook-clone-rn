import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../Themed';

import Colors from '../../constants/Colors';

const Divider = () => {
  return <View style={styles.divider} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.dark.dividerColor,
    marginVertical: 15,
  },
});
