/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { StackNavigationProp } from '@react-navigation/stack';

// Navigation

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
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

export type TopTabParamList = {
  Home: undefined;
  Videos: undefined;
  Groups: undefined;
  Notifications: undefined;
  More: undefined;
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
export type MoreScreenStackParamList = {
  More: undefined;
};
