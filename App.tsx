import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AppNavigator} from './app/AppNavigator';

const App = () => (
  <>
    <StatusBar hidden />
    <AppNavigator />
  </>
);

export default App;
