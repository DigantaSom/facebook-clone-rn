import React from 'react';
import { StyleSheet, View as ViewRN } from 'react-native';
import { Entypo, FontAwesome5, Octicons } from '@expo/vector-icons';

import DrawerOption from './DrawerOption';
import Colors from '../../constants/Colors';

const PhotoBottomDrawer = () => {
  return (
    <ViewRN style={styles.container}>
      <DrawerOption
        icon={<Entypo name='download' size={20} color='white' />}
        text='Save to phone'
        onPressDrawerOption={() => {}}
      />
      <DrawerOption
        icon={<FontAwesome5 name='share' size={20} color='white' />}
        text='Share external'
      />
      <DrawerOption
        icon={<FontAwesome5 name='facebook-messenger' size={20} color='white' />}
        text='Send in Messenger'
      />
      <DrawerOption
        icon={<Octicons name='report' size={20} color='white' />}
        text='Find support or report photo'
      />
    </ViewRN>
  );
};

export default PhotoBottomDrawer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.cardBackground,
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
