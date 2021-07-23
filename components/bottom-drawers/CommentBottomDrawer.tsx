import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View as ViewRN, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import {
	MaterialCommunityIcons,
	Fontisto,
	Entypo,
	Octicons,
	Ionicons,
	FontAwesome5,
} from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import { deleteComment } from '../../redux/comment/comment.actions';

import { RootStackParamList, IComment, ReactionType } from '../../types';
import { IUser } from '../../redux/user/user.types';

import { Text } from '../Themed';
import DrawerOption from './DrawerOption';

import Colors from '../../constants/Colors';

interface CommentBottomDrawerProps {
	comment: IComment;
	currentUser: IUser;
	navigation: StackNavigationProp<RootStackParamList, 'Comments'>;
	handleReaction_on_Comment: (reactionType: ReactionType, commentId: string) => void;
	handleCloseModal: () => void;
}

const CommentBottomDrawer: React.FC<CommentBottomDrawerProps> = ({
	comment,
	currentUser,
	navigation,
	handleReaction_on_Comment,
	handleCloseModal,
}) => {
	const isMyComment = comment.creator.id === currentUser.id;

	const dispatch = useDispatch();

	const handleNavigateToReplyScreen = () => {
		handleCloseModal();
		navigation.navigate('Replies', {
			postId: comment.postId,
			commentId: comment.commentId,
		});
	};

	const handleDeleteComment = () => {
		if (!isMyComment) {
			return;
		}
		Alert.alert(
			'Delete Confirmation',
			'Are you sure that you want to delete this comment?',
			[
				{
					text: 'Yes',
					onPress: () => {
						dispatch(deleteComment(comment.postId, comment.commentId, currentUser));
					},
				},
				{ text: 'No' },
			],
		);
	};

	const onSelectEditComment = () => {
		if (!isMyComment) {
			return;
		}
		navigation.navigate('EditComment', {
			postId: comment.postId,
			commentId: comment.commentId,
		});
		handleCloseModal();
	};

	const onCommentReact = (reactionType: ReactionType) => {
		console.log('comment reaction type:', reactionType);

		handleReaction_on_Comment(reactionType, comment.commentId);
		handleCloseModal();
	};

	return (
		<ViewRN style={styles.container}>
			<ViewRN style={styles.reactionsContainer}>
				<ViewRN style={styles.reactionEmojies}>
					<TouchableOpacity activeOpacity={0.4} onPress={() => onCommentReact('Like')}>
						<Text style={styles.reaction}>👍🏻</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.4} onPress={() => Alert.alert('love react')}>
						<Text style={styles.reaction}>❤️</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.4} onPress={() => onCommentReact('Haha')}>
						<Text style={styles.reaction}>😆</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.4} onPress={() => onCommentReact('Wow')}>
						<Text style={styles.reaction}>😯</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.4} onPress={() => onCommentReact('Sad')}>
						<Text style={styles.reaction}>😢</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.4} onPress={() => onCommentReact('Angry')}>
						<Text style={styles.reaction}>😡</Text>
					</TouchableOpacity>
				</ViewRN>
			</ViewRN>

			<DrawerOption
				icon={<MaterialCommunityIcons name='comment-outline' size={20} color='white' />}
				text='Reply'
				onPressDrawerOption={handleNavigateToReplyScreen}
			/>
			<DrawerOption icon={<Fontisto name='copy' size={20} color='white' />} text='Copy' />
			{isMyComment ? (
				<>
					<DrawerOption
						icon={<Ionicons name='trash' size={24} color='white' />}
						text='Delete'
						onPressDrawerOption={handleDeleteComment}
					/>
					<DrawerOption
						icon={<FontAwesome5 name='edit' size={20} color='white' />}
						text='Edit'
						onPressDrawerOption={onSelectEditComment}
					/>
				</>
			) : (
				<>
					<DrawerOption
						icon={<Entypo name='squared-cross' size={20} color='white' />}
						text='Hide comment'
					/>
					<DrawerOption
						icon={<Octicons name='report' size={20} color='white' />}
						text='Find support or report comment'
					/>
				</>
			)}
		</ViewRN>
	);
};

export default CommentBottomDrawer;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.dark.cardBackground,
		height: '100%',
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
	reactionsContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 5,
	},
	reactionEmojies: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.dark.cardBackground,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 25,
	},
	reaction: {
		fontSize: 25,
		paddingHorizontal: 10,
	},
});
