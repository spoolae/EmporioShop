import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import categoriesSlice from './categoriesSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, categoriesSlice);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

export {store, persistor};

// import {configureStore} from '@reduxjs/toolkit';
// import categoriesSlice from './categoriesSlice';

// import simpleCounterSlice from './simpleCounterSlice';

// export default configureStore({reducer: categoriesSlice});
