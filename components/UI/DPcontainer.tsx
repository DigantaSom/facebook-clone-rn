import React from 'react';
import { StyleSheet, Image, View as ViewRN } from 'react-native';

import { SizeType } from '../../types';

interface DPcontainerProps {
	imageUri?: string;
	size?: SizeType;
}

const DPcontainer: React.FC<DPcontainerProps> = ({ imageUri, size }) => {
	let dpContainerStyle = {
		width: 42,
		height: 42,
	};
	let dpStyle = {
		borderRadius: 21,
	};

	if (size === 'small') {
		dpContainerStyle.width = 30;
		dpContainerStyle.height = 30;
		dpStyle.borderRadius = 15;
	}

	return (
		<ViewRN style={dpContainerStyle}>
			<Image
				source={imageUri ? { uri: imageUri } : require('../../assets/images/no-dp.jpg')}
				style={[styles.dp, dpStyle]}
			/>
		</ViewRN>
	);
};

export default DPcontainer;

const styles = StyleSheet.create({
	dp: {
		width: '100%',
		height: '100%',
	},
});
