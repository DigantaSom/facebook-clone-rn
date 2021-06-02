import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { RadioButton } from 'react-native-paper';

import { MenuNavProps } from '../../types';
import { RelationshipStatusType } from '../../redux/profile/profile.types';

import { addOrEditProfileAbout } from '../../redux/profile/profile.actions';

import { Text } from '../../components/Themed';
import HeaderActionButton from '../../components/UI/HeaderActionButton';
import Spinner from '../../components/UI/Spinner';

import { RootState } from '../../redux/store';
import Colors from '../../constants/Colors';

type AddOrEditProfileAboutScreenProps = MenuNavProps<'AddOrEditProfileAbout'>;

const AddOrEditProfileAboutScreen: React.FC<AddOrEditProfileAboutScreenProps> = ({
  navigation,
  route,
}) => {
  const { isEdit, currentUser, profileAbout } = route.params;

  const { loading: profileLoading, error } = useSelector(
    (state: RootState) => state.profile,
  );

  const [livesInLocation, setLivesInLocation] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [relationshipStatus, setRelationshipStatus] =
    useState<RelationshipStatusType>('');

  const dispatch = useDispatch();

  useEffect(() => {
    // prepopulate livesInLocation
    if (
      profileLoading ||
      !profileAbout ||
      !profileAbout.location ||
      !profileAbout.location.livesIn
    ) {
      setLivesInLocation('');
    } else {
      setLivesInLocation(profileAbout.location.livesIn);
    }
    // prepopulate fromLocation
    if (
      profileLoading ||
      !profileAbout ||
      !profileAbout.location ||
      !profileAbout.location.from
    ) {
      setFromLocation('');
    } else {
      setFromLocation(profileAbout.location.from);
    }
    // prepopulate relationshipStatus
    if (profileLoading || !profileAbout || !profileAbout.relationshipStatus) {
      setRelationshipStatus('');
    } else {
      setRelationshipStatus(profileAbout.relationshipStatus);
    }
  }, [
    profileLoading,
    profileAbout,
    profileAbout?.location,
    profileAbout?.location?.livesIn,
    profileAbout?.location?.from,
    profileAbout?.relationshipStatus,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${isEdit ? 'Edit' : 'Add'} Profile`,
      headerRight: () => (
        <HeaderActionButton
          actionType={isEdit ? 'Edit' : 'Save'}
          onPressAction={() => {
            if (
              livesInLocation.trim() === '' &&
              fromLocation.trim() === '' &&
              relationshipStatus.trim() === ''
            ) {
              Alert.alert('Empty fields!', 'At least one field should be added', [
                { text: 'Got it!' },
              ]);
              return;
            }
            if (currentUser) {
              dispatch(
                addOrEditProfileAbout(
                  currentUser.id as string,
                  livesInLocation,
                  fromLocation,
                  relationshipStatus,
                  isEdit,
                ),
              );
              if (!profileLoading && !error) {
                navigation.navigate('Profile', { userId: currentUser.id as string });
              }
            }
          }}
        />
      ),
    });
  }, [
    livesInLocation,
    fromLocation,
    relationshipStatus,
    isEdit,
    currentUser,
    dispatch,
    addOrEditProfileAbout,
    profileLoading,
    error,
  ]);

  if (profileLoading) {
    return <Spinner />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.inner}>
          <TextInput
            placeholder='Current Location'
            placeholderTextColor='#c5c5c5'
            style={styles.textInput}
            value={livesInLocation}
            onChangeText={text => setLivesInLocation(text)}
          />
          <TextInput
            placeholder='Birth Location'
            placeholderTextColor='#c5c5c5'
            style={styles.textInput}
            value={fromLocation}
            onChangeText={text => setFromLocation(text)}
          />
          <Text style={styles.text}>Relationship Status:</Text>
          <TouchableOpacity
            style={styles.radioContainer}
            activeOpacity={0.7}
            onPress={() => setRelationshipStatus('Single')}>
            <RadioButton
              value='Single'
              status={relationshipStatus === 'Single' ? 'checked' : 'unchecked'}
              onPress={() => setRelationshipStatus('Single')}
              color={Colors.valentineColor}
            />
            <Text>Single</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioContainer}
            activeOpacity={0.7}
            onPress={() => setRelationshipStatus('Commited')}>
            <RadioButton
              value='Commited'
              status={relationshipStatus === 'Commited' ? 'checked' : 'unchecked'}
              onPress={() => setRelationshipStatus('Commited')}
              color={Colors.valentineColor}
            />
            <Text>Commited</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioContainer}
            activeOpacity={0.7}
            onPress={() => setRelationshipStatus('Married')}>
            <RadioButton
              value='Married'
              status={relationshipStatus === 'Married' ? 'checked' : 'unchecked'}
              onPress={() => setRelationshipStatus('Married')}
              color={Colors.valentineColor}
            />
            <Text>Married</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioContainer}
            activeOpacity={0.7}
            onPress={() => setRelationshipStatus("It's complicated")}>
            <RadioButton
              value="It's complicated"
              status={relationshipStatus === "It's complicated" ? 'checked' : 'unchecked'}
              onPress={() => setRelationshipStatus("It's complicated")}
              color={Colors.valentineColor}
            />
            <Text>It's complicated</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioContainer}
            activeOpacity={0.7}
            onPress={() => setRelationshipStatus('In an Open Relationship')}>
            <RadioButton
              value='In an Open Relationship'
              status={
                relationshipStatus === 'In an Open Relationship' ? 'checked' : 'unchecked'
              }
              onPress={() => setRelationshipStatus('In an Open Relationship')}
              color={Colors.valentineColor}
            />
            <Text>In an Open Relationship</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddOrEditProfileAboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
  },
  textInput: {
    color: 'white',
    padding: 10,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 12,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
