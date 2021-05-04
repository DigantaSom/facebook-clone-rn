/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { StackNavigationProp } from '@react-navigation/stack';

// Navigation

export type RootStackParamList = {
  Root: undefined;
  Search: undefined;
  NotFound: undefined;
  Profile: undefined;
  CreatePost: undefined;
};
export type RootNavProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
export type AuthNavProps<T extends keyof AuthStackParamList> = {
  navigation: StackNavigationProp<AuthStackParamList, T>;
};

export type FacebookStackParamList = {
  Facebook: undefined;
  Search: undefined;
  Messenger: undefined;
};
export type FacebookNavProps<T extends keyof FacebookStackParamList> = {
  navigation: StackNavigationProp<FacebookStackParamList, T>;
};

export type TopTabParamList = {
  Home: undefined;
  Videos: undefined;
  Groups: undefined;
  Notifications: undefined;
  Menu: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

export type GroupsStackParamList = {
  Groups: undefined;
};

export type NotificationsStackParamList = {
  Notifications: undefined;
};

export type MenuStackParamList = {
  Menu: undefined;
  Profile: undefined;
  CreatePost: undefined;
};
export type MenuNavProps<T extends keyof MenuStackParamList> = {
  navigation: StackNavigationProp<MenuStackParamList, T>;
};
