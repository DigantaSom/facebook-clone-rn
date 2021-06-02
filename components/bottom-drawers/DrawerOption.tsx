import React from 'react';
import { StyleSheet, View as ViewRN } from 'react-native';
import { TouchableOpacity } from '@gorhom/bottom-sheet';

import { Text } from '../Themed';
import Colors from '../../constants/Colors';

type DrawerOptionProps = {
  icon: React.ReactNode;
  text: string;
  onPressDrawerOption?: () => void;
  iconCircle?: boolean;
};

const DrawerOption: React.FC<DrawerOptionProps> = ({
  icon,
  text,
  onPressDrawerOption,
  iconCircle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.drawerOption,
        iconCircle
          ? null
          : { borderTopWidth: 1, borderTopColor: Colors.dark.dividerColor },
      ]}
      activeOpacity={0.5}
      onPress={onPressDrawerOption}>
      <ViewRN
        style={[
          styles.iconContainer,
          iconCircle ? { backgroundColor: '#454545' } : null,
        ]}>
        {icon}
      </ViewRN>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default DrawerOption;

const styles = StyleSheet.create({
  drawerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  iconContainer: {
    // backgroundColor: '#454545',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  text: {
    paddingLeft: 20,
    textTransform: 'capitalize',
  },
});
