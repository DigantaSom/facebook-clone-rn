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
  Photo: { photo: ProfileAndCoverPicType };
  AddOrEditProfileAbout: undefined;
  AlbumsTab: {
    userId: string;
    displayName: string;
  };
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
  Photo: { photo: ProfileAndCoverPicType };
  AddOrEditProfileAbout: {
    isEdit: boolean;
    currentUser: IUser;
    profileAbout?: ProfileAboutType;
  };
  AlbumsTab: {
    userId: string;
    displayName: string;
  };
};
export type MenuNavProps<T extends keyof MenuStackParamList> = {
  navigation: StackNavigationProp<MenuStackParamList, T>;
  route: RouteProp<MenuStackParamList, T>;
};

export type AlbumsTabParamList = {
  Saved: undefined;
  PhotosOfYou: undefined;
  AllPhotos: {
    userId: string;
  };
  AlbumsStack: undefined;
};
export type AlbumsTabNavProps<T extends keyof AlbumsTabParamList> = {
  route: RouteProp<AlbumsTabParamList, T>;
};

export type AlbumsStackParamList = {
  Albums: undefined;
};

// Photo

export type BlobType = Blob | Uint8Array | ArrayBuffer;

export type ProfileAndCoverPicType = {
  imageUri: string;
  caption?: string;
  creator: {
    id: string;
    displayName: string;
  };
  createdAt: string;
};
