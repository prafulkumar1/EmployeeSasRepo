import { postApiCall } from '@/components/utlis/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Alert } from 'react-native';

const initialState = {
    loading:false,
    errorMessage:"",
    serviceClassList:null,
    singleServiceItem:null,
    Isshowbookintype:null
}

export const getServiceClasses = createAsyncThunk(
  'getServiceClasses',
  async (
    _,
    { getState, rejectWithValue, fulfillWithValue },
  ) => {
    const params = {
    "Button_Value":"Booking type Provider",
    "CategoryID":"Tennis","FilterMemberSize":0,"FilterTime":"","MemberID":"5002",
    };
    const servicesResponse = await postApiCall("SERVICES","GET_SERVICE_LIST",params)
      if(servicesResponse.statusCode === 200 && servicesResponse.response?.ResponseCode === "Success"){
        if (servicesResponse.response) {
          return fulfillWithValue(servicesResponse.response);
        } else {
          return rejectWithValue(servicesResponse.response);
        }
      }else if(servicesResponse.response?.ResponseMessage !== ""){
        Alert.alert("",servicesResponse.response?.ResponseMessage)
      }else{
        return rejectWithValue(servicesResponse.response);
      }
  },
);

const serviceSlice = createSlice({
  name: 'serviceSlice',
  initialState: initialState,
  reducers: {
    storeSingleService(state, action) {
      state.singleServiceItem = action.payload
    },
  },
  extraReducers: builder => {
    builder
    .addCase(getServiceClasses.pending, (state, action) => {
      state.loading = true;
     })
    .addCase(getServiceClasses.fulfilled, (state, action) => {
      let BookingTypes = action?.payload?.BookingTypes
      state.Isshowbookintype = action?.payload?.Isshowbookintype
      state.serviceClassList = BookingTypes
      state.loading = false;
    })
    .addCase(getServiceClasses.rejected, (state, action:any) => {
      state.loading = false;
      state.errorMessage = action?.payload?.ResponseMessage
      // Alert.alert("",action.response?.ResponseMessage)
    });
  },
})

export const { storeSingleService}:any = serviceSlice.actions
export default serviceSlice.reducer