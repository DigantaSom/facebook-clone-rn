import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Platform,
	FlatList,
	Keyboard,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
	fetchSinglePost,
	fetchAllComments,
	updateReactOnPost,
	addComment,
} from '../../redux/post/post.actions';

import { ReactionType, RootNavProps } from '../../types';

import { Text, View } from '../../components/Themed';
import ReactionsContainer from '../../components/post/ReactionsContainer';
import Center from '../../components/UI/Center';
import EmptyContent from '../../components/UI/EmptyContent';
import CommentItem from '../../components/post/CommentItem';

import Colors from '../../constants/Colors';

type CommentsScreenProps = RootNavProps<'Comments'>;

const CommentsScreen: React.FC<CommentsScreenProps> = ({ navigation, route }) => {
	const flatListRef = useRef<any>(null);
	const [commentText, setCommentText] = useState<string>('');
	const [showReactionsContainer, toggleReactionsContainer] = useState<boolean>(false);

	const { postId } = route.params;

	const dispatch = useDispatch();
	const {
		post,
		loading: postLoading,
		commentLoading,
	} = useSelector((state: RootState) => state.post);
	const { currentUser } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		dispatch(fetchSinglePost(postId));
	}, [fetchSinglePost, postId]);

	useEffect(() => {
		if (post) {
			dispatch(fetchAllComments(post.postId));
		}
	}, [post, post?.postId, fetchAllComments]);

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

	if (!post) {
		return null;
	}

	return (
		<View style={styles.container}>
			{showReactionsContainer ? (
				<View style={styles.reactionsContainerStyle}>
					<ReactionsContainer handleReaction={handleReaction} />
				</View>
			) : null}

			<View style={styles.contentContainer}>
				{!post.comments.length ? (
					<Center>
						<EmptyContent emptyType='Comment' />
					</Center>
				) : (
					<View style={styles.commentsContainer}>
						<FlatList
							data={post.comments}
							keyExtractor={item => item.commentId}
							renderItem={({ item }) => (
								<CommentItem comment={item} navigation={navigation} />
							)}
							// for scroll to bottom, when keyboard appears
							ref={flatListRef}
							onContentSizeChange={() => flatListRef.current.scrollToEnd()}
							onLayout={() => flatListRef.current.scrollToEnd()}
							// optimization (TODO:)
							initialNumToRender={7}
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
		borderWidth: 1,
		borderColor: 'green',
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
		// TODO: add elevation
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
