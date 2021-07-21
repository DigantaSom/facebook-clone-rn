import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { editComment, fetchSingleComment } from '../../redux/comment/comment.actions';

import { RootNavProps } from '../../types';

import { Text, View } from '../../components/Themed';
import Spinner from '../../components/UI/Spinner';
import DPcontainer from '../../components/UI/DPcontainer';

import Colors from '../../constants/Colors';

type EditCommentScreenProps = RootNavProps<'EditComment'>;

const EditCommentScreen: React.FC<EditCommentScreenProps> = ({ navigation, route }) => {
	const { postId, commentId } = route.params;

	const [updatedBody, setUpdatedBody] = useState<string>('');
	const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState<boolean>(true);

	const dispatch = useDispatch();
	const { comment, loading, actionLoading } = useSelector(
		(state: RootState) => state.comment,
	);
	const { currentUser } = useSelector((state: RootState) => state.user);

	const isMyComment = comment?.creator.id === currentUser?.id;

	useEffect(() => {
		dispatch(fetchSingleComment(postId, commentId));
	}, [dispatch, fetchSingleComment, postId, commentId]);

	useEffect(() => {
		if (comment) {
			if (loading || !comment.body) {
				setUpdatedBody('');
			} else {
				setUpdatedBody(comment.body);
			}
		}
	}, [comment, loading, comment?.body]);

	useEffect(() => {
		if (comment?.body === updatedBody) {
			setIsUpdateButtonDisabled(true);
		} else {
			setIsUpdateButtonDisabled(false);
		}
	}, [comment?.body, updatedBody]);

	if (loading) {
		return <Spinner />;
	}
	if (!comment) {
		navigation.goBack();
		return null;
	}

	const onCancel = () => {
		navigation.goBack();
	};

	const onUpdate = () => {
		if (!isMyComment || updatedBody === '') {
			return;
		}
		if (currentUser) {
			dispatch(editComment(postId, commentId, updatedBody, currentUser, navigation));
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => navigation.navigate('Profile', { userId: comment.creator.id })}>
					<DPcontainer imageUri={comment.creator.profilePicUri} />
				</TouchableOpacity>

				<View style={styles.commentContainer}>
					<View style={styles.box}>
						<TextInput
							style={styles.input}
							autoFocus
							value={updatedBody}
							onChangeText={text => setUpdatedBody(text)}
						/>
					</View>
				</View>
			</View>

			<View style={styles.buttonsContainer}>
				<TouchableOpacity
					activeOpacity={0.7}
					style={[styles.button, styles.cancelButton]}
					onPress={onCancel}>
					<Text>Cancel</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={isUpdateButtonDisabled ? 1 : 0.7}
					style={[
						styles.button,
						isUpdateButtonDisabled ? styles.updateButton_disabled : styles.updateButton,
					]}
					onPress={onUpdate}>
					<Text style={isUpdateButtonDisabled ? styles.text_disabled : null}>Update</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default EditCommentScreen;

const styles = StyleSheet.create({
	container: {
		margin: 20,
	},
	content: {
		flexDirection: 'row',
	},
	commentContainer: {
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
	input: {
		color: 'white',
	},
	buttonsContainer: {
		marginTop: 20,
		flexDirection: 'row',
		alignSelf: 'flex-end',
	},
	button: {
		padding: 8,
		borderRadius: 5,
	},
	cancelButton: {
		backgroundColor: Colors.defaultCommentBoxBackground,
	},
	updateButton: {
		backgroundColor: Colors.facebookPrimary,
		marginLeft: 10,
	},
	updateButton_disabled: {
		backgroundColor: Colors.defaultCommentBoxBackground,
		marginLeft: 10,
	},
	text_disabled: {
		color: '#C5C5C5',
	},
});
