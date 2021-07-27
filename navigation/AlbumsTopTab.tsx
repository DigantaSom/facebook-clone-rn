import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Feather } from '@expo/vector-icons';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { AlbumsTabParamList, RootNavProps } from '../types';

import SavedScreen from '../screens/albums/SavedScreen';
import PhotosOfYouScreen from '../screens/albums/PhotosOfYouScreen';
import AllPhotosScreen from '../screens/albums/AllPhotosScreen';
import AlbumsScreen from '../screens/albums/AlbumsScreen';

import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import getFirstName from '../utils/getFirstName';

const AlbumsTopTab = createMaterialTopTabNavigator<AlbumsTabParamList>();

const AlbumsTopTabNavigator = ({ route }: RootNavProps<'AlbumsTab'>) => {
	const { userId, displayName } = route.params; // from profile

	const colorScheme = useColorScheme();
	const currentUserId = useSelector((state: RootState) => state.user.currentUser?.id);

	const isMyProfile = currentUserId === userId;

	return (
		<AlbumsTopTab.Navigator
			initialRouteName='Albums'
			tabBarOptions={{
				activeTintColor: Colors[colorScheme].tint,
				labelStyle: {
					fontSize: 12,
				},
				tabStyle: {
					flexDirection: 'row',
					alignItems: 'center',
					width: 'auto',
				},
				scrollEnabled: true,
				showIcon: true,
			}}>
			<AlbumsTopTab.Screen
				name='Saved'
				component={SavedScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<Feather
							name='lock'
							size={20}
							color={focused ? Colors.facebookPrimary : '#AAA'}
						/>
					),
				}}
			/>
			<AlbumsTopTab.Screen
				name='PhotosOfYou'
				component={PhotosOfYouScreen}
				options={{
					title: `Photos of ${isMyProfile ? 'You' : getFirstName(displayName)}`,
				}}
			/>
			<AlbumsTopTab.Screen
				name='AllPhotos'
				component={AllPhotosScreen}
				initialParams={{ userId }}
				options={{ title: 'All Photos' }}
			/>
			<AlbumsTopTab.Screen
				name='Albums'
				component={AlbumsScreen}
				initialParams={{ userId }}
				options={{ title: 'Albums' }}
			/>
		</AlbumsTopTab.Navigator>
	);
};

export default AlbumsTopTabNavigator;
