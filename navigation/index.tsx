import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ColorSchemeName } from 'react-native';

import { FacebookStackParamList, RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import TopTabNavigator from './TopTabNavigator';
import SearchScreen from '../screens/SearchScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Root' component={FacebookNavigator} />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
};

const FacebookStack = createStackNavigator<FacebookStackParamList>();

const FacebookNavigator = () => (
  <FacebookStack.Navigator initialRouteName='Facebook'>
    <FacebookStack.Screen
      name='Facebook'
      component={TopTabNavigator}
      options={{
        headerTitle: 'facebook',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 30
        }
      }}
    />
    <FacebookStack.Screen
      name='Search'
      component={SearchScreen} // TODO: later, SearchStack
    />
  </FacebookStack.Navigator>
);
