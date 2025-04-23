import { postApiCall } from '@/components/utlis/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading:false,
    memberList:null,
    errorMessage:"",
    memberListPerBatch:[]
}

export const getMemberList = createAsyncThunk(
  'getMemberList',
  async (
    {pageCount,searchChar,searchBy}:{pageCount:number,searchChar:string,searchBy:string},
    { getState, rejectWithValue, fulfillWithValue },
  ) => {
    const params = {
        "SearchBy": searchBy?searchBy:"",
        "SearchChar": searchChar?.toLowerCase(),
        "RecordsPerPage": 25,
        "PageCount": pageCount,
    };
    console.log(JSON.stringify(params),"--->>>member params")
    const memberListResponse = await postApiCall("MEMBER_DIRECTORY","GET_MEMBER_DIRECTORY",params)
    if (memberListResponse) {
      if(memberListResponse.statusCode === 200){
        if (memberListResponse.response) {
          return fulfillWithValue({response:memberListResponse.response,searchChar});
        } else {
          return rejectWithValue(memberListResponse.response);
        }
      }else{
        return rejectWithValue(memberListResponse.response);
      }
    }
  },
);
const memberDirectorySlice = createSlice({
  name: 'memberDirectory',
  initialState: initialState,
  reducers: {
    loadScreen(state, action) {
      state.loading = !state.loading
    },
  },
    extraReducers: builder => {
      builder
      .addCase(getMemberList.pending, (state, action) => {
        state.loading = true;
       })
      .addCase(getMemberList.fulfilled, (state, action) => {
        state.loading = false;
        state.memberList = action.payload
        state.memberListPerBatch = action.payload?.searchChar === "All" ?[...state.memberListPerBatch,...action.payload?.response?.Members] :  action.payload?.response?.Members
      })
      .addCase(getMemberList.rejected, (state, action:any) => {
        state.loading = false;
        state.errorMessage = action?.payload?.ResponseMessage
      });
    },
})

export const { loadScreen, } = memberDirectorySlice.actions
export default memberDirectorySlice.reducer