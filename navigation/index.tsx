import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ColorSchemeName,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import { RootStackParamList, AuthStackParamList, RootNavProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from '../redux/user/user.actions';
import { RootState } from '../redux/store';

import SearchBar from '../components/UI/SearchBar';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

import TopTabNavigator from './TopTabNavigator';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/menu/ProfileScreen';
import CreatePost from '../screens/CreatePost';
import PhotoScreen from '../screens/PhotoScreen';
import UploadProfileOrCoverPicScreen from '../screens/menu/UploadProfileOrCoverPicScreen';
import AddOrEditProfileAboutScreen from '../screens/menu/AddOrEditProfileAboutScreen';
// import NotFoundScreen from '../screens/NotFoundScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

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
    <Stack.Navigator initialRouteName='Root'>
      <Stack.Screen
        name='Root'
        component={TopTabNavigator}
        options={({ navigation }: RootNavProps<'Root'>) => ({
          headerTitle: 'facebook',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
          },
          headerRight: () => (
            <View style={styles.headerRightButtons}>
              <Ionicons
                name='md-search'
                size={24}
                color='black'
                style={styles.button}
                onPress={() => navigation.navigate('Search')}
              />
              <FontAwesome5
                name='facebook-messenger'
                size={24}
                color='black'
                style={styles.button}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name='Search'
        component={SearchScreen}
        options={{
          headerTitleContainerStyle: {
            left: 55,
          },
          headerTitle: () => <SearchBar />,
        }}
      />
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={({ navigation }: RootNavProps<'Profile'>) => ({
          headerTitleContainerStyle: {
            left: 55,
          },
          headerTitle: () => (
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => navigation.navigate('Search')}>
              <SearchBar searchBarDisabled />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name='CreatePost'
        component={CreatePost}
        options={{
          headerTitle: 'Create Post',
        }}
      />
      <Stack.Screen
        name='Photo'
        component={PhotoScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: () => null,
        }}
      />
      <Stack.Screen
        name='UploadProfileOrCoverPic'
        component={UploadProfileOrCoverPicScreen}
      />
      <Stack.Screen
        name='AddOrEditProfileAbout'
        component={AddOrEditProfileAboutScreen}
      />
      {/* <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      /> */}
    </Stack.Navigator>
  );
};

const AuthStack = createStackNavigator<AuthStackParamList>();
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name='Login' component={LoginScreen} />
    <AuthStack.Screen name='Register' component={RegisterScreen} />
  </AuthStack.Navigator>
);

const styles = StyleSheet.create({
  headerRightButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 90,
    marginRight: 10,
  },
  button: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
});
