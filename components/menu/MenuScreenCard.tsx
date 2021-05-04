import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { View, Text } from '../Themed';
import {
  MaterialIcons,
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
  Fontisto,
  AntDesign,
  FontAwesome,
} from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { IconNameType } from '../../utils/menu-screen.data';

interface MenuScreenCardProps {
  title: string;
  iconName: IconNameType;
}

const MenuScreenCard: React.FC<MenuScreenCardProps> = ({ title, iconName }) => {
  return (
    <TouchableOpacity activeOpacity={0.4}>
      <View style={styles.card}>
        {iconName === 'local-hospital' && (
          <MaterialIcons name={iconName} size={24} color='white' />
        )}
        {iconName === 'user-friends' && (
          <FontAwesome5 name={iconName} size={22} color='white' />
        )}
        {iconName === 'shop' && <Entypo name={iconName} size={24} color='white' />}
        {iconName === 'account-group' && (
          <MaterialCommunityIcons name={iconName} size={24} color='white' />
        )}
        {iconName === 'ondemand-video' && (
          <MaterialIcons name={iconName} size={24} color='white' />
        )}
        {iconName === 'clock-outline' && (
          <MaterialCommunityIcons name={iconName} size={24} color='white' />
        )}
        {iconName === 'save' && <Fontisto name={iconName} size={24} color='white' />}
        {iconName === 'flag-outline' && (
          <MaterialIcons name='outlined-flag' size={28} color='white' />
        )}
        {iconName === 'calendar' && <AntDesign name={iconName} size={24} color='white' />}
        {iconName === 'gamepad' && (
          <FontAwesome name={iconName} size={24} color='white' />
        )}
        {iconName === 'facebook' && (
          <FontAwesome5 name={iconName} size={24} color='white' />
        )}
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuScreenCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.cardBackground,
    padding: 10,
    marginTop: 10,
    borderRadius: 7,
    width: Layout.window.width * 0.45,
    minHeight: 80,
    marginHorizontal: 5,
  },
  title: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
});
