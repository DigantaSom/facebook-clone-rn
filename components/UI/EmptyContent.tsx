import React from 'react';
import { StyleSheet } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';

import { Text, View } from '../Themed';
import Colors from '../../constants/Colors';

import { EmptyContentType } from '../../types';

interface EmptyContentProps {
  emptyType: EmptyContentType;
}

const EmptyContent: React.FC<EmptyContentProps> = ({ emptyType }) => {
  return (
    <View style={styles.noPhoto_container}>
      {emptyType === 'photo' ? (
        <Fontisto name='photograph' size={70} color={Colors.grayText} />
      ) : null}
      {emptyType === 'album' ? (
        <Ionicons name='albums' size={70} color={Colors.grayText} />
      ) : null}

      <Text style={styles.noPhotoText}>No {emptyType}s to show</Text>
    </View>
  );
};

export default EmptyContent;

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
