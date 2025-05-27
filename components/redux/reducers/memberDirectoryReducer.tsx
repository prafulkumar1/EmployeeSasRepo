import { postApiCall } from "@/components/utlis/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  memberList: null,
  errorMessage: "",
  memberListPerBatch: [],
  GuestListPerBatch: [],
  guestValidationResponse: null,
  newGuestResponse: null,
  formData: {},
  totalCount: null,
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
export const getExistingGuestList = createAsyncThunk(
  "getExistingGuestList",
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
    const ExistingGuestResponse = await postApiCall(
      "EXISTING_GUEST_DIRECTORY",
      "GET_EXISTING_GUEST_DIRECTORY",
      params
    );
    if (ExistingGuestResponse) {
      if (ExistingGuestResponse.statusCode === 200) {
        if (ExistingGuestResponse.response) {
          console.log(ExistingGuestResponse.response, "ExistingGuestResponse");

          return fulfillWithValue({
            response: ExistingGuestResponse.response,
            searchChar,
          });
        } else {
          return rejectWithValue(ExistingGuestResponse.response);
        }
      } else {
        return rejectWithValue(ExistingGuestResponse.response);
      }
    }
  }
);

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
    resetMemberListPerBatch(state) {
      state.memberListPerBatch = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMemberList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMemberList.fulfilled, (state, action) => {
        state.memberListPerBatch = [];
        // state.memberList = action.payload;
        state.totalCount = action.payload.response.TotalRecords;
        state.memberListPerBatch =
          action.payload?.searchChar === "All"
            ? [
                ...state.memberListPerBatch,
                ...action.payload?.response?.Members,
              ]
            : action.payload?.response?.Members;
        state.loading = false;
      })
      .addCase(getMemberList.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage = action?.payload?.ResponseMessage;
      })
      .addCase(getExistingGuestList.fulfilled, (state, action) => {
        state.totalCount = action.payload.response.TotalRecords;

        // If searchChar is "All", we append the data to the existing list
        if (action.payload?.searchChar === "All") {
          state.GuestListPerBatch = [
            ...state.GuestListPerBatch,
            ...action.payload?.response?.Members, 
          ];
        } else {
          state.GuestListPerBatch = action.payload?.response?.Members;
        }

        state.loading = false;
      })
      .addCase(getExistingGuestList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExistingGuestList.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage = action?.payload?.ResponseMessage;
      });
  },
});

export const { loadScreen, setFormFieldData, resetMemberListPerBatch } =
  memberDirectorySlice.actions;
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
