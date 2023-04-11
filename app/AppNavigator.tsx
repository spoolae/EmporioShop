/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnBoardingScreen} from './screens/onboarding/OnBoardingScreen';
import {LoginScreen} from './screens/onboarding/LoginScreen';
import {RegisterScreen} from './screens/onboarding/RegisterScreen';
import {
  CategoryProps,
  HomeScreen,
  StoreItemProps,
} from './screens/main/HomeScreen';
import auth from '@react-native-firebase/auth';
import {OffersScreen} from './screens/main/OffersScreen';
import {MostPopularScreen} from './screens/main/MostPopularScreen';
import {CategoryScreen} from './screens/main/CategoryScreen';
import {StoreItemDetailsScreen} from './screens/main/StoreItemDetailsScreen';
import {SearchScreen} from './screens/main/SearchScreen';
import {MainScreen} from './screens/main/MainScreen';
import {CartScreen} from './screens/main/CartScreen';
import ReduxTestScreen from './redux/ReduxTestScreen';

export type RootStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  Home: undefined;
  Offers: {offers: Array<StoreItemProps>};
  MostPopular: {
    mostPopular: Array<StoreItemProps>;
    categories: Array<CategoryProps>;
  };
  Category: {
    items: Array<StoreItemProps>;
    categoryId: number;
    categoryName: string;
  };
  StoreItemDetails: {
    item: StoreItemProps;
  };
  Search: {
    items: Array<StoreItemProps>;
    categories: Array<CategoryProps>;
  };
  Cart: undefined;
  ReduxTest: any;
};

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

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
    return subscriber;
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
      <Navigator initialRouteName={'Main'} screenOptions={{headerShown: false}}>
        <Screen name={'Main'} component={MainScreen} />
        <Screen name={'Home'} component={HomeScreen} />
        <Screen name={'Offers'} component={OffersScreen} />
        <Screen name={'MostPopular'} component={MostPopularScreen} />
        <Screen name={'Category'} component={CategoryScreen} />
        <Screen name={'StoreItemDetails'} component={StoreItemDetailsScreen} />
        <Screen name={'Search'} component={SearchScreen} />
        <Screen name={'Cart'} component={CartScreen} />
        <Screen name={'ReduxTest'} component={ReduxTestScreen} />
      </Navigator>
    </NavigationContainer>
  );
};
