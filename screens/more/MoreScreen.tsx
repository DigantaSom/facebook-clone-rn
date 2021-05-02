import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { Text, View } from '../../components/Themed';
import { signOut } from '../../redux/user/user.actions';

const MoreScreen = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => dispatch(signOut());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MoreScreen</Text>

      <Button title='Log out' onPress={handleSignOut} />
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
