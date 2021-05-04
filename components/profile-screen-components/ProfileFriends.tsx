import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Text, View } from '../Themed';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

const ProfileFriends = () => {
  const friends_placeholder = [
    {
      id: 1,
      name: 'Friend 1',
    },
    {
      id: 2,
      name: 'Friend 2',
    },
    {
      id: 3,
      name: 'Friend 3',
    },
    {
      id: 4,
      name: 'Friend 4 Friend 4 Friend 4 Friend 4',
    },
    {
      id: 5,
      name: 'Friend 5',
    },
    {
      id: 6,
      name: 'Friend 6',
    },
    {
      id: 7,
      name: 'Friend 7',
    },
  ];

  return (
    <View style={styles.profileFriendsContainer}>
      <View style={styles.friendsTop}>
        <View style={styles.top}>
          <Text style={styles.title}>Friends</Text>
          <Text style={styles.findFriends}>Find Friends</Text>
        </View>
        <Text style={styles.friendsCount}>1,392 friends</Text>
      </View>

      <View style={styles.friends}>
        {friends_placeholder.slice(0, 3).map(friend => (
          <TouchableOpacity key={friend.id} style={styles.friendItem} activeOpacity={0.7}>
            <View style={styles.friendImageContainer}>
              <Image
                source={require('../../assets/images/no-dp.jpg')}
                style={styles.friendImage}
              />
            </View>
            <Text style={styles.friendName} numberOfLines={2}>
              {friend.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.friends}>
        {friends_placeholder.slice(3, 6).map(friend => (
          <TouchableOpacity key={friend.id} style={styles.friendItem} activeOpacity={0.7}>
            <View style={styles.friendImageContainer}>
              <Image
                source={require('../../assets/images/no-dp.jpg')}
                style={styles.friendImage}
              />
            </View>
            <Text style={styles.friendName} numberOfLines={2}>
              {friend.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.seeAllFriends_button} activeOpacity={0.8}>
        <Text>See All Friends</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileFriends;

const styles = StyleSheet.create({
  profileFriendsContainer: {
    marginBottom: 10,
  },
  friendsTop: {
    paddingBottom: 15,
    // backgroundColor: Colors.dark.cardBackground,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: Colors.dark.cardBackground,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  findFriends: {
    color: Colors.facebookSecondary,
  },
  friendsCount: {
    fontSize: 16,
    color: Colors.dark.tabIconDefault,
  },
  friends: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: Colors.dark.cardBackground,
  },
  friendItem: {
    width: Layout.window.width / 3.5,
    height: 150,
    marginBottom: 10,
  },
  friendImageContainer: {
    height: '70%',
    borderRadius: Layout.default_borderRadius,
    marginBottom: 5,
    overflow: 'hidden',
  },
  friendImage: {
    width: '100%',
    height: '100%',
  },
  friendName: {
    height: '30%',
  },
  seeAllFriends_button: {
    backgroundColor: Colors.grayButton,
    paddingVertical: 7,
    borderRadius: Layout.default_borderRadius,
    alignItems: 'center',
    // overflow: 'hidden',
  },
});
