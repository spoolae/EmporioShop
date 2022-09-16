/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnBoardingScreen} from './screens/onboarding/OnBoardingScreen';
import {LoginScreen} from './screens/onboarding/LoginScreen';
import {RegisterScreen} from './screens/onboarding/RegisterScreen';
import {HomeScreen} from './screens/main/HomeScreen';
import auth from '@react-native-firebase/auth';
import {OffersScreen} from './screens/main/OffersScreen';

export type RootStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Offers: undefined;
};

const {Navigator, Screen} = createNativeStackNavigator();

export const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
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
  }

  return (
    <NavigationContainer>
      <Navigator initialRouteName={'Home'} screenOptions={{headerShown: false}}>
        <Screen name={'Home'} component={HomeScreen} />
        <Screen name={'Offers'} component={OffersScreen} />
      </Navigator>
    </NavigationContainer>
  );
};
