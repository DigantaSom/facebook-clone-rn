import React from 'react';
import { StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { RootNavProps } from '../types';

import { View } from '../components/Themed';
import Spinner from '../components/UI/Spinner';
import ProfileItem from '../components/profile/ProfileSearchItem';

type SearchScreenProps = RootNavProps<'Search'>;

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const { profiles, loading } = useSelector((state: RootState) => state.profile);

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      {profiles.map(profile => (
        <ProfileItem key={profile.userId} profile={profile} navigation={navigation} />
      ))}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
