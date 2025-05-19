// reducers/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// const initialState = {
//   loading: false,
// };

const uiSlice = createSlice({
  name: 'ui',
  initialState: { loading: false },
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = !state.loading;
    },
  },
});

export const { setLoader } = uiSlice.actions;
export default uiSlice.reducer;
