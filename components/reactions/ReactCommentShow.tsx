import React from 'react';
import { StyleSheet, View as ViewRN } from 'react-native';

import { Text } from '../Themed';

interface ReactCommentShowProps {
	reactionCount: number;
	commentCount: number;
}

const ReactCommentShow: React.FC<ReactCommentShowProps> = ({
	reactionCount,
	commentCount,
}) => {
	return (
		<ViewRN style={styles.reactCommentContainer}>
			<Text style={styles.reactCommentText}>
				{reactionCount > 0 ? (
					<Text>
						{reactionCount}{' '}
						{reactionCount === 1 ? <Text>Reaction</Text> : <Text>Reactions</Text>}
					</Text>
				) : null}
			</Text>
			<Text style={styles.reactCommentText}>
				{commentCount > 0 ? (
					<Text>
						{commentCount}{' '}
						{commentCount === 1 ? <Text>Comment</Text> : <Text>Comments</Text>}
					</Text>
				) : null}
			</Text>
		</ViewRN>
	);
};

export default ReactCommentShow;

const styles = StyleSheet.create({
	reactCommentContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 15,
		paddingHorizontal: 10, // same as padding of postTitle
	},
	reactCommentText: {
		fontSize: 12,
		fontWeight: '700',
	},
});
