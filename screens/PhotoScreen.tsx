import React, { useLayoutEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';

import { RootNavProps } from '../types';

type PhotoScreenProps = RootNavProps<'Photo'>;

const PhotoScreen: React.FC<PhotoScreenProps> = ({ navigation, route }) => {
  const imageUri = route.params.imageUri;

  const [isMyPhoto] = useState(true); // TODO: check with authentication and redux.

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightIcons}>
          {isMyPhoto && (
            <>
              <AntDesign name='tago' size={24} color='white' style={styles.icon} />
              <MaterialIcons name='place' size={24} color='white' style={styles.icon} />
            </>
          )}
          <Feather name='more-vertical' size={24} color='white' style={styles.icon} />
        </View>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <View style={styles.info}>
        <View style={styles.captionContainer}>
          <Text style={styles.username}>Diganta Som</Text>
        </View>
      </View>
    </View>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    paddingRight: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 400,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    left: 0,
  },
  captionContainer: {},
  username: {
    fontWeight: 'bold',
  },
});
