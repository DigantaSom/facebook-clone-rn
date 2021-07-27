import React, { useState, useEffect, useLayoutEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchSinglePost } from '../../redux/post/post.actions';
import { fetchSingleComment } from '../../redux/comment/comment.actions';
import { fetchSingleReply } from '../../redux/reply/reply.actions';

import { RootNavProps, ContentType, IReaction } from '../../types';

import Spinner from '../../components/UI/Spinner';
import ReactorItem from '../../components/reactions/ReactorItem';

type AllReactionsScreenProps = RootNavProps<'ReactionsTopTab'>;

const AllReactionsScreen: React.FC<AllReactionsScreenProps> = ({ navigation, route }) => {
	const [reactionsCount, setReactionsCount] = useState<number>(0);
	const [contentType, setContentType] = useState<ContentType>('Post');

	const dispatch = useDispatch();

	const { post, loading: postLoading } = useSelector((state: RootState) => state.post);
	const { comment, loading: commentLoading } = useSelector(
		(state: RootState) => state.comment,
	);
	const { reply, loading: replyLoading } = useSelector((state: RootState) => state.reply);

	useEffect(() => {
		if (route.params.contentType === 'Post') {
			dispatch(fetchSinglePost(route.params.postId));
		} else if (route.params.contentType === 'Comment' && route.params.commentId) {
			dispatch(fetchSingleComment(route.params.postId, route.params.commentId));
		} else if (
			route.params.contentType === 'Reply' &&
			route.params.commentId &&
			route.params.replyId
		) {
			dispatch(
				fetchSingleReply(
					route.params.postId,
					route.params.commentId,
					route.params.replyId,
				),
			);
		}
	}, [
		route.params.contentType,
		route.params.postId,
		route.params.commentId,
		route.params.replyId,
	]);

	useEffect(() => {
		if (route.params.contentType === 'Post' && post) {
			setContentType('Post');
			setReactionsCount(post.reactions.length);
		} else if (route.params.contentType === 'Comment' && comment) {
			setContentType('Comment');
			setReactionsCount(comment.commentReactions.length);
		} else if (route.params.contentType === 'Reply' && reply) {
			setContentType('Reply');
			setReactionsCount(reply.replyReactions.length);
		}
	}, [route.params.contentType, post, comment, reply]);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: `All ${reactionsCount}`,
		});
	}, [reactionsCount]);

	if (postLoading || commentLoading || replyLoading) {
		return <Spinner />;
	}
	if (
		(contentType === 'Post' && !post && !postLoading) ||
		(contentType === 'Comment' && !comment && !commentLoading) ||
		(contentType === 'Reply' && !reply && !replyLoading)
	) {
		return null;
	}

	let itemReactions: IReaction[] | undefined = [];
	if (contentType === 'Post') {
		itemReactions = post?.reactions;
	} else if (contentType === 'Comment') {
		itemReactions = comment?.commentReactions;
	} else if (contentType === 'Reply') {
		itemReactions = reply?.replyReactions;
	}

	return !itemReactions ? null : (
		<FlatList
			data={itemReactions}
			keyExtractor={item => item.reactorId}
			renderItem={({ item }) => (
				<ReactorItem reactionItem={item} navigation={navigation} />
			)}
			contentContainerStyle={styles.container}
		/>
	);
};

export default AllReactionsScreen;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
	},
});
