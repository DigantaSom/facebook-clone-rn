/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import React from 'react';

import { Ionicons, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import {
  TopTabParamList,
  HomeStackParamList,
  NotificationsStackParamList,
  GroupsStackParamList,
  MenuStackParamList,
} from '../types';

import HomeScreen from '../screens/HomeScreen';
import VideosScreen from '../screens/VideosScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import GroupsScreen from '../screens/GroupsScreen';
import MenuScreen from '../screens/menu/MenuScreen';

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

export default function TopTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <TopTab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        showIcon: true,
        showLabel: false,
        indicatorStyle: {
          backgroundColor: Colors.facebookPrimary,
          height: 3.5,
          elevation: 3.5,
        },
        tabStyle: {
          borderBottomWidth: 1,
          borderBottomColor: Colors.dark.tabIconDefault,
        },
      }}>
      <TopTab.Screen
        name='Home'
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <TabBarIcon name='md-home' color={Colors.facebookPrimary} />
            ) : (
              <TabBarIcon name='md-home-outline' color={color} />
            ),
        }}
      />
      <TopTab.Screen
        name='Videos'
        component={VideosScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <TabBarIcon name='ios-videocam' size={26} color={Colors.facebookPrimary} />
            ) : (
              <TabBarIcon name='ios-videocam-outline' size={26} color={color} />
            ),
        }}
      />
      <TopTab.Screen
        name='Groups'
        component={GroupsStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name='account-group'
                size={24}
                color={Colors.facebookPrimary}
              />
            ) : (
              <MaterialCommunityIcons
                name='account-group-outline'
                size={24}
                color={color}
              />
            ),
        }}
      />
      <TopTab.Screen
        name='Notifications'
        component={NotificationsStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Fontisto
                name='bell-alt'
                size={24}
                color={Colors.facebookPrimary}
                style={{ marginBottom: -3 }}
              />
            ) : (
              <Fontisto
                name='bell'
                size={24}
                color={color}
                style={{ marginBottom: -3 }}
              />
            ),
        }}
      />
      <TopTab.Screen
        name='Menu'
        component={MenuStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <TabBarIcon name='menu' size={28} color={Colors.facebookPrimary} />
            ) : (
              <TabBarIcon name='md-menu-outline' size={28} color={color} />
            ),
        }}
      />
    </TopTab.Navigator>
  );
}

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  size?: number;
}) => <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;

const HomeStack = createStackNavigator<HomeStackParamList>();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name='Home' component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const NotificationsStack = createStackNavigator<NotificationsStackParamList>();
const NotificationsStackNavigator = () => {
  return (
    <NotificationsStack.Navigator screenOptions={{ headerShown: false }}>
      <NotificationsStack.Screen name='Notifications' component={NotificationsScreen} />
    </NotificationsStack.Navigator>
  );
};

const MenuStack = createStackNavigator<MenuStackParamList>();
const MenuStackNavigator = () => {
  return (
    <MenuStack.Navigator screenOptions={{ headerShown: false }}>
      <MenuStack.Screen name='Menu' component={MenuScreen} />
    </MenuStack.Navigator>
  );
};

const GroupsStack = createStackNavigator<GroupsStackParamList>();
const GroupsStackNavigator = () => {
  return (
    <GroupsStack.Navigator screenOptions={{ headerShown: false }}>
      <GroupsStack.Screen name='Groups' component={GroupsScreen} />
    </GroupsStack.Navigator>
  );
};
