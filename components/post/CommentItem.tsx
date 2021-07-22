import React, { useState } from 'react';
import DayJS from 'dayjs';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import { updateReactOnComment } from '../../redux/comment/comment.actions';

import { IComment, ReactionType, RootStackParamList } from '../../types';
import { IUser } from '../../redux/user/user.types';

import { View, Text } from '../Themed';
import DPcontainer from '../UI/DPcontainer';
import ReactionsContainer from './ReactionsContainer';

import Colors from '../../constants/Colors';

interface CommentItemProps {
	comment: IComment;
	currentUser: IUser;
	navigation: StackNavigationProp<RootStackParamList, 'Comments'>;
	handleCommentLongPress: (comment: IComment) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
	comment,
	currentUser,
	navigation,
	handleCommentLongPress,
}) => {
	const [showReactionsContainer, toggleReactionsContainer] = useState<boolean>(false);

	const dispatch = useDispatch();

	const isReactedByMe = comment.commentReactions.find(
		r => r.reactorId === currentUser.id,
	);

	const handleSelectComment = () => {
		handleCommentLongPress(comment);
	};

	const handleSinglePressLikeButton = () => {
		if (isReactedByMe) {
			dispatch(
				updateReactOnComment(
					comment.postId,
					comment.commentId,
					'',
					currentUser.id as string,
				),
			);
		} else {
			dispatch(
				updateReactOnComment(
					comment.postId,
					comment.commentId,
					'Like',
					currentUser.id as string,
				),
			);
		}
	};

	const handleToggleReactionsContainer = () => {
		toggleReactionsContainer(prevState => !prevState);
	};

	const handleReaction = (reaction: ReactionType) => {
		toggleReactionsContainer(false);
		dispatch(
			updateReactOnComment(
				comment.postId,
				comment.commentId,
				reaction,
				currentUser.id as string,
			),
		);
	};

	let reactionText;

	if (!isReactedByMe) {
		reactionText = <Text style={styles.infoText}>Like</Text>;
	} else {
		if (isReactedByMe.reaction === 'Like') {
			reactionText = (
				<View style={styles.likedButton}>
					<AntDesign
						name='like1'
						size={16}
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
				</View>
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

			<TouchableOpacity
				style={styles.commentItem}
				activeOpacity={0.5}
				onPress={handleSelectComment}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => navigation.navigate('Profile', { userId: comment.creator.id })}>
					<DPcontainer imageUri={comment.creator.profilePicUri} />
				</TouchableOpacity>

				<View style={styles.commentContainer}>
					<View style={styles.box}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() =>
								navigation.navigate('Profile', { userId: comment.creator.id })
							}>
							<Text style={styles.creatorName}>{comment.creator.displayName}</Text>
						</TouchableOpacity>
						<Text>{comment.body}</Text>
					</View>

					<View style={styles.commentInfo}>
						{comment.modifiedAt ? (
							<>
								<Text style={styles.infoText}>
									{DayJS(comment.modifiedAt).format("MMM DD 'YY")}
								</Text>
								<Text style={styles.infoText}>Edited</Text>
							</>
						) : (
							<Text style={styles.infoText}>
								{DayJS(comment.createdAt).format("MMM DD 'YY")}
							</Text>
						)}
						<TouchableOpacity
							style={styles.infoText}
							activeOpacity={0.6}
							onPress={handleSinglePressLikeButton}
							onLongPress={handleToggleReactionsContainer}>
							{reactionText}
						</TouchableOpacity>
						<Text style={styles.infoText}>Reply</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default CommentItem;

const styles = StyleSheet.create({
	commentItem: {
		flexDirection: 'row',
		marginVertical: 8,
	},
	commentContainer: {
		marginLeft: 10,
	},
	box: {
		backgroundColor: Colors.defaultCommentBoxBackground,
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 12,
		alignSelf: 'flex-start', // for auto width of the box
		marginBottom: 6,
	},
	creatorName: {
		fontWeight: 'bold',
	},
	commentInfo: {
		paddingHorizontal: 7,
		flexDirection: 'row',
		alignItems: 'center',
	},
	infoText: {
		paddingHorizontal: 7,
		color: Colors.grayText,
		fontWeight: 'bold',
		fontSize: 13,
	},
	likedButton: {
		flexDirection: 'row',
		alignItems: 'center',
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
