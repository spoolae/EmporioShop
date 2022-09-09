import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnBoardingScreen} from './screens/onboarding/OnBoardingScreen';
import {LoginScreen} from './screens/onboarding/LoginScreen';
import {RegisterScreen} from './screens/onboarding/RegisterScreen';

export type RootStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
};

const {Navigator, Screen} = createNativeStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Navigator
      initialRouteName={'OnBoarding'}
      screenOptions={{headerShown: false}}>
      <Screen name={'OnBoarding'} component={OnBoardingScreen} />
      <Screen name={'Login'} component={LoginScreen} />
      <Screen name={'Register'} component={RegisterScreen} />
    </Navigator>
  </NavigationContainer>
);
