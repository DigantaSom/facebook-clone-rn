import React from 'react';
import { ActivityIndicator } from 'react-native';

import Center from './Center';

import Colors from '../../constants/Colors';

interface SpinnerProps {
	size?: 'large' | 'small';
	color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size, color }) => {
	return (
		<Center style={{ backgroundColor: 'transparent' }}>
			<ActivityIndicator
				color={color ? color : Colors.facebookPrimary}
				size={size ? size : 'large'}
			/>
		</Center>
	);
};

export default Spinner;
