import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../Themed';
import Colors from '../../constants/Colors';

interface DividerProps {
  marginVerticalValue?: number;
}

const Divider: React.FC<DividerProps> = ({ marginVerticalValue }) => {
  return (
    <View
      style={[
        styles.divider,
        { marginVertical: marginVerticalValue ? marginVerticalValue : 15 },
      ]}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.dark.dividerColor,
  },
});
