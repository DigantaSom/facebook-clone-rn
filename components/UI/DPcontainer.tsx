import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { View } from '../Themed';

interface DPcontainerProps {
  imageUri?: string;
}

const DPcontainer: React.FC<DPcontainerProps> = ({ imageUri }) => {
  return (
    <View style={styles.dpContainer}>
      <Image
        source={imageUri ? { uri: imageUri } : require('../../assets/images/no-dp.jpg')}
        style={styles.dp}
      />
    </View>
  );
};

export default DPcontainer;

const styles = StyleSheet.create({
  dpContainer: {
    width: 42,
    height: 42,
  },
  dp: {
    width: '100%',
    height: '100%',
    borderRadius: 21,
  },
});
