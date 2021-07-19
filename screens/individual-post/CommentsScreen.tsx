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
	addComment,
} from '../../redux/post/post.actions';

import { RootNavProps } from '../../types';

import { Text, View } from '../../components/Themed';
import Center from '../../components/UI/Center';
import EmptyContent from '../../components/UI/EmptyContent';

import Colors from '../../constants/Colors';
import CommentItem from '../../components/post/CommentItem';

type CommentsScreenProps = RootNavProps<'Comments'>;

const CommentsScreen: React.FC<CommentsScreenProps> = ({ navigation, route }) => {
	const [commentText, setCommentText] = useState('');
	const flatListRef = useRef<any>(null);

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
					onPress={() => {}}>
					<AntDesign name='like2' size={22} color={Colors.dark.tabIconDefault} />
				</TouchableOpacity>
			),
		});
	}, [navigation, postLoading, post, post?.reactions]);

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
		marginRight: 20,
	},
	// screen
	container: {
		margin: 20,
		flex: 1,
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
