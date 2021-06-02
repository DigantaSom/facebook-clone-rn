import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../Themed';

import Colors from '../../constants/Colors';

import { HeaderActionType } from '../../types';

interface HeaderSaveButtonProps {
  actionType: HeaderActionType;
  disabled?: boolean;
  onPressAction: () => void;
}

const HeaderSaveButton: React.FC<HeaderSaveButtonProps> = ({
  actionType,
  disabled,
  onPressAction,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabledButton : styles.workingButton]}
      activeOpacity={disabled ? 1 : 0.7}
      onPress={disabled ? () => {} : onPressAction}>
      <Text>{actionType.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

export default HeaderSaveButton;

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
  },
  workingButton: {
    backgroundColor: Colors.facebookPrimary,
  },
  disabledButton: {
    backgroundColor: Colors.grayButton,
    color: Colors.grayText,
  },
});
