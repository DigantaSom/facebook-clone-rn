import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../Themed';

import Colors from '../../constants/Colors';

interface HeaderSaveButtonProps {
  onSavePress: () => void;
}

const HeaderSaveButton: React.FC<HeaderSaveButtonProps> = ({ onSavePress }) => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onSavePress}>
      <Text>Save</Text>
    </TouchableOpacity>
  );
};

export default HeaderSaveButton;

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    backgroundColor: Colors.facebookPrimary,
    padding: 10,
    borderRadius: 5,
  },
});
