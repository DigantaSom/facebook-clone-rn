import React from 'react';
import { ActivityIndicator } from 'react-native';

import Center from './Center';

import Colors from '../../constants/Colors';

interface SpinnerProps {
	size?: 'large' | 'small';
}

const Spinner: React.FC<SpinnerProps> = ({ size }) => {
	return (
		<Center style={{ backgroundColor: 'transparent' }}>
			<ActivityIndicator color={Colors.facebookPrimary} size={size ? size : 'large'} />
		</Center>
	);
};

export default Spinner;
