import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomNavigation} from '../../components/BottonNavigation';
import {colors} from '../../constants/colors';
import {tabs} from '../../constants/tabs';

export const MainScreen = () => (
  <SafeAreaView style={{height: '100%', backgroundColor: colors.background}}>
    <BottomNavigation tabs={tabs} />
  </SafeAreaView>
);
