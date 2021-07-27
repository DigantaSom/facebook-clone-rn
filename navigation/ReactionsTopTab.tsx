import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
	RootNavProps,
	ReactionsTabParamList,
	ReactionsNavigationScreensTypes,
} from '../types';

import AllReactionsScreen from '../screens/reactions/AllReactionsScreen';

import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

const ReactionsTopTab = createMaterialTopTabNavigator<ReactionsTabParamList>();

const ReactionsTopTabNavigator = ({ route }: RootNavProps<'ReactionsTopTab'>) => {
	const colorScheme = useColorScheme();

	// initial default params for Post
	const initialParams_AllReactions: ReactionsNavigationScreensTypes = {
		contentType: 'Post',
		postId: route.params.postId,
	};
	if (
		route.params.contentType === 'Comment' &&
		route.params.commentId &&
		!route.params.replyId
	) {
		initialParams_AllReactions.contentType = 'Comment';
		initialParams_AllReactions.postId = route.params.postId;
		initialParams_AllReactions.commentId = route.params.commentId;
	} else if (
		route.params.contentType === 'Reply' &&
		route.params.commentId &&
		route.params.replyId
	) {
		initialParams_AllReactions.contentType = 'Reply';
		initialParams_AllReactions.postId = route.params.postId;
		initialParams_AllReactions.commentId = route.params.commentId;
		initialParams_AllReactions.replyId = route.params.replyId;
	}

	return (
		<ReactionsTopTab.Navigator
			initialRouteName='AllReactions'
			screenOptions={{ title: 'People who reacted' }}
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
			<ReactionsTopTab.Screen
				name='AllReactions'
				component={AllReactionsScreen}
				initialParams={initialParams_AllReactions}
			/>
		</ReactionsTopTab.Navigator>
	);
};

export default ReactionsTopTabNavigator;
