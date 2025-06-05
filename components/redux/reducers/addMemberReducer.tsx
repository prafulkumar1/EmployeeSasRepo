import { postApiCall } from "@/components/utlis/api";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { Platform } from "react-native";

const initialState = {
  loading: false,
  memberResponse: null,
  errorMessage: "",
  isScreenLoaded: false,
  selectedId: "",
  membersList: [],
  singleMemberDetails: null,
  selectedMembersList: [],
  userType: "",
  OpenMemberModel: false,
  ChangeToGuest: "",
  membersCount: 3,
  AddMultiple: false,
};

export const getMemberDetails = createAsyncThunk(
  "getMemberDetails",
  async (_, { getState, rejectWithValue, fulfillWithValue }) => {
    const params = {};
    const memberDetailsResponse = await postApiCall("", "", params);
    if (memberDetailsResponse) {
      if (memberDetailsResponse.statusCode === 200) {
        if (memberDetailsResponse.response) {
          return fulfillWithValue(memberDetailsResponse.response);
        } else {
          return rejectWithValue(memberDetailsResponse.response);
        }
      } else {
        return rejectWithValue(memberDetailsResponse.response);
      }
    }
  }
);
const AddMemberSlice = createSlice({
  name: "addMember",
  initialState: initialState,
  reducers: {
    loadScreen(state, action) {
      state.loading = !state.loading;
    },
    resetLoadedScreen(state, action) {
      state.isScreenLoaded = !state.isScreenLoaded;
    },
    handleSelectedMember(state, action) {
      state.selectedId = action.payload;
    },
    setMembersList(state, action) {
      const updateCountList = Array.from(
        { length: action.payload },
        (_, index) => ({
          number: index + 1,
          memberName: `Reservation ${index + 1}`,
          id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          isMemberSelected: false,
        })
      );
      state.membersList = updateCountList;
    },
    singleMemberDetails(state, action) {
      state.singleMemberDetails = action.payload;
    },
    setselectedMembersList(state, action) {
      state.selectedMembersList = action.payload;
    },
    setmembersCount(state, action) {
      state.membersCount = action.payload;
    },
    resetSingleMemberDetails(state, action) {
      state.singleMemberDetails = null;
    },
    addMembersForReservation(state, action) {
      let values = state;

      if (Platform.OS === "web") {
        values = current(state);
      }

      const { selectedId, selectedMembersList } = values;

      // Case 1: AddMultiple mode — match members by index
      if ( selectedMembersList?.length > 1) {
        const updatedMembersList = values?.membersList?.map((item) => {
          const match = selectedMembersList.find(
            (selected) => selected?.number === item.number
          );
          if (match && match?.singleMemberDetails) {
            return {
              ...item,
              memberName:
                match?.singleMemberDetails?.MemberName || item.memberName,
              isMemberSelected: true,
              singleMemberDetails: match?.singleMemberDetails,
            };
          }

          return item;
        });

        return {
          ...state,
          membersList: updatedMembersList,
          selectedMembersList: updatedMembersList.filter(
            (item) => item.isMemberSelected
          ),
        };
      }
      
      // Case 2: Single member selected using selectedId
      const updatedMembersList = values.membersList.map((item, index) => {
        const match = selectedMembersList.find(
          (selected) => selected?.number === item.number
        );

        if (match) {
          const updatedMember = {
            ...item,
            memberName: values.singleMemberDetails?.MemberName,
            isMemberSelected: true,
            singleMemberDetails: values.singleMemberDetails,
          };
          return updatedMember;
        }
        return item;
      });

      return {
        ...state,
        membersList: updatedMembersList,
        selectedMembersList: updatedMembersList.filter(
          (item) => item.isMemberSelected
        ),
      };
    },

    addTbdToMemberList(state, action) { 
      // console.log("Before update:", JSON.stringify(state.membersList, null, 2));  // Logs before update
      state.membersList = state.membersList.map((item) => {
        if (item.number === state.selectedId) {
          const updatedMember = {
            ...item,
            memberName: "TBD",
            isMemberSelected: true,
            singleMemberDetails: null,
          };
          if (
            !state.selectedMembersList.some(
              (member) => member.id === state.selectedId
            )
          ) {
            state.selectedMembersList = [
              ...state.selectedMembersList,
              updatedMember,
            ];
          }
          return updatedMember;
        }
        return item;
      });
      //  console.log("After update:", JSON.stringify(state.membersList, null, 2));  // Logs after update
    },
    removeMembersFromList(state, action) {
      state.membersList = state?.membersList?.map((item, index) => {
        if (item?.number === action?.payload) {
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
      state.selectedMembersList = state?.selectedMembersList?.filter(
        (items) => items?.number !== action?.payload
      );
    },
    setUserType(state, action) {
      state.userType = action.payload;
    },
    setOpenMembersModel(state, action) {
      state.OpenMemberModel = !state.OpenMemberModel;
    },
    setAddMultiple(state, action) {
      state.AddMultiple = action.payload;
    },
    setChangeToGuest(state, action) {
      const { userType } = action.payload;
      state.ChangeToGuest = userType;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMemberDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMemberDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.memberResponse = action.payload;
      })
      .addCase(getMemberDetails.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage = action?.payload?.ResponseMessage;
      });
  },
});

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
  setUserType,
  setOpenMembersModel,
  setChangeToGuest,
  setmembersCount,
  setAddMultiple,
  setselectedMembersList,
}: any = AddMemberSlice.actions;
export default AddMemberSlice.reducer;
