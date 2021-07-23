import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchSingleReply, editReply } from '../../redux/reply/reply.actions';

import { RootNavProps } from '../../types';

import { Text, View } from '../../components/Themed';
import Spinner from '../../components/UI/Spinner';
import DPcontainer from '../../components/UI/DPcontainer';

import Colors from '../../constants/Colors';

type EditReplyScreenProps = RootNavProps<'EditReply'>;

const EditReplyScreen: React.FC<EditReplyScreenProps> = ({ navigation, route }) => {
	const { postId, commentId, replyId } = route.params;

	const [updatedBody, setUpdatedBody] = useState<string>('');
	const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState<boolean>(true);

	const dispatch = useDispatch();
	const { reply, loading, actionLoading } = useSelector(
		(state: RootState) => state.reply,
	);
	const { currentUser } = useSelector((state: RootState) => state.user);

	const isMyReply = reply?.creator.id === currentUser?.id;

	useEffect(() => {
		dispatch(fetchSingleReply(postId, commentId, replyId));
	}, [dispatch, fetchSingleReply, postId, commentId, replyId]);

	useEffect(() => {
		if (reply) {
			if (loading || !reply.body) {
				setUpdatedBody('');
			} else {
				setUpdatedBody(reply.body);
			}
		}
	}, [reply, loading, reply?.body]);

	useEffect(() => {
		if (reply?.body === updatedBody) {
			setIsUpdateButtonDisabled(true);
		} else {
			setIsUpdateButtonDisabled(false);
		}
	}, [reply?.body, updatedBody]);

	const onCancel = () => {
		navigation.goBack();
	};

	const onUpdate = () => {
		if (!isMyReply || updatedBody === '' || actionLoading) {
			return;
		}
		if (currentUser) {
			dispatch(
				editReply(postId, commentId, replyId, updatedBody, currentUser, navigation),
			);
		}
	};

	if (loading) {
		return <Spinner />;
	}
	if (!reply) {
		navigation.goBack();
		return null;
	}

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => navigation.navigate('Profile', { userId: reply.creator.id })}>
					<DPcontainer imageUri={reply.creator.profilePicUri} />
				</TouchableOpacity>

				<View style={styles.replyContainer}>
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
					activeOpacity={isUpdateButtonDisabled || actionLoading ? 1 : 0.7}
					style={[
						styles.button,
						isUpdateButtonDisabled ? styles.updateButton_disabled : styles.updateButton,
					]}
					onPress={onUpdate}>
					<Text style={isUpdateButtonDisabled ? styles.text_disabled : null}>
						{!isUpdateButtonDisabled && actionLoading ? (
							<Spinner size='small' color='white' />
						) : (
							<Text>Update</Text>
						)}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default EditReplyScreen;

const styles = StyleSheet.create({
	container: {
		margin: 20,
	},
	content: {
		flexDirection: 'row',
	},
	replyContainer: {
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
