import React from 'react';
import DayJS from 'dayjs';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { IPost, MenuStackParamList, TopTabParamList } from '../../types';

import { Text, View } from '../Themed';
import DPcontainer from '../UI/DPcontainer';
import Divider from '../UI/Divider';
import ReactCommentShow from './ReactCommentShow';
import PostActions from './PostActions';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { getPostUploadText } from '../../utils/post.utils';

interface PostItemProps {
	post: IPost;
	navigationFromHome?: StackNavigationProp<TopTabParamList, 'Home'>;
	navigationFromProfile?: StackNavigationProp<MenuStackParamList, 'Profile'>;
}

const PostItem: React.FC<PostItemProps> = ({
	post,
	navigationFromHome,
	navigationFromProfile,
}) => {
	const currentUser = useSelector((state: RootState) => state.user.currentUser);

	const { postId, creator, postType, title, imageUri, createdAt } = post;

	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.6}
			onPress={() => {
				navigationFromHome
					? navigationFromHome.navigate('Comments', { postId })
					: navigationFromProfile?.navigate('Comments', { postId });
			}}>
			<View style={styles.header}>
				<View style={styles.headerLeft}>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => {
							navigationFromHome
								? navigationFromHome.navigate('Profile', { userId: creator.id })
								: navigationFromProfile?.navigate('Profile', { userId: creator.id });
						}}>
						<DPcontainer imageUri={creator.profilePicUri} />
					</TouchableOpacity>

					<View style={styles.info}>
						<View style={styles.postUploadTextContainer}>
							<TouchableOpacity
								activeOpacity={0.5}
								onPress={() => {
									navigationFromHome
										? navigationFromHome.navigate('Profile', { userId: creator.id })
										: navigationFromProfile?.navigate('Profile', { userId: creator.id });
								}}>
								<Text style={styles.displayName}>{creator.displayName}</Text>
							</TouchableOpacity>
							<Text style={styles.postUploadText} numberOfLines={2}>
								{' '}
								{getPostUploadText(postType, creator.gender)}
							</Text>
						</View>
						<Text style={styles.createdAt}>
							{DayJS(createdAt).format("MMM DD 'YY HH:mm")}
						</Text>
					</View>
				</View>

				<TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
					<Entypo name='dots-three-horizontal' size={20} color={Colors.grayText} />
				</TouchableOpacity>
			</View>

			<View style={styles.postContent}>
				{!title ? null : <Text style={styles.postTitle}>{title}</Text>}
				{!imageUri ? null : (
					<TouchableOpacity
						style={styles.photoContainer}
						activeOpacity={0.6}
						onPress={() => {
							navigationFromHome
								? navigationFromHome.navigate('Photo', { postId: post.postId })
								: navigationFromProfile?.navigate('Photo', { postId: post.postId });
						}}>
						<Image source={{ uri: imageUri }} style={styles.photo} />
					</TouchableOpacity>
				)}
			</View>

			<ReactCommentShow reactions={post.reactions} />
			{!currentUser ? null : (
				<PostActions
					currentUser={currentUser}
					post={post}
					navigationFromHome={navigationFromHome}
					navigationFromProfile={navigationFromProfile}
				/>
			)}

			<Divider />
		</TouchableOpacity>
	);
};

export default PostItem;

const styles = StyleSheet.create({
	container: {
		// backgroundColor: Colors.dark.cardBackground,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	info: {
		paddingLeft: 12,
	},
	postUploadTextContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	displayName: {
		fontWeight: 'bold',
	},
	postUploadText: {
		width: Layout.window.width / 2,
	},
	createdAt: {
		fontSize: 11,
		color: Colors.grayText,
	},
	postContent: {},
	postTitle: {
		padding: 10,
		fontSize: 15,
	},
	photoContainer: {
		width: '100%',
		maxHeight: 350,
	},
	photo: {
		width: '100%',
		height: '100%',
	},
});
