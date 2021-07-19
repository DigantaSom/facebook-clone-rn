import React from 'react';
import { StyleSheet } from 'react-native';
import { Fontisto, Ionicons, FontAwesome } from '@expo/vector-icons';

import { Text, View } from '../Themed';
import Colors from '../../constants/Colors';

import { EmptyContentType } from '../../types';

interface EmptyContentProps {
	emptyType: EmptyContentType;
}

const EmptyContent: React.FC<EmptyContentProps> = ({ emptyType }) => {
	return (
		<View style={styles.noContent_container}>
			{emptyType === 'Photo' ? (
				<Fontisto name='photograph' size={70} color={Colors.grayText} />
			) : null}

			{emptyType === 'Album' ? (
				<Ionicons name='albums' size={70} color={Colors.grayText} />
			) : null}

			{emptyType === 'Comment' ? (
				<FontAwesome name='comments' size={70} color={Colors.grayText} />
			) : null}

			<Text style={[styles.noContentText, { fontWeight: 'bold' }]}>
				No {emptyType}s to show
			</Text>
			{emptyType === 'Comment' ? (
				<Text style={[styles.noContentText, { fontSize: 15 }]}>
					Be the first to comment
				</Text>
			) : null}
		</View>
	);
};

export default EmptyContent;

const styles = StyleSheet.create({
	noContent_container: {
		alignItems: 'center',
	},
	noContentText: {
		marginTop: 15,
		color: Colors.grayText,
		fontSize: 18,
	},
});
