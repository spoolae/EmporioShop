import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../AppNavigator';
import {BackHeader} from '../../components/BackHeader';
import {Button} from '../../components/Button';
import {LoginInput} from '../../components/LoginInput';
import {PasswordInput} from '../../components/PasswordInput';
import {colors} from '../../constants/colors';

export const RegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.background}>
      <BackHeader />
      <Text style={styles.label}>Register your account</Text>
      <LoginInput placeholder={'Email'} style={{marginVertical: 15}} />
      <PasswordInput placeholder={'Password'} style={{marginVertical: 15}} />
      <PasswordInput
        placeholder={'Repeat password'}
        style={{marginVertical: 15}}
      />
      <Button
        title="Sign up"
        containerStyle={styles.signInButton}
        style={{fontFamily: 'URWGeometricArabic-Regular', fontSize: 20}}
      />
      <View style={styles.signUp}>
        <Text style={styles.tip}>{'Already have an account? '}</Text>
        <Button
          title="Sign in"
          variant="text"
          style={{fontFamily: 'URWGeometricArabic-Regular', fontSize: 20}}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
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
});
