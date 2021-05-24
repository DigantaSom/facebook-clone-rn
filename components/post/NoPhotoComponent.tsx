import React from 'react';
import { StyleSheet } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

import { Text, View } from '../Themed';
import Colors from '../../constants/Colors';

const NoPhotoComponent = () => {
  return (
    <View style={styles.noPhoto_container}>
      <Fontisto name='photograph' size={70} color={Colors.grayText} />
      <Text style={styles.noPhotoText}>No photos to show</Text>
    </View>
  );
};

export default NoPhotoComponent;

const styles = StyleSheet.create({
  noPhoto_container: {
    alignItems: 'center',
  },
  noPhotoText: {
    marginTop: 15,
    color: Colors.grayText,
    fontSize: 16,
  },
});
