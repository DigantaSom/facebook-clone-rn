import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
	FlatList,
	TextInput,
	Platform,
	TouchableOpacity,
	Keyboard,
	StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchSingleComment } from '../../redux/comment/comment.actions';
import { addReply, fetchAllReplies } from '../../redux/reply/reply.actions';

import { RootNavProps, IReply, ReactionType } from '../../types';

import { View } from '../../components/Themed';
import Spinner from '../../components/UI/Spinner';
import Center from '../../components/UI/Center';
import EmptyContent from '../../components/UI/EmptyContent';
import CommentItem from '../../components/post/CommentItem';
import ReplyItem from '../../components/post/ReplyItem';
import ReplyBottomDrawer from '../../components/bottom-drawers/ReplyBottomDrawer';

import Colors from '../../constants/Colors';

type RepliesScreenProps = RootNavProps<'Replies'>;

const RepliesScreen: React.FC<RepliesScreenProps> = ({ navigation, route }) => {
	const { postId, commentId } = route.params;

	const [replyText, setReplyText] = useState<string>('');
	const [selectedReply, setSelectedReply] = useState<IReply>();

	const repliesFlatListRef = useRef<any>(null);

	const dispatch = useDispatch();
	const { currentUser } = useSelector((state: RootState) => state.user);
	const { comment, loading: commentLoading } = useSelector(
		(state: RootState) => state.comment,
	);
	const { replies, loading: replyLoading } = useSelector(
		(state: RootState) => state.reply,
	);

	useEffect(() => {
		dispatch(fetchSingleComment(postId, commentId));
	}, [dispatch, fetchSingleComment, postId, commentId]);

	useEffect(() => {
		dispatch(fetchAllReplies(postId, commentId));
	}, [dispatch, fetchAllReplies, postId, commentId]);

	const renderReply = useCallback(
		({ item }) => (
			<ReplyItem
				reply={item}
				currentUser={currentUser!}
				navigation={navigation}
				handleReplySelect={handlePresentModalPress}
			/>
		),
		[],
	);

	// gorhom bottom sheet

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const snapPoints = useMemo(() => ['30%', '30%'], []);

	const handlePresentModalPress = useCallback((reply: IReply) => {
		bottomSheetModalRef.current?.present();

		if (reply) {
			setSelectedReply(reply);
		}
	}, []);

	const handleSheetChanges = useCallback(() => {}, []);

	const handleCloseModal = () => bottomSheetModalRef.current?.close();

	// other functions

	const handleAddReply = () => {
		if (replyText && currentUser) {
			dispatch(addReply(replyText, postId, commentId, currentUser));
		}
		setReplyText('');
		Keyboard.dismiss();
	};

	const handleReaction_on_Reply = (reaction: ReactionType) => {};

	if (commentLoading || replyLoading) {
		return <Spinner />;
	}
	if (!comment) {
		return null;
	}

	return (
		<View style={styles.container}>
			{!currentUser ? null : (
				<CommentItem
					comment={comment}
					currentUser={currentUser}
					handleCommentSelect={() => {}}
					commentIndex={0}
				/>
			)}

			<View style={styles.repliesContainer}>
				{!replies.length ? (
					<Center>
						<EmptyContent emptyType='Reply' />
					</Center>
				) : (
					<FlatList
						data={replies}
						keyExtractor={item => item.replyId}
						renderItem={renderReply}
						// for scroll to bottom, when keyboard appears
						ref={repliesFlatListRef}
						onContentSizeChange={() => repliesFlatListRef.current.scrollToEnd()}
						onLayout={() => repliesFlatListRef.current.scrollToEnd()}
					/>
				)}
			</View>

			<View style={styles.inputContainer}>
				<TextInput
					value={replyText}
					onChangeText={text => setReplyText(text)}
					style={styles.input}
					placeholder='Write a reply...'
					placeholderTextColor='#b3b3b3'
					multiline
				/>
				{!replyText ? null : (
					<TouchableOpacity activeOpacity={0.6} onPress={handleAddReply}>
						<Ionicons
							name={Platform.OS === 'ios' ? 'ios-send' : 'md-send'}
							size={24}
							color={Colors.facebookPrimary}
						/>
					</TouchableOpacity>
				)}
			</View>

			{!selectedReply || !currentUser ? null : (
				<BottomSheetModal
					ref={bottomSheetModalRef}
					index={1}
					snapPoints={snapPoints}
					onChange={handleSheetChanges}>
					<ReplyBottomDrawer
						reply={selectedReply}
						currentUser={currentUser}
						navigation={navigation}
						handleReaction_on_Reply={handleReaction_on_Reply}
						handleCloseModal={handleCloseModal}
					/>
				</BottomSheetModal>
			)}
		</View>
	);
};

export default RepliesScreen;

const styles = StyleSheet.create({
	container: {
		margin: 20,
		flex: 1,
	},
	repliesContainer: {
		flex: 1,
		marginTop: 15,
		marginLeft: 52, // 42 (width of comment's DPContainer) + 10 (CommentItem's commentContainer marginLeft)
	},
	inputContainer: {
		backgroundColor: '#373737',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderRadius: 25,
	},
	input: {
		color: 'white',
		flex: 1,
	},
});
