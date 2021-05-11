import React from 'react';
import { TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons, Feather } from '@expo/vector-icons';

import { MenuNavProps } from '../../types';
import { RootState } from '../../redux/store';
import { signOut } from '../../redux/user/user.actions';

import { Text, View } from '../../components/Themed';
import MenuScreenCard from '../../components/menu/MenuScreenCard';
import DPcontainer from '../../components/UI/DPcontainer';

import MenuScreenData from '../../utils/menu-screen.data';
import Colors from '../../constants/Colors';

type MenuScreenProps = MenuNavProps<'Menu'>;

const MenuScreen: React.FC<MenuScreenProps> = ({ navigation }) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    Alert.alert('Logout Confirmation', 'Are you sure that you want to log out?', [
      { text: 'Yes', onPress: () => dispatch(signOut()) },
      { text: 'No' },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() =>
              navigation.navigate('Profile', { userId: currentUser!.id as string })
            }>
            <View style={styles.header}>
              <DPcontainer imageUri={currentUser?.profilePic?.imageUri} />
              <View style={styles.headerInfo}>
                <Text style={styles.headerUsername}>{currentUser?.displayName}</Text>
                <Text style={styles.headerSubtitle}>See your profile</Text>
              </View>
            </View>
          </TouchableOpacity>
        }
        data={MenuScreenData}
        renderItem={({ item }) => (
          <MenuScreenCard title={item.title} iconName={item.iconName} />
        )}
        numColumns={2}
        ListFooterComponent={
          <View style={styles.footer}>
            <TouchableOpacity activeOpacity={0.6} style={styles.footerItem}>
              <MaterialIcons name='more' size={24} color='white' />
              <Text style={styles.footerText}>See More</Text>
              <MaterialIcons name='expand-more' size={24} color='white' />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} style={styles.footerItem}>
              <Feather name='help-circle' size={24} color='white' />
              <Text style={styles.footerText}>Help & Support</Text>
              <MaterialIcons name='expand-more' size={24} color='white' />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} style={styles.footerItem}>
              <Feather name='settings' size={24} color='white' />
              <Text style={styles.footerText}>Settings & Privacy</Text>
              <MaterialIcons name='expand-more' size={24} color='white' />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.footerItem}
              onPress={handleSignOut}>
              <MaterialIcons name='logout' size={24} color='white' />
              <Text style={styles.footerText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerDpContainer: {
    width: 42,
    height: 42,
  },
  headerDp: {
    width: '100%',
    height: '100%',
    borderRadius: 21,
  },
  headerInfo: {
    marginLeft: 15,
  },
  headerUsername: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerSubtitle: {
    color: '#c5c5c5',
    fontSize: 14,
  },
  footer: {
    marginTop: 10,
    marginHorizontal: 5,
  },
  footerItem: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.cardBackground,
  },
  footerText: {
    paddingLeft: 15,
    borderWidth: 1,
    flex: 1,
    textAlignVertical: 'center',
  },
});
