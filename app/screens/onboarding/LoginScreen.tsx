/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../AppNavigator';
import {BackHeader} from '../../components/BackHeader';
import {Button} from '../../components/Button';
import {LoginInput} from '../../components/LoginInput';
import {PasswordInput} from '../../components/PasswordInput';
import {colors} from '../../constants/colors';
import auth from '@react-native-firebase/auth';

export const LoginScreen = () => {
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState('');

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const updateLoginValue = (query: any) => {
    setLoginValue(query);
  };

  const updatePasswordValue = (query: any) => {
    setPasswordValue(query);
  };

  const handleSignIn = () => {
    if (loginValue && passwordValue) {
      auth()
        .signInWithEmailAndPassword(loginValue, passwordValue)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            setError('That email address is invalid!');
          }
          if (error.code === 'auth/user-not-found') {
            setError('That user is not found!');
          }
          if (error.code === 'auth/wrong-password') {
            setError('The password is invalid!');
          }
          console.log(error);
        });
    } else {
      setError('Empty email or password!');
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <BackHeader />
      <Text style={styles.label}>Login to your account</Text>
      <LoginInput
        placeholder={'Email'}
        style={{marginVertical: 15}}
        updateLoginValue={updateLoginValue}
      />
      <PasswordInput
        placeholder={'Password'}
        style={{marginVertical: 15}}
        updatePasswordValue={updatePasswordValue}
      />
      <Text style={styles.error}>{error}</Text>
      <Button
        title="Sign in"
        containerStyle={styles.signInButton}
        style={{fontFamily: 'URWGeometricArabic-Regular', fontSize: 20}}
        onPress={handleSignIn}
      />
      <View style={styles.signUp}>
        <Text style={styles.tip}>{"Don't have an account? "}</Text>
        <Button
          title="Sign up"
          variant="text"
          style={{fontFamily: 'URWGeometricArabic-Regular', fontSize: 20}}
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  label: {
    color: colors.active,
    fontSize: 42,
    fontFamily: 'URWGeometricArabic-Bold',
  },
  tip: {
    color: colors.grey,
    fontSize: 20,
    fontFamily: 'URWGeometricArabic-Regular',
  },
  signInButton: {
    marginTop: 30,
    margin: 20,
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    right: 0,
    marginHorizontal: 'auto',
    position: 'absolute',
    bottom: 20,
  },
  error: {
    fontSize: 20,
    fontFamily: 'URWGeometricArabic-Regular',
  },
});
