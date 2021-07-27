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
import ReactionsContainer from '../reactions/ReactionsContainer';

import Colors from '../../constants/Colors';

interface CommentItemProps {
	comment: IComment;
	commentIndex: number;
	currentUser: IUser;
	navigation?: StackNavigationProp<RootStackParamList, 'Comments'>;
	handleCommentSelect: (comment: IComment) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
	comment,
	commentIndex,
	currentUser,
	navigation,
	handleCommentSelect,
}) => {
	const [showReactionsContainer, toggleReactionsContainer] = useState<boolean>(false);

	const dispatch = useDispatch();

	const isReactedByMe = comment.commentReactions.find(
		r => r.reactorId === currentUser.id,
	);

	const handleSelectComment = () => {
		handleCommentSelect(comment);
	};

	const handleSinglePressLikeButton = () => {
		if (isReactedByMe) {
			dispatch(updateReactOnComment(comment.postId, comment.commentId, '', currentUser));
		} else {
			dispatch(
				updateReactOnComment(comment.postId, comment.commentId, 'Like', currentUser),
			);
		}
	};

	const handleToggleReactionsContainer = () => {
		toggleReactionsContainer(prevState => !prevState);
	};

	const handleReaction = (reaction: ReactionType) => {
		toggleReactionsContainer(false);
		dispatch(
			updateReactOnComment(comment.postId, comment.commentId, reaction, currentUser),
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
				<ReactionsContainer
					handleReaction={handleReaction}
					topMargin={commentIndex === 0 ? 5 : null}
				/>
			) : null}

			<TouchableOpacity
				style={styles.commentItem}
				activeOpacity={0.5}
				onLongPress={handleSelectComment}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => navigation?.navigate('Profile', { userId: comment.creator.id })}>
					<DPcontainer imageUri={comment.creator.profilePicUri} />
				</TouchableOpacity>

				<View style={styles.commentContainer}>
					<View style={styles.box}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() =>
								navigation?.navigate('Profile', { userId: comment.creator.id })
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

						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => {
								navigation?.navigate('Replies', {
									postId: comment.postId,
									commentId: comment.commentId,
								});
							}}>
							<Text style={styles.infoText}>Reply</Text>
						</TouchableOpacity>

						{!comment.commentReactions.length ? null : (
							<TouchableOpacity
								activeOpacity={0.6}
								onPress={() => {
									navigation?.navigate('ReactionsTopTab', {
										contentType: 'Comment',
										postId: comment.postId,
										commentId: comment.commentId,
									});
								}}>
								<Text style={[styles.infoText, { fontSize: 12 }]}>
									{comment.commentReactions.length} Reactions
								</Text>
							</TouchableOpacity>
						)}
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
