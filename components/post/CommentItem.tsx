import React from 'react';
import DayJS from 'dayjs';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { IComment, RootStackParamList } from '../../types';

import { View, Text } from '../Themed';
import DPcontainer from '../UI/DPcontainer';

import Colors from '../../constants/Colors';

interface CommentItemProps {
	comment: IComment;
	navigation: StackNavigationProp<RootStackParamList, 'Comments'>;
	handleCommentLongPress: (comment: IComment) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
	comment,
	navigation,
	handleCommentLongPress,
}) => {
	const onLongPress = () => {
		handleCommentLongPress(comment);
	};

	return (
		<TouchableOpacity
			style={styles.commentItem}
			activeOpacity={0.5}
			onLongPress={onLongPress}>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => navigation.navigate('Profile', { userId: comment.creator.id })}>
				<DPcontainer imageUri={comment.creator.profilePicUri} />
			</TouchableOpacity>

			<View style={styles.commentContainer}>
				<View style={styles.box}>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() =>
							navigation.navigate('Profile', { userId: comment.creator.id })
						}>
						<Text style={styles.creatorName}>{comment.creator.displayName}</Text>
					</TouchableOpacity>
					<Text>{comment.body}</Text>
				</View>

				<View style={styles.commentInfo}>
					{comment.modifiedAt ? (
						<>
							<Text style={styles.infoText}>
								{DayJS(comment.modifiedAt).format("MMM DD 'YY")}
							</Text>
							<Text style={styles.infoText}>Edited</Text>
						</>
					) : (
						<Text style={styles.infoText}>
							{DayJS(comment.createdAt).format("MMM DD 'YY")}
						</Text>
					)}
					<Text style={styles.infoText}>Like</Text>
					<Text style={styles.infoText}>Reply</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default CommentItem;

const styles = StyleSheet.create({
	commentItem: {
		flexDirection: 'row',
		marginVertical: 8,
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
	commentInfo: {
		paddingHorizontal: 7,
		flexDirection: 'row',
		alignItems: 'center',
	},
	infoText: {
		paddingHorizontal: 7,
		color: Colors.grayText,
		fontWeight: 'bold',
		fontSize: 13,
	},
});
