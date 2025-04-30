import { postApiCall } from '@/components/utlis/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading:false,
    memberResponse:null,
    errorMessage:"",
    isScreenLoaded:false,
    selectedId:"",
    membersList:[],
    singleMemberDetails:null,
    selectedMembersList:[],
    userType:""
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
    resetLoadedScreen(state, action) {
      state.isScreenLoaded = !state.isScreenLoaded
    },
    handleSelectedMember(state, action){
      state.selectedId = action.payload
    },
    setMembersList(state, action) {
      const updateCountList = Array.from(
        { length: action.payload },
        (_, index) => ({ number: index + 1,memberName:`Reservation ${index+1}`,id:`${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,isMemberSelected:false})
      );
      state.membersList = updateCountList
    },
    singleMemberDetails(state, action) {
      state.singleMemberDetails = action.payload      
    },
    resetSingleMemberDetails(state, action) {
      state.singleMemberDetails = null
    },
    addMembersForReservation(state, action) {
      state.membersList = state.membersList.map((item) => {
        if (item.id === state.selectedId) {
          const updatedMember = {
            ...item,
            memberName: state.singleMemberDetails?.MemberName,
            isMemberSelected: true,
            singleMemberDetails: state.singleMemberDetails,
          };
          
          if (!state.selectedMembersList.some(member => member.id === state.selectedId)) {
            state.selectedMembersList = [...state.selectedMembersList, updatedMember];
          }
          return updatedMember;
        }
        return item;
      });
    },
    addTbdToMemberList(state,action){
      state.membersList = state.membersList.map((item) => {
        if (item.id === state.selectedId) {
          const updatedMember = {
            ...item,
            memberName: "TBD",
            isMemberSelected: true,
            singleMemberDetails: null,
          };
          if (!state.selectedMembersList.some(member => member.id === state.selectedId)) {
            state.selectedMembersList = [...state.selectedMembersList, updatedMember];
          }
          return updatedMember;
        }
        return item;
      });
    },
    removeMembersFromList(state, action) {
      state.membersList = state.membersList.map((item, index) => {
        if (item.id === action.payload) {
          const updatedMember = {
            ...item,
            memberName: `Reservation ${index + 1}`,
            isMemberSelected: false,
            singleMemberDetails: null,
          };
          return updatedMember;
        }
        return item;
      });
      state.selectedMembersList = state.selectedMembersList.filter((items) => items?.id === action.payload)
    },
    setUserType(state, action){
      state.userType = action.payload
    }
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

export const { 
  loadScreen,
  resetLoadedScreen,
  handleSelectedMember,
  setMembersList,
  singleMemberDetails,
  addMembersForReservation,
  removeMembersFromList,
  addTbdToMemberList,
  resetSingleMemberDetails,
  setUserType 
}:any = AddMemberSlice.actions
export default AddMemberSlice.reducer