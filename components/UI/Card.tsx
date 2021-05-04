import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../Themed';

import Colors from '../../constants/Colors';

const Card: React.FC<{}> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.cardBackground,
  },
});
