import React, { useState } from 'react';
import {
  Button,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AuthNavProps } from '../../types';
import { validateEmail } from '../../utils/validators';

import { View, Text } from '../../components/Themed';
import Spinner from '../../components/UI/Spinner';

import { RootState } from '../../redux/store';
import { signUp } from '../../redux/user/user.actions';

const RegisterScreen = ({ navigation }: AuthNavProps<'Register'>) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const signUpLoading = useSelector((state: RootState) => state.user.loading);

  const handleSignUp = async () => {
    if (
      displayName.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === ''
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

    dispatch(signUp({ email, password, displayName }));
  };

  if (signUpLoading) {
    return <Spinner />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
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
              autoCapitalize='words'
              onChangeText={text => setDisplayName(text)}
              style={styles.input}
            />
            <TextInput
              placeholder='Email'
              placeholderTextColor='#c5c5c5'
              keyboardType='email-address'
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              placeholder='Password'
              placeholderTextColor='#c5c5c5'
              secureTextEntry
              onChangeText={text => setPassword(text)}
              style={styles.input}
            />
            <TextInput
              placeholder='Confirm Password'
              placeholderTextColor='#c5c5c5'
              secureTextEntry
              onChangeText={text => setConfirmPassword(text)}
              style={styles.input}
            />
            <View style={styles.buttonsContainer}>
              <Button title="Let's do it!" onPress={handleSignUp} />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signUpText}>Already have an account? Log In!</Text>
            </TouchableOpacity>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
  buttonsContainer: {
    marginVertical: 25,
  },
  signUpText: {
    textAlign: 'center',
  },
});
