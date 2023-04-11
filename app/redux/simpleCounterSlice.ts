/* eslint-disable @typescript-eslint/typedef */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CounterState {
  counter: {amount: number};
}

const initialState = {counter: {amount: 0, test: 0}};

const simpleCounterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementAction(state) {
      state.counter.amount++;
      console.log(state);
    },
    decrementAction(state) {
      state.counter.amount--;
    },
    changeByAmount(state, action: PayloadAction<number>) {
      state.counter.amount += action.payload;
    },
  },
});

export const {incrementAction, decrementAction, changeByAmount} =
  simpleCounterSlice.actions;
export default simpleCounterSlice.reducer;
