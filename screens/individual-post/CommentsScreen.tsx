import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { RootNavProps } from '../../types';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchSinglePost } from '../../redux/post/post.actions';

import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';

type CommentsScreenProps = RootNavProps<'Comments'>;

const CommentsScreen: React.FC<CommentsScreenProps> = ({ navigation, route }) => {
	const { postId } = route.params;
	const dispatch = useDispatch();
	const { post, loading: postLoading } = useSelector((state: RootState) => state.post);

	useEffect(() => {
		dispatch(fetchSinglePost(postId));
	}, [fetchSinglePost, postId]);

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

	return (
		<View style={styles.container}>
			<Text>CommentsScreen</Text>
		</View>
	);
};

export default CommentsScreen;

const styles = StyleSheet.create({
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
	container: {
		margin: 20,
	},
});
