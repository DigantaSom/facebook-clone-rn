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

import { View, Text } from '../../components/Themed';
import Spinner from '../../components/UI/Spinner';

import { RootState } from '../../redux/store';
import { emailSignIn } from '../../redux/user/user.actions';

import { AuthNavProps } from '../../types';
import { validateEmail } from '../../utils/validators';

const LoginScreen = ({ navigation }: AuthNavProps<'Login'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const signInLoading = useSelector((state: RootState) => state.user.loading);

  const handleSignIn = async () => {
    if (email.trim() === '') {
      Alert.alert(
        'Email is required',
        'Please provide a valid email address',
        [{ text: 'Okay' }],
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
    if (password.trim() === '') {
      Alert.alert(
        'Password is required',
        'Please provide a password',
        [{ text: 'Okay' }],
        { cancelable: true },
      );
      return;
    }

    dispatch(emailSignIn({ email, password }));
  };

  if (signInLoading) {
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
          <Text style={styles.title}>Login to Facebook</Text>

          <View style={styles.loginForm}>
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
            <View style={styles.buttonContainer}>
              <Button title='Login' onPress={handleSignIn} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signUpText}>Don't have an account? Sign Up!</Text>
            </TouchableOpacity>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 150,
    height: 150,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
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
  buttonContainer: {
    marginVertical: 25,
  },
  signUpText: {
    textAlign: 'center',
  },
});
