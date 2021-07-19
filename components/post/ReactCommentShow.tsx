import React from 'react';
import { StyleSheet, View as ViewRN } from 'react-native';

import { Text } from '../Themed';

import { IComment, IReaction } from '../../types';

interface ReactCommentShowProps {
	reactions: IReaction[];
	comments: IComment[];
}

const ReactCommentShow: React.FC<ReactCommentShowProps> = ({ reactions, comments }) => {
	return (
		<ViewRN style={styles.reactCommentContainer}>
			<Text style={styles.reactCommentText}>
				{reactions.length ? (
					<Text>
						{reactions.length}{' '}
						{reactions.length === 1 ? <Text>React</Text> : <Text>Reacts</Text>}
					</Text>
				) : null}
			</Text>
			<Text style={styles.reactCommentText}>
				{comments.length ? (
					<Text>
						{comments.length}{' '}
						{comments.length === 1 ? <Text>Comment</Text> : <Text>Comments</Text>}
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
	},
	reactCommentText: {
		fontSize: 12,
		fontWeight: '700',
	},
});
