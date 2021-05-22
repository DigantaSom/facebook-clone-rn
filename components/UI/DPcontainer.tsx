import React from 'react';
import { StyleSheet, Image, View as ViewRN } from 'react-native';

interface DPcontainerProps {
  imageUri?: string;
}

const DPcontainer: React.FC<DPcontainerProps> = ({ imageUri }) => {
  return (
    <ViewRN style={styles.dpContainer}>
      <Image
        source={imageUri ? { uri: imageUri } : require('../../assets/images/no-dp.jpg')}
        style={styles.dp}
      />
    </ViewRN>
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
