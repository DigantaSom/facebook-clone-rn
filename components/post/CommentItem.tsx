import React from 'react';
import DayJS from 'dayjs';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { IComment, RootStackParamList } from '../../types';
import { IUser } from '../../redux/user/user.types';

import { View, Text } from '../Themed';
import DPcontainer from '../UI/DPcontainer';

import Colors from '../../constants/Colors';

interface CommentItemProps {
	comment: IComment;
	navigation: StackNavigationProp<RootStackParamList, 'Comments'>;
}

const CommentItem: React.FC<CommentItemProps> = ({
	comment: { creator, body, createdAt },
	navigation,
}) => {
	return (
		<View style={styles.commentItem}>
			<DPcontainer imageUri={creator.profilePicUri} />

			<View style={styles.commentContainer}>
				<View style={styles.box}>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => navigation.navigate('Profile', { userId: creator.id })}>
						<Text style={styles.creatorName}>{creator.displayName}</Text>
					</TouchableOpacity>
					<Text>{body}</Text>
				</View>

				<View style={styles.commentInfo}>
					<Text style={styles.infoText}>{DayJS(createdAt).format("MMM DD 'YY")}</Text>
					<Text style={styles.infoText}>Like</Text>
					<Text style={styles.infoText}>Reply</Text>
				</View>
			</View>
		</View>
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
