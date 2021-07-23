import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
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
import { deleteReply } from '../../redux/reply/reply.actions';

import { RootStackParamList, IReply, ReactionType } from '../../types';
import { IUser } from '../../redux/user/user.types';

import DrawerOption from './DrawerOption';

import Colors from '../../constants/Colors';

interface ReplyBottomDrawerProps {
	reply: IReply;
	currentUser: IUser;
	navigation: StackNavigationProp<RootStackParamList, 'Replies'>;
	handleReaction_on_Reply: (
		reactionType: ReactionType,
		postId: string,
		commentId: string,
	) => void;
	handleCloseModal: () => void;
}

const ReplyBottomDrawer: React.FC<ReplyBottomDrawerProps> = ({
	reply,
	currentUser,
	navigation,
	handleReaction_on_Reply,
	handleCloseModal,
}) => {
	const isMyReply = reply.creator.id === currentUser.id;

	const dispatch = useDispatch();

	const handleDeleteReply = () => {
		handleCloseModal();

		if (!isMyReply) {
			return;
		}

		Alert.alert(
			'Delete Confirmation',
			'Are you sure that you want to delete this reply?',
			[
				{
					text: 'Yes',
					onPress: () => {
						dispatch(
							deleteReply(reply.postId, reply.commentId, reply.replyId, currentUser),
						);
					},
				},
				{ text: 'No' },
			],
		);
	};

	const onSelectEditReply = () => {
		if (!isMyReply) {
			return;
		}
		// TODO: navigate to edit reply screen
	};

	return (
		<ViewRN style={styles.container}>
			<DrawerOption
				icon={<MaterialCommunityIcons name='comment-outline' size={20} color='white' />}
				text='Reply'
			/>
			<DrawerOption icon={<Fontisto name='copy' size={20} color='white' />} text='Copy' />
			{isMyReply ? (
				<>
					<DrawerOption
						icon={<Ionicons name='trash' size={24} color='white' />}
						text='Delete'
						onPressDrawerOption={handleDeleteReply}
					/>
					<DrawerOption
						icon={<FontAwesome5 name='edit' size={20} color='white' />}
						text='Edit'
						onPressDrawerOption={onSelectEditReply}
					/>
				</>
			) : (
				<>
					<DrawerOption
						icon={<Entypo name='squared-cross' size={20} color='white' />}
						text='Hide reply'
					/>
					<DrawerOption
						icon={<Octicons name='report' size={20} color='white' />}
						text='Find support or report reply'
					/>
				</>
			)}
		</ViewRN>
	);
};

export default ReplyBottomDrawer;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.dark.cardBackground,
		height: '100%',
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
});
