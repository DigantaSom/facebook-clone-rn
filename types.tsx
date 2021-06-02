/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { IUser } from './redux/user/user.types';
import { ProfileAboutType } from './redux/profile/profile.types';

// Navigation

export type RootStackParamList = {
  Root: undefined;
  Search: undefined;
  NotFound: undefined;
  Profile: { userId: string };
  CreatePost: undefined;
  Upload: {
    currentUser: IUser;
    uploadType: UploadType;
  };
  Photo: { photo: IPhoto };
  AddOrEditProfileAbout: undefined;
  AlbumsTab: {
    userId: string;
    displayName: string;
  };
  IndividualAlbum: undefined;
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
  // for navigation to other navigators' screens
  CreatePost: undefined;
  Profile: { userId: string };
};
export type TopTabNavProps<T extends keyof TopTabParamList> = {
  navigation: StackNavigationProp<TopTabParamList, T>;
};

export type GroupsStackParamList = {
  Groups: undefined;
};

export type NotificationsStackParamList = {
  Notifications: undefined;
};

export type MenuStackParamList = {
  Menu: undefined;
  // for navigation to other navigators' screens
  Profile: { userId: string };
  CreatePost: undefined;
  Upload: {
    currentUser: IUser;
    uploadType: UploadType;
  };
  Photo: { photo: IPhoto };
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
  Saved: {
    userId: string;
  };
  PhotosOfYou: {
    userId: string;
  };
  AllPhotos: {
    userId: string;
  };
  Albums: {
    userId: string;
  };
  Photo: { photo: IPhoto };
  IndividualAlbum: {
    albumTitle: string;
    userId: string;
  };
};
export type AlbumsTabNavProps<T extends keyof AlbumsTabParamList> = {
  navigation: StackNavigationProp<AlbumsTabParamList, T>;
  route: RouteProp<AlbumsTabParamList, T>;
};

// Photo

export type BlobType = Blob | Uint8Array | ArrayBuffer;

export interface IPhoto {
  imageUri: string;
  title?: string;
  creator: {
    id: string;
    displayName: string;
  };
  createdAt: string;
}

// others

export type HeaderActionType = 'Save' | 'Edit' | 'Post';

export type EmptyContentType = 'album' | 'photo'; // TODO: add more gradually

export type UploadType = 'Profile Pic' | 'Cover Pic' | 'Photo';

export type PostSettingsType = 'Privacy' | 'Album';
