import { postApiCall } from '@/components/utlis/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading:false,
    memberResponse:null,
    errorMessage:""
}

export const getMemberDetails = createAsyncThunk(
  'getMemberDetails',
  async (
    _,
    { getState, rejectWithValue, fulfillWithValue },
  ) => {
    const params = {};
    const memberDetailsResponse = await postApiCall("","",params)
    if (memberDetailsResponse) {
      if(memberDetailsResponse.statusCode === 200){
        if (memberDetailsResponse.response) {
          return fulfillWithValue(memberDetailsResponse.response);
        } else {
          return rejectWithValue(memberDetailsResponse.response);
        }
      }else{
        return rejectWithValue(memberDetailsResponse.response);
      }
    }
  },
);
const AddMemberSlice = createSlice({
  name: 'addMember',
  initialState: initialState,
  reducers: {
    loadScreen(state, action) {
      state.loading = !state.loading
    },
  },
    extraReducers: builder => {
      builder
      .addCase(getMemberDetails.pending, (state, action) => {
        state.loading = true;
       })
      .addCase(getMemberDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.memberResponse = action.payload
      })
      .addCase(getMemberDetails.rejected, (state, action:any) => {
        state.loading = false;
        state.errorMessage = action?.payload?.ResponseMessage
      });
    },
})

export const { loadScreen, } = AddMemberSlice.actions
export default AddMemberSlice.reducer