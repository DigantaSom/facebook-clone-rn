import React from 'react';
import { StyleSheet, View as ViewRN } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ReactionType } from '../../types';

import { Text } from '../Themed';

import Colors from '../../constants/Colors';

interface ReactionsContainerProps {
	handleReaction: (reactionType: ReactionType) => void;
}

const ReactionsContainer: React.FC<ReactionsContainerProps> = ({ handleReaction }) => {
	return (
		<ViewRN style={styles.container}>
			<ViewRN style={styles.reactionEmojies}>
				<TouchableOpacity activeOpacity={0.4} onPress={() => handleReaction('Like')}>
					<Text style={styles.reaction}>👍🏻</Text>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.4} onPress={() => handleReaction('Love')}>
					<Text style={styles.reaction}>❤️</Text>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.4} onPress={() => handleReaction('Haha')}>
					<Text style={styles.reaction}>😆</Text>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.4} onPress={() => handleReaction('Wow')}>
					<Text style={styles.reaction}>😯</Text>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.4} onPress={() => handleReaction('Sad')}>
					<Text style={styles.reaction}>😢</Text>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.4} onPress={() => handleReaction('Angry')}>
					<Text style={styles.reaction}>😡</Text>
				</TouchableOpacity>
			</ViewRN>
		</ViewRN>
	);
};

export default ReactionsContainer;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		zIndex: 1,
		top: -40,
	},
	reactionEmojies: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.dark.cardBackground,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 25,
		borderWidth: 1,
		borderColor: '#f2f2f2',
	},
	reaction: {
		fontSize: 25,
		paddingHorizontal: 5,
	},
});
