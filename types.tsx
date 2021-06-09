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
  Upload: {
    currentUser: IUser;
    postType: PostType;
  };
  Photo: { postId: string };
  AddOrEditProfileAbout: undefined;
  AlbumsTab: {
    userId: string;
    displayName: string;
  };
  IndividualAlbum: undefined;
  CreatePost: undefined;
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
  Profile: { userId: string };
  CreatePost: undefined;
  Photo: { postId: string };
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
    postType: PostType;
  };
  // Photo: { photo: IPost };
  Photo: { postId: string };
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
  Photo: { postId: string };
  IndividualAlbum: {
    albumTitle: string;
    userId: string;
  };
};
export type AlbumsTabNavProps<T extends keyof AlbumsTabParamList> = {
  navigation: StackNavigationProp<AlbumsTabParamList, T>;
  route: RouteProp<AlbumsTabParamList, T>;
};

// Post

export type BlobType = Blob | Uint8Array | ArrayBuffer;

type CreatorType = {
  id: string;
  displayName: string;
  profilePicUri: string;
  gender: GenderType;
};

export interface IReaction {
  reactorId: string;
  reaction: ReactionType;
}

export interface IPost {
  postId: string;
  imageUri?: string;
  title?: string;
  creator: CreatorType;
  createdAt: string;
  postType: PostType;
  reactions: IReaction[];
}

// others

export type GenderType = 'Female' | 'Male' | 'Rather not say';

export type HeaderActionType = 'Save' | 'Edit' | 'Post';

export type EmptyContentType = 'Album' | 'Photo'; // TODO: add more gradually

export type PostType = 'Profile Pic' | 'Cover Pic' | 'Photo';

export type PostSettingsType = 'Privacy' | 'Album';

export type ReactionType = 'Like' | 'Love' | 'Haha' | 'Wow' | 'Sad' | 'Angry' | '';
