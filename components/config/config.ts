
import { isPlatformAndroid, setApiUrl } from "../constants/Matrices";
// https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.CobaltDev/api/  ---->>> BA Dev
// export const baseURL = isPlatformAndroid()?"https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.EngDev/api/":global.apiURL;
// export const baseURL = "https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.EngDev/api/"     //---------->>> Dev url
// export const baseURL = "https://cobaltsandbox.ecssi.com/Services/MemberAppService.Wrapper/API/"  // Testing baseurl api
export const baseURL = "https://cobaltportal.mycobaltsoftware.com/CobaltSandbox/api/"  // sandbox baseurl api


export const endpoints = {
    AUTHENTICATE_USER: {
        AUTHENTICATE_USER: "Account/AuthenticateUser"
    },
    SERVICES: {
        GET_SERVICE_LIST: "Bookings/GetBMSBookingTypes"
    },
    UI_CONFIGURATIONS: {
        GET_UI_CONFIGURATIONS: "MobileOrdering/MO_GetControlsInfo"
    },
    PROFIT_CENTER: {
        GET_PROFIT_CENTERS: "MobileOrdering/MO_GetProfitCenters"
    },
    DASHBOARD: {
        GET_DASHBOARD: "Member/GetDashboard"
    },
    MEMBER_DIRECTORY: {
        GET_MEMBER_DIRECTORY: "Member/GetMemberSpouseList"
    },
    EXISTING_GUEST_DIRECTORY: {
        GET_EXISTING_GUEST_DIRECTORY: "Member/GetMemberExistingGuestList"
    },
    VALIDATE_NEW_GUEST: {
        VALIDATE_ADD_NEW_GUEST: "Member/GetGuestValidation"
    },
    NEW_GUEST: {
        ADD_NEW_GUEST: "golf/AddGuestList"
    },
    BOOKING_CONFIG_DATA: {
        GET_BOOKING_CONFIG_DATA: "Bookings/GetBookingConfigData"
    },
    APPOINTMENT_DATA: {
        SAVE_APPOINTMENT_DATA: "Bookings/SaveBookingAppointment"
    },
}
