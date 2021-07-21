import React from 'react';
import { View as ViewRN, Alert, StyleSheet } from 'react-native';
import {
	MaterialCommunityIcons,
	Fontisto,
	Entypo,
	Octicons,
	Ionicons,
	FontAwesome5,
} from '@expo/vector-icons';

import { useDispatch } from 'react-redux';

import { IComment } from '../../types';
import { IUser } from '../../redux/user/user.types';

import DrawerOption from './DrawerOption';
import { deleteComment } from '../../redux/comment/comment.actions';

import Colors from '../../constants/Colors';

interface CommentBottomDrawerProps {
	comment: IComment;
	currentUser: IUser;
}

const CommentBottomDrawer: React.FC<CommentBottomDrawerProps> = ({
	comment,
	currentUser,
}) => {
	// console.log('============ comment ============');
	// console.log(comment);

	const isMyComment = comment.creator.id === currentUser.id;

	const dispatch = useDispatch();

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

	return (
		<ViewRN style={styles.container}>
			<DrawerOption
				icon={<MaterialCommunityIcons name='comment-outline' size={20} color='white' />}
				text='Reply'
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
});
