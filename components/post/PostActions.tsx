import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View as ViewRN } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import { updateReactOnPost } from '../../redux/post/post.actions';

import {
	TopTabParamList,
	MenuStackParamList,
	RootStackParamList,
	IPost,
	ReactionType,
} from '../../types';
import { IUser } from '../../redux/user/user.types';

import { View, Text } from '../Themed';
import ReactionsContainer from '../reactions/ReactionsContainer';

import Colors from '../../constants/Colors';

interface PostActionsProps {
	currentUser: IUser;
	post: IPost;
	navigationFromHome?: StackNavigationProp<TopTabParamList, 'Home'>;
	navigationFromProfile?: StackNavigationProp<MenuStackParamList, 'Profile'>;
	navigationFromPhoto?: StackNavigationProp<RootStackParamList, 'Photo'>;
}

const PostActions: React.FC<PostActionsProps> = ({
	post,
	currentUser,
	navigationFromHome,
	navigationFromProfile,
	navigationFromPhoto,
}) => {
	const [showReactionsContainer, toggleReactionsContainer] = useState<boolean>(false);

	const dispatch = useDispatch();

	const isReactedByMe = post.reactions.find(r => r.reactorId === currentUser.id);

	const handleSinglePressLikeButton = () => {
		if (isReactedByMe) {
			dispatch(updateReactOnPost(post.postId, '', currentUser));
		} else {
			dispatch(updateReactOnPost(post.postId, 'Like', currentUser));
		}
	};

	const handleToggleReactionsContainer = () => {
		toggleReactionsContainer(prevState => !prevState);
	};

	const handleReaction = (reaction: ReactionType) => {
		toggleReactionsContainer(false);
		dispatch(updateReactOnPost(post.postId, reaction, currentUser));
	};

	let reactionText;

	if (!isReactedByMe) {
		reactionText = (
			<>
				<AntDesign name='like2' size={20} color='white' style={styles.actionIcon} />
				<Text style={[styles.actionText, { color: 'white' }]}>Like</Text>
			</>
		);
	} else if (isReactedByMe) {
		if (isReactedByMe.reaction === 'Like') {
			reactionText = (
				<>
					<AntDesign
						name='like1'
						size={20}
						color={Colors.facebookPrimary}
						style={styles.actionIcon}
					/>
					<Text
						style={[
							styles.actionText,
							{
								color: Colors.facebookPrimary,
								fontWeight: 'bold',
							},
						]}>
						Like
					</Text>
				</>
			);
		} else if (isReactedByMe.reaction === 'Love') {
			reactionText = (
				<Text style={[styles.actionText, { color: 'red', fontWeight: 'bold' }]}>
					<Text style={styles.reactionIcon}>❤️</Text> Love
				</Text>
			);
		} else if (isReactedByMe.reaction === 'Haha') {
			reactionText = (
				<Text style={[styles.actionText, { color: 'yellow', fontWeight: 'bold' }]}>
					<Text style={styles.reactionIcon}>😆</Text> Haha
				</Text>
			);
		} else if (isReactedByMe.reaction === 'Wow') {
			reactionText = (
				<Text style={[styles.actionText, { color: 'yellow', fontWeight: 'bold' }]}>
					<Text style={styles.reactionIcon}>😯</Text> Wow
				</Text>
			);
		} else if (isReactedByMe.reaction === 'Sad') {
			reactionText = (
				<Text style={[styles.actionText, { color: 'yellow', fontWeight: 'bold' }]}>
					<Text style={styles.reactionIcon}>😢</Text> Sad
				</Text>
			);
		} else if (isReactedByMe.reaction === 'Angry') {
			reactionText = (
				<Text style={[styles.actionText, { color: 'orange', fontWeight: 'bold' }]}>
					<Text style={styles.reactionIcon}>😡</Text> Angry
				</Text>
			);
		}
	}

	return (
		<View>
			{showReactionsContainer ? (
				<ReactionsContainer handleReaction={handleReaction} />
			) : null}

			<ViewRN style={styles.postActions}>
				{/* React post */}
				<TouchableOpacity
					style={styles.actionItem}
					activeOpacity={0.4}
					// onPress={isReacted && isReactedByMe ? handleRemoveReaction : handleLikePost}
					onPress={handleSinglePressLikeButton}
					onLongPress={handleToggleReactionsContainer}>
					{reactionText}
				</TouchableOpacity>

				{/* Comment on post */}
				<TouchableOpacity
					style={styles.actionItem}
					activeOpacity={0.4}
					onPress={() => {
						navigationFromHome
							? navigationFromHome.navigate('Comments', { postId: post.postId })
							: navigationFromProfile
							? navigationFromProfile.navigate('Comments', { postId: post.postId })
							: navigationFromPhoto
							? navigationFromPhoto.navigate('Comments', { postId: post.postId })
							: null;
					}}>
					<FontAwesome5
						name='comment'
						size={20}
						color='white'
						style={styles.actionIcon}
					/>
					<Text style={styles.actionText}>Comment</Text>
				</TouchableOpacity>

				{/* Share post */}
				<TouchableOpacity
					style={styles.actionItem}
					activeOpacity={0.4}
					onPress={() => {}}>
					<MaterialCommunityIcons name='share-outline' size={24} color='white' />
					<Text style={styles.actionText}>Share</Text>
				</TouchableOpacity>
			</ViewRN>
		</View>
	);
};

export default PostActions;

const styles = StyleSheet.create({
	postActions: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: Colors.grayButton,
		borderBottomWidth: 1,
		borderBottomColor: Colors.grayButton,
		paddingVertical: 5,
	},
	actionItem: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1 / 3,
		justifyContent: 'center',
		paddingVertical: 5,
	},
	actionIcon: {
		paddingRight: 5,
	},
	actionText: {
		fontSize: 12,
	},
	reactionIcon: {
		fontSize: 14,
	},
});
