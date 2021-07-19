import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../Themed';

interface CenterProps {
	style?: object;
}

const Center: React.FC<CenterProps> = ({ style, children }) => {
	return <View style={[styles.center, style]}>{children}</View>;
};

export default Center;

const styles = StyleSheet.create({
	center: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
});
