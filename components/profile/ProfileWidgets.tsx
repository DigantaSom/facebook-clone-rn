import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { MenuStackParamList } from '../../types';

import { Text, View } from '../Themed';

import profileWidgets from '../../utils/profile-widgets';
import Colors from '../../constants/Colors';

type ProfileWidgetsProps = {
  navigation: StackNavigationProp<MenuStackParamList, 'Profile'>;
  userId: string;
  displayName: string;
};

const ProfileWidgets: React.FC<ProfileWidgetsProps> = ({
  navigation,
  userId,
  displayName,
}) => {
  return (
    <View style={styles.widgetContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        data={profileWidgets}
        renderItem={({ item: { title, Icon } }) => (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.widgetItem}
            onPress={() => {
              if (title === 'Photos') {
                navigation.navigate('AlbumsTab', { userId, displayName });
              }
            }}>
            <Icon />
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProfileWidgets;

const styles = StyleSheet.create({
  widgetContainer: {
    marginBottom: 5,
    marginHorizontal: -5,
  },
  widgetItem: {
    backgroundColor: Colors.grayButton,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  title: {
    paddingLeft: 7,
  },
});
