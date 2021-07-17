import React, { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { RootNavProps } from '../../types';

import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';

type PeopleWhoReactedScreenProps = RootNavProps<'PeopleWhoReacted'>;

const PeopleWhoReactedScreen: React.FC<PeopleWhoReactedScreenProps> = ({
	navigation,
}) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Ionicons
					name='md-search'
					size={24}
					color={Colors.dark.tabIconDefault}
					style={styles.icon}
				/>
			),
		});
	}, []);

	return (
		<View style={styles.container}>
			<Text>PeopleWhoReactedScreen</Text>
		</View>
	);
};

export default PeopleWhoReactedScreen;

const styles = StyleSheet.create({
	icon: {
		paddingRight: 20,
	},
	container: {
		margin: 20,
	},
});
