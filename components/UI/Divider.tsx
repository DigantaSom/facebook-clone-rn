import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../Themed';
import Colors from '../../constants/Colors';

interface DividerProps {
  marginVerticalValue?: number;
  color?: string;
}

const Divider: React.FC<DividerProps> = ({ marginVerticalValue, color }) => {
  return (
    <View
      style={[
        styles.divider,
        { marginVertical: marginVerticalValue ? marginVerticalValue : 15 },
        { backgroundColor: color ? color : Colors.dark.dividerColor },
      ]}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    height: 1,
  },
});
