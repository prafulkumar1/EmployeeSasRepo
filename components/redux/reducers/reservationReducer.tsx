import { postApiCall } from "@/components/utlis/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const initialState = {
  addMemberIndex: null as number | null,
  loading: false,
  AppConfigJson: null,
  dropDownIndex: null as number | null,
  OpenAddmemberModel: false,
  closeMemberModel: false,
  ThankYouModel: false,
  reservationData: [],
};

export const getAppConfiguration = createAsyncThunk(
  "getAppConfiguration",
  async (_, { getState, rejectWithValue, fulfillWithValue }) => {
    const params = {};
    let AppConfigJsonData = await postApiCall(
      "UI_CONFIGURATIONS",
      "GET_UI_CONFIGURATIONS",
      {}
    );
    if (AppConfigJsonData) {
      if (AppConfigJsonData.statusCode === 200) {
        if (AppConfigJsonData.response) {
          return fulfillWithValue(AppConfigJsonData.response?.Data);
        } else {
          return rejectWithValue(AppConfigJsonData.response?.Data);
        }
      } else {
        return rejectWithValue(AppConfigJsonData.response?.Data);
      }
    }
  }
);
export const loadPageConfigurations =
  (payload: { pageID: string; controlId: string }) =>
  (_: any, getState: any) => {
    const { pageID, controlId } = payload;
    const state = getState();
    const pageConfig = state.reservation.AppConfigJson?.find(
      (item: { PageId: string }) => item.PageId === pageID
    );
    if (!pageConfig) return null;

    const pageConfigJson = pageConfig.Controls.map((control: any) => {
      try {
        return JSON.parse(control.ControlJson);
      } catch (error) {
        console.error("Error parsing ControlJson:", error);
        return null;
      }
    });

    const controlConfig = pageConfigJson.find(
      (item: { id: string }) => item?.id === controlId
    );
    return controlConfig;
  };

//TO get the all reservations Data
export const getReservationsData = createAsyncThunk(
  "getReservationsData",
  async ({BookingTypeID,ServiceClassID,ProviderId,serviceId , ChangedDate}:{BookingTypeID: string,ServiceClassID: string, serviceId:string, ProviderId:string, ChangedDate:any}, { getState, rejectWithValue, fulfillWithValue }) => {
    const params = {
      SelectedBookingTypeID: BookingTypeID,
      SelectedServiceClassID: ServiceClassID,
      SelectedService:serviceId,
      SelectedProvider:ProviderId,
      SelectedDate:ChangedDate
    };
    const ReservationResponse = await postApiCall(
      "BOOKING_CONFIG_DATA",
      "GET_BOOKING_CONFIG_DATA",
      params
    );
    if (
      ReservationResponse.statusCode === 200 &&
      ReservationResponse.response?.ResponseCode === "Success"
    ) {
      if (ReservationResponse.response) {
        console.log(ReservationResponse.response, "----------------->>>>");
        
        return fulfillWithValue(ReservationResponse.response);
      } else {
        return rejectWithValue(ReservationResponse.response);
      }
    } else if (ReservationResponse.response?.ResponseMessage !== "") {
      Alert.alert("", ReservationResponse.response?.ResponseMessage);
    } else {
      return rejectWithValue(ReservationResponse.response);
    }
  }
);

const ReservationSlice = createSlice({
  name: "reservation",
  initialState: initialState,
  reducers: {
    setAddMemberIndex(state, action) {
      state.addMemberIndex = action.payload;
    },
    setAdddropDownIndex(state, action) {
      state.dropDownIndex = action.payload;
    },
    setOpenAddmemberModel(state, action) {
      state.OpenAddmemberModel = !state.OpenAddmemberModel;
    },
    setClosememberModel(state, action) {
      state.closeMemberModel = !state.closeMemberModel;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppConfiguration.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAppConfiguration.fulfilled, (state, action) => {
        state.loading = false;
        state.AppConfigJson = action.payload;
      })
      .addCase(getAppConfiguration.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getReservationsData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getReservationsData.fulfilled, (state, action) => {
        state.loading = false;
        state.reservationData = action.payload;
      })
      .addCase(getReservationsData.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {
  setAddMemberIndex,
  setAdddropDownIndex,
  setOpenAddmemberModel,
  setClosememberModel,
}: any = ReservationSlice.actions;

export default ReservationSlice.reducer;
