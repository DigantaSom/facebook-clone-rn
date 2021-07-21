import React, {
	useState,
	useRef,
	useEffect,
	useLayoutEffect,
	useCallback,
	useMemo,
} from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Platform,
	FlatList,
	Keyboard,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchSinglePost, updateReactOnPost } from '../../redux/post/post.actions';
import { addComment, fetchAllComments } from '../../redux/comment/comment.actions';

import { IComment, ReactionType, RootNavProps } from '../../types';

import { Text, View } from '../../components/Themed';
import ReactionsContainer from '../../components/post/ReactionsContainer';
import Center from '../../components/UI/Center';
import EmptyContent from '../../components/UI/EmptyContent';
import CommentItem from '../../components/post/CommentItem';
import CommentBottomDrawer from '../../components/bottom-drawers/CommentBottomDrawer';

import Colors from '../../constants/Colors';
import Spinner from '../../components/UI/Spinner';

type CommentsScreenProps = RootNavProps<'Comments'>;

const CommentsScreen: React.FC<CommentsScreenProps> = ({ navigation, route }) => {
	const flatListRef = useRef<any>(null);
	const [commentText, setCommentText] = useState<string>('');
	const [showReactionsContainer, toggleReactionsContainer] = useState<boolean>(false);
	const [longPressedComment, setLongPressedComment] = useState<IComment>();

	const { postId } = route.params;

	const { currentUser } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const { post, loading: postLoading } = useSelector((state: RootState) => state.post);
	const { comments, loading: commentLoading } = useSelector(
		(state: RootState) => state.comment,
	);

	useEffect(() => {
		dispatch(fetchSinglePost(postId));
	}, [dispatch, fetchSinglePost, postId]);

	useEffect(() => {
		dispatch(fetchAllComments(postId));
	}, [dispatch, fetchAllComments, postId]);

	const isReactedByMe = post?.reactions.find(r => r.reactorId === currentUser?.id);

	let reactionIcon = (
		<AntDesign name='like2' size={22} color={Colors.dark.tabIconDefault} />
	);
	if (isReactedByMe) {
		if (isReactedByMe.reaction === 'Like') {
			reactionIcon = <AntDesign name='like1' size={22} color={Colors.facebookPrimary} />;
		} else if (isReactedByMe.reaction === 'Love') {
			reactionIcon = <Text style={styles.reactionIconStyle}>❤️</Text>;
		} else if (isReactedByMe.reaction === 'Haha') {
			reactionIcon = <Text style={styles.reactionIconStyle}>😆</Text>;
		} else if (isReactedByMe.reaction === 'Wow') {
			reactionIcon = <Text style={styles.reactionIconStyle}>😯</Text>;
		} else if (isReactedByMe.reaction === 'Sad') {
			reactionIcon = <Text style={styles.reactionIconStyle}>😢</Text>;
		} else if (isReactedByMe.reaction === 'Angry') {
			reactionIcon = <Text style={styles.reactionIconStyle}>😡</Text>;
		}
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () =>
				postLoading ? null : (
					<TouchableOpacity
						style={styles.headerLeftContainer}
						activeOpacity={0.6}
						onPress={() => {
							navigation.navigate('PeopleWhoReacted', { postId });
						}}>
						{post?.reactions.length ? (
							<Text style={styles.headerLeftText}>{post.reactions.length} reactions</Text>
						) : null}
						<AntDesign name='right' size={20} color={Colors.grayText} />
					</TouchableOpacity>
				),
			headerBackTitleVisible: false,
			headerTitle: () => null,
			headerRight: () => (
				<TouchableOpacity
					style={styles.headerRightContainer}
					activeOpacity={0.6}
					onPress={handleSinglePressLikeButton}
					onLongPress={handleToggleReactionsContainer}>
					{reactionIcon}
				</TouchableOpacity>
			),
		});
	}, [navigation, postLoading, post, post?.reactions]);

	const renderItem = useCallback(
		({ item }) => (
			<CommentItem
				comment={item}
				navigation={navigation}
				handleCommentLongPress={handlePresentModalPress}
			/>
		),
		[],
	);

	// gorhom bottom sheet

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const snapPoints = useMemo(() => ['40%', '40%'], []);

	const handlePresentModalPress = useCallback((comment: IComment) => {
		bottomSheetModalRef.current?.present();
		setLongPressedComment(comment);
	}, []);

	const handleSheetChanges = useCallback(() => {}, []);

	// other functions

	const handleSinglePressLikeButton = () => {
		if (currentUser && post) {
			if (isReactedByMe) {
				dispatch(updateReactOnPost(post.postId, '', currentUser.id as string));
			} else {
				dispatch(updateReactOnPost(post.postId, 'Like', currentUser.id as string));
			}
		}
	};

	const handleToggleReactionsContainer = () => {
		toggleReactionsContainer(prevState => !prevState);
	};

	const handleReaction = (reaction: ReactionType) => {
		if (currentUser && post) {
			toggleReactionsContainer(false);
			dispatch(updateReactOnPost(post.postId, reaction, currentUser.id as string));
		}
	};

	const handleAddComment = () => {
		if (commentText && post && currentUser) {
			dispatch(addComment(commentText, post.postId, currentUser));
		}
		setCommentText('');
		Keyboard.dismiss();
	};

	if (!post && !postLoading) {
		return null;
	}
	// TODO: May add commentLoading too or handle it in a different way.
	if (postLoading) {
		return <Spinner />;
	}

	return (
		<View style={styles.container}>
			{showReactionsContainer ? (
				<View style={styles.reactionsContainerStyle}>
					<ReactionsContainer handleReaction={handleReaction} />
				</View>
			) : null}

			<View style={styles.contentContainer}>
				{!comments.length ? (
					<Center>
						<EmptyContent emptyType='Comment' />
					</Center>
				) : (
					<View style={styles.commentsContainer}>
						<FlatList
							data={comments}
							keyExtractor={item => item.commentId}
							renderItem={renderItem}
							// for scroll to bottom, when keyboard appears
							ref={flatListRef}
							onContentSizeChange={() => flatListRef.current.scrollToEnd()}
							onLayout={() => flatListRef.current.scrollToEnd()}
						/>
					</View>
				)}
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					value={commentText}
					onChangeText={text => setCommentText(text)}
					style={styles.input}
					placeholder='Write a comment...'
					placeholderTextColor='#b3b3b3'
					autoFocus
					multiline
				/>
				{!commentText ? null : (
					<TouchableOpacity activeOpacity={0.6} onPress={handleAddComment}>
						<Ionicons
							name={Platform.OS === 'ios' ? 'ios-send' : 'md-send'}
							size={24}
							color={Colors.facebookPrimary}
						/>
					</TouchableOpacity>
				)}
			</View>

			{!currentUser || !longPressedComment ? null : (
				<BottomSheetModal
					ref={bottomSheetModalRef}
					index={1}
					snapPoints={snapPoints}
					onChange={handleSheetChanges}>
					<CommentBottomDrawer comment={longPressedComment} currentUser={currentUser} />
				</BottomSheetModal>
			)}
		</View>
	);
};

export default CommentsScreen;

const styles = StyleSheet.create({
	// header
	headerLeftContainer: {
		marginLeft: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerLeftText: {
		fontSize: 16,
		paddingRight: 4,
	},
	headerRightContainer: {
		marginRight: 10,
		padding: 10,
	},
	reactionIconStyle: {
		fontSize: 18,
	},
	// screen
	container: {
		margin: 20,
		flex: 1,
	},
	reactionsContainerStyle: {
		flex: 1,
		position: 'absolute',
		top: 30,
		zIndex: 5,
		width: '100%',
	},
	contentContainer: {
		flex: 1,
	},
	commentsContainer: {},
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
