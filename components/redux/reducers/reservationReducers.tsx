import { postApiCall } from '@/components/utlis/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Dimensions, ScaledSize } from 'react-native';
 
const initialState = {
  dropDownIndex: null as number | null,
};
 
 
 
const reservationrSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    setAdddropDownIndex(state, action) {
      state.dropDownIndex = action.payload;
    },
  },
 
 
});
 
export const {setAdddropDownIndex } = reservationrSlice.actions;
 
export default reservationrSlice.reducer;