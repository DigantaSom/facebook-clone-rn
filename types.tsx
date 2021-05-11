/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import firebase from './firebase/firebase.utils';

import { IUser } from './redux/user/user.types';
import { ProfileAboutType } from './redux/profile/profile.types';

// Navigation

export type RootStackParamList = {
  Root: undefined;
  Search: undefined;
  NotFound: undefined;
  Profile: { userId: string };
  CreatePost: undefined;
  UploadProfileOrCoverPic: {
    currentUser: IUser;
    isCoverPic: boolean;
  };
  Photo: { imageUri: string };
  AddOrEditProfileAbout: undefined;
};
export type RootNavProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
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
  Profile: { userId: string };
  CreatePost: undefined;
  UploadProfileOrCoverPic: {
    currentUser: IUser;
    isCoverPic: boolean;
  };
  Photo: { imageUri: string };
  AddOrEditProfileAbout: {
    isEdit: boolean;
    currentUser: IUser;
    profileAbout: ProfileAboutType;
  };
};
export type MenuNavProps<T extends keyof MenuStackParamList> = {
  navigation: StackNavigationProp<MenuStackParamList, T>;
  route: RouteProp<MenuStackParamList, T>;
};

// Photo

export type BlobType = Blob | Uint8Array | ArrayBuffer;

export type ProfileAndCoverPicType = {
  imageUri: string;
  caption?: string;
  createdAt: firebase.firestore.FieldValue;
};
