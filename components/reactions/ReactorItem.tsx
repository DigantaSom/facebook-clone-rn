import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { IReaction, RootStackParamList } from '../../types';

import { View, Text } from '../Themed';
import DPcontainer from '../UI/DPcontainer';

import Colors from '../../constants/Colors';

interface ReactorItemProps {
	reactionItem: IReaction;
	navigation: StackNavigationProp<RootStackParamList, 'ReactionsTopTab'>;
}

const ReactorItem: React.FC<ReactorItemProps> = ({
	reactionItem: { reaction, reactorId, reactorDisplayName, reactorProfilePicUri },
	navigation,
}) => {
	let reactionIcon = (
		<AntDesign
			name='like1'
			size={22}
			color={Colors.facebookPrimary}
			style={{ paddingHorizontal: 5 }}
		/>
	);

	if (reaction === 'Love') {
		reactionIcon = <Text style={styles.reactionText}>❤️</Text>;
	} else if (reaction === 'Haha') {
		reactionIcon = <Text style={styles.reactionText}>😆</Text>;
	} else if (reaction === 'Wow') {
		reactionIcon = <Text style={styles.reactionText}>😯</Text>;
	} else if (reaction === 'Sad') {
		reactionIcon = <Text style={styles.reactionText}>😢</Text>;
	} else if (reaction === 'Angry') {
		reactionIcon = <Text style={styles.reactionText}>😡</Text>;
	}

	return (
		<View style={styles.container}>
			<View style={styles.left}>
				<DPcontainer imageUri={reactorProfilePicUri} />
				<View style={styles.reactionIconContainer}>{reactionIcon}</View>
			</View>

			<View style={styles.right}>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => navigation.navigate('Profile', { userId: reactorId })}>
					<Text style={styles.reactorName}>{reactorDisplayName}</Text>
				</TouchableOpacity>
				{/* TODO: add friend / mention button */}
			</View>
		</View>
	);
};

export default ReactorItem;

const styles = StyleSheet.create({
	container: {
		padding: 5,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 15,
	},
	left: {
		marginRight: 25,
	},
	reactionIconContainer: {
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		zIndex: 1,
		// the below values are because of DPcontainer's default dimensions
		top: 20,
		right: -15,
		height: 35,
	},
	reactionText: {
		fontSize: 22,
		paddingHorizontal: 5,
	},
	right: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-between',
	},
	reactorName: {},
});
