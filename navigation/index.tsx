import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ColorSchemeName } from 'react-native';

import { AuthStackParamList, FacebookStackParamList, RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from '../redux/user/user.actions';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import SearchScreen from '../screens/SearchScreen';
// import NotFoundScreen from '../screens/NotFoundScreen';

import TopTabNavigator from './TopTabNavigator';
import { RootState } from '../redux/store';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  // console.log('currentUser:', currentUser);

  useEffect(() => {
    dispatch(checkUserSession());
  }, [checkUserSession]);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {currentUser ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();
const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Root' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Root' component={FacebookNavigator} />
      {/* <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      /> */}
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

const AuthStack = createStackNavigator<AuthStackParamList>();
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name='Login' component={LoginScreen} />
    <AuthStack.Screen name='Register' component={RegisterScreen} />
  </AuthStack.Navigator>
);
