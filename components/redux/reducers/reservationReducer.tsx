import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  addMemberIndex: null as number | null, 
  loading:false
};

const ReservationSlice = createSlice({
  name: 'reservation',
  initialState: initialState,
  reducers: {
    setAddMemberIndex(state, action) {
      state.addMemberIndex = action.payload; 
    },
  },


});

export const {setAddMemberIndex } = ReservationSlice.actions;

export default ReservationSlice.reducer;