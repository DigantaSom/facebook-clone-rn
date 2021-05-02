import React from 'react';
import { ActivityIndicator } from 'react-native';

import Center from './Center';

import Colors from '../../constants/Colors';

const Spinner = () => {
  return (
    <Center>
      <ActivityIndicator color={Colors.facebookPrimary} size='large' />
    </Center>
  );
};

export default Spinner;
