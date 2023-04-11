import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {AppNavigator} from './app/AppNavigator';
import {persistor, store} from './app/redux/configureStore';
// import configureStore from './app/redux/configureStore';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StatusBar hidden />
      <AppNavigator />
    </PersistGate>
  </Provider>
);

export default App;
