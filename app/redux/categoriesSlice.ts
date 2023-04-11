/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CategoryProps, StoreItemProps} from '../screens/main/HomeScreen';
import {firebase} from '@react-native-firebase/firestore';

interface CounterState {
  counter: {amount: number};
}

const initialState = {categories: [{}]};

export const getCategoriesAction = createAsyncThunk(
  'getCategories',
  async () => {
    const categories: Array<CategoryProps> = [];
    await firebase
      .firestore()
      .collection('categories')
      .orderBy('id')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          const temp: any = snapshot.data();
          categories.push(temp);
        });
      });
    return categories;
  },
);

const categoriesSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategoriesAction.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default categoriesSlice.reducer;
