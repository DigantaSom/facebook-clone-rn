import React, { useState } from 'react';
import {
  ScrollView,
  Button,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { RadioButton } from 'react-native-paper';

import DayJS from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { signUp } from '../../redux/user/user.actions';

import { AuthNavProps, GenderType } from '../../types';
import { validateBirthday, validateEmail } from '../../utils/validators';

import { View, Text } from '../../components/Themed';
import Spinner from '../../components/UI/Spinner';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

const RegisterScreen = ({ navigation }: AuthNavProps<'Register'>) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState<GenderType>('Female');
  // date states
  // const [date, setDate] = useState(new Date(1598051730000));
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [hasPickedDate, setHasPickedDate] = useState(false);

  const dispatch = useDispatch();
  const signUpLoading = useSelector((state: RootState) => state.user.loading);

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    setHasPickedDate(true);
    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const showDatepicker = () => {
    setShow(true);
  };

  const handleSignUp = async () => {
    if (
      displayName.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === '' ||
      gender.trim() === ''
    ) {
      Alert.alert(
        'Fill all fields',
        'Please fill up all fields to continue',
        [{ text: 'Got it!' }],
        { cancelable: true },
      );
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert(
        'Invalid Email format',
        'Please provide a valid email address',
        [{ text: 'Okay' }],
        { cancelable: true },
      );
    }
    if (password !== confirmPassword) {
      Alert.alert(
        'Passwords do not match',
        'Please provide the same password',
        [{ text: 'Okay' }],
        { cancelable: true },
      );
      return;
    }

    const { isDateValid, dateErrorType } = validateBirthday(date);
    let alertText = '';
    if (dateErrorType === 'empty') {
      alertText = 'You must provide birthday to continue.';
    } else if (dateErrorType === 'young') {
      alertText = 'You must be at least 13 years old to continue. 😔';
    }
    if (!isDateValid) {
      Alert.alert('Invalid Birthday', alertText, [{ text: 'All right!' }], {
        cancelable: true,
      });
      return;
    }

    const birthday = date.toISOString();

    dispatch(signUp({ email, password, displayName, birthday, gender }));
  };

  if (signUpLoading) {
    return <Spinner />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/Facebook-logo.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Sign up to Facebook</Text>

      <View style={styles.loginForm}>
        <TextInput
          placeholder='Full Name'
          placeholderTextColor='#c5c5c5'
          textContentType='name'
          autoCapitalize='words'
          onChangeText={text => setDisplayName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Email'
          placeholderTextColor='#c5c5c5'
          textContentType='emailAddress'
          keyboardType='email-address'
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          placeholderTextColor='#c5c5c5'
          textContentType='password'
          secureTextEntry
          onChangeText={text => setPassword(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Confirm Password'
          placeholderTextColor='#c5c5c5'
          textContentType='password'
          secureTextEntry
          onChangeText={text => setConfirmPassword(text)}
          style={styles.input}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={showDatepicker}
          style={styles.birthdayButton}>
          <Text style={styles.birthdayButtonText}>
            {hasPickedDate ? DayJS(date).format('DD-MMM-YYYY') : 'Birthday'}
          </Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode='date'
            display='default'
            onChange={(e, selectedDate) => onDateChange(e, selectedDate)}
          />
        )}

        <Text style={styles.text}>Gender:</Text>
        <TouchableOpacity
          style={styles.radioContainer}
          activeOpacity={0.7}
          onPress={() => setGender('Female')}>
          <RadioButton
            value='Single'
            status={gender === 'Female' ? 'checked' : 'unchecked'}
            onPress={() => setGender('Female')}
            color={Colors.facebookSecondary}
          />
          <Text>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioContainer}
          activeOpacity={0.7}
          onPress={() => setGender('Male')}>
          <RadioButton
            value='Single'
            status={gender === 'Male' ? 'checked' : 'unchecked'}
            onPress={() => setGender('Male')}
            color={Colors.facebookSecondary}
          />
          <Text>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioContainer}
          activeOpacity={0.7}
          onPress={() => setGender('Rather not say')}>
          <RadioButton
            value='Single'
            status={gender === 'Rather not say' ? 'checked' : 'unchecked'}
            onPress={() => setGender('Rather not say')}
            color={Colors.facebookSecondary}
          />
          <Text>Rather not say</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <Button title="Let's do it!" onPress={handleSignUp} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signUpText}>Already have an account? Log In!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  logoContainer: {
    width: 150,
    height: 150,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  loginForm: {
    marginTop: 25,
    width: '70%',
  },
  input: {
    color: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  birthdayButton: {
    backgroundColor: Colors.dark.cardBackground,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 15,
    borderRadius: Layout.default_borderRadius,
  },
  birthdayButtonText: {
    color: '#c5c5c5',
  },
  text: {
    fontSize: 16,
    marginVertical: 12,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 20,
  },
  signUpText: {
    textAlign: 'center',
  },
});
