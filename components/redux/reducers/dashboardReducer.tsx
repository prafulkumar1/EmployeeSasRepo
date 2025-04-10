import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading:false
}
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    loadScreen(state, action) {
      state.loading = !state.loading
    },
  },
})

export const { loadScreen, } = dashboardSlice.actions
export default dashboardSlice.reducer