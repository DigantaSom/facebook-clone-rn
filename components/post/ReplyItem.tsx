import React, { useState } from 'react';
import DayJS from 'dayjs';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import { updateReactOnReply } from '../../redux/reply/reply.actions';

import { IReply, ReactionType, RootStackParamList } from '../../types';
import { IUser } from '../../redux/user/user.types';

import { Text, View } from '../Themed';
import DPcontainer from '../UI/DPcontainer';
import ReactionsContainer from '../reactions/ReactionsContainer';

import Colors from '../../constants/Colors';

interface ReplyItemProps {
	reply: IReply;
	replyIndex: number;
	currentUser: IUser;
	navigation: StackNavigationProp<RootStackParamList, 'Replies'>;
	handleReplySelect: (reply: IReply) => void;
}

const ReplyItem: React.FC<ReplyItemProps> = ({
	reply,
	replyIndex,
	currentUser,
	navigation,
	handleReplySelect,
}) => {
	const [showReactionsContainer, toggleReactionsContainer] = useState<boolean>(false);

	const dispatch = useDispatch();

	const isReactedByMe = reply.replyReactions.find(r => r.reactorId === currentUser.id);

	const handleSelectReply = () => {
		handleReplySelect(reply);
	};

	const handleSinglePressLikeButton = () => {
		if (isReactedByMe) {
			dispatch(
				updateReactOnReply(reply.postId, reply.commentId, reply.replyId, '', currentUser),
			);
		} else {
			dispatch(
				updateReactOnReply(
					reply.postId,
					reply.commentId,
					reply.replyId,
					'Like',
					currentUser,
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
			updateReactOnReply(
				reply.postId,
				reply.commentId,
				reply.replyId,
				reaction,
				currentUser,
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
				<ReactionsContainer
					handleReaction={handleReaction}
					topMargin={replyIndex === 0 ? 5 : null}
				/>
			) : null}

			<TouchableOpacity
				style={styles.replyItem}
				activeOpacity={0.5}
				onLongPress={handleSelectReply}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => navigation?.navigate('Profile', { userId: reply.creator.id })}>
					<DPcontainer imageUri={reply.creator.profilePicUri} size='small' />
				</TouchableOpacity>

				<View style={styles.replyContainer}>
					<View style={styles.box}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() =>
								navigation?.navigate('Profile', { userId: reply.creator.id })
							}>
							<Text style={styles.creatorName}>{reply.creator.displayName}</Text>
						</TouchableOpacity>
						<Text>{reply.body}</Text>
					</View>

					<View style={styles.replyInfo}>
						{reply.modifiedAt ? (
							<>
								<Text style={styles.infoText}>
									{DayJS(reply.modifiedAt).format("MMM DD 'YY")}
								</Text>
								<Text style={styles.infoText}>Edited</Text>
							</>
						) : (
							<Text style={styles.infoText}>
								{DayJS(reply.createdAt).format("MMM DD 'YY")}
							</Text>
						)}
						<TouchableOpacity
							style={styles.infoText}
							activeOpacity={0.6}
							onPress={handleSinglePressLikeButton}
							onLongPress={handleToggleReactionsContainer}>
							{reactionText}
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
							<Text style={styles.infoText}>Reply</Text>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default ReplyItem;

const styles = StyleSheet.create({
	replyItem: {
		flexDirection: 'row',
		marginVertical: 8,
	},
	replyContainer: {
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
	replyInfo: {
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
