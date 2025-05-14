import { postApiCall } from "@/components/utlis/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  memberList: null,
  errorMessage: "",
  memberListPerBatch: [],
  guestValidationResponse: null,
  newGuestResponse: null,
  formData: {},
};

export const getMemberList = createAsyncThunk(
  "getMemberList",
  async (
    {
      pageCount,
      searchChar,
      searchBy,
    }: { pageCount: number; searchChar: string; searchBy: string },
    { getState, rejectWithValue, fulfillWithValue }
  ) => {
    const params = {
      SearchBy: searchBy ? searchBy : "",
      SearchChar: searchChar?.toLowerCase(),
      RecordsPerPage: 25,
      PageCount: pageCount,
    };
    // console.log(JSON.stringify(params), "--->>>member params");
    const memberListResponse = await postApiCall(
      "MEMBER_DIRECTORY",
      "GET_MEMBER_DIRECTORY",
      params
    );
    if (memberListResponse) {
      if (memberListResponse.statusCode === 200) {
        if (memberListResponse.response) {
          return fulfillWithValue({
            response: memberListResponse.response,
            searchChar,
          });
        } else {
          return rejectWithValue(memberListResponse.response);
        }
      } else {
        return rejectWithValue(memberListResponse.response);
      }
    }
  }
);
// Step 2: API call for Guest Validation (VALIDATE_ADD_NEW_GUEST)
// export const validateNewGuest = createAsyncThunk(
//   'validateNewGuest',
//   async (
//     { guestDetails }: { guestDetails: any }, // Define your guest details structure
//     { getState, rejectWithValue, fulfillWithValue }
//   ) => {
//     const params = { ...guestDetails };
//     console.log("Validating guest with params: ", params);

//     const validationResponse = await postApiCall(
//       "MEMBER_DIRECTORY",
//       "VALIDATE_ADD_NEW_GUEST",
//       params
//     );

//     if (validationResponse) {
//       if (validationResponse.statusCode === 200) {
//         if (validationResponse.response) {
//           return fulfillWithValue(validationResponse.response);
//         } else {
//           return rejectWithValue(validationResponse.response);
//         }
//       } else {
//         return rejectWithValue(validationResponse.response);
//       }
//     }
//   }
// );

// Step 3: API call for Adding New Guest (ADD_NEW_GUEST)
// export const addNewGuest = createAsyncThunk(
//   'addNewGuest',
//   async (
//     { guestDetails }: { guestDetails: any },
//     { getState, rejectWithValue, fulfillWithValue }
//   ) => {
//     const params = { ...guestDetails };
//     console.log("Adding new guest with params: ", params);

//     const newGuestResponse = await postApiCall(
//       "MEMBER_DIRECTORY",
//       "NEW_GUEST/ADD_NEW_GUEST",
//       params
//     );

//     if (newGuestResponse) {
//       if (newGuestResponse.statusCode === 200) {
//         if (newGuestResponse.response) {
//           return fulfillWithValue(newGuestResponse.response);
//         } else {
//           return rejectWithValue(newGuestResponse.response);
//         }
//       } else {
//         return rejectWithValue(newGuestResponse.response);
//       }
//     }
//   }
// );

const memberDirectorySlice = createSlice({
  name: "memberDirectory",
  initialState: initialState,
  reducers: {
    loadScreen(state, action) {
      state.loading = !state.loading;
    },
    setFormFieldData(state, action) {
      const {
        formId,
        controlType,
        controlId,
        controlValue,
        isInvalid,
        errorMessage,
      } = action.payload;
      state.formData = {
        ...state.formData,
        [formId + "_" + controlId]: {
          value: controlValue,
          isInvalid: isInvalid ?? false,
          errorMessage: errorMessage ?? "",
        },
      };
    },
    resentFormData(state, action) {
      const {
        formId,
        controlType,
        controlId,
        controlValue,
        isInvalid,
        errorMessage,
      } = action.payload;
      state.formData = {
        [formId + "_" + controlId]: {
          value: "",
          isInvalid: isInvalid ?? false,
          errorMessage: errorMessage ?? "",
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMemberList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMemberList.fulfilled, (state, action) => {
        state.loading = false;
        state.memberList = action.payload;
        state.memberListPerBatch =
          action.payload?.searchChar === "All"
            ? [
                ...state.memberListPerBatch,
                ...action.payload?.response?.Members,
              ]
            : action.payload?.response?.Members;
      })
      .addCase(getMemberList.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage = action?.payload?.ResponseMessage;
      });
    // Step 5: Handle the second API call (validate new guest)
    // .addCase(validateNewGuest.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(validateNewGuest.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.guestValidationResponse = action.payload;
    //   const guestDetails = action.payload;
    //   // dispatch(addNewGuest({ guestDetails }));
    // })
    // .addCase(validateNewGuest.rejected, (state, action: any) => {
    //   state.loading = false;
    //   state.errorMessage = action?.payload?.ResponseMessage;
    // })

    // Step 6: Handle the third API call (add new guest)
    // .addCase(addNewGuest.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(addNewGuest.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.newGuestResponse = action.payload;
    // })
    // .addCase(addNewGuest.rejected, (state, action: any) => {
    //   state.loading = false;
    //   state.errorMessage = action?.payload?.ResponseMessage;
    // });
  },
});

export const { loadScreen, setFormFieldData } = memberDirectorySlice.actions;
export default memberDirectorySlice.reducer;

export const getFormFieldDataSelector = (
  state: any,
  formId: string,
  controlId: string
) => {
  return (
    state?.[formId + "_" + controlId] || {
      value: "",
      isInvalid: false,
      errorMessage: "",
    }
  );
};
