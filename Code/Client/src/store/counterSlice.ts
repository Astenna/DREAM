import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './store';

// TODO: only example. not yet used.

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment } = counterSlice.actions
export const selectCounterValue = (state: RootState) => state.counter.value
export default counterSlice.reducer