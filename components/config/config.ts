
// https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.CobaltDev/api/  ---->>> BA Dev
// https://cobaltportal.mycobaltsoftware.com/MemberAppService.Wrapper.CobaltTest/API/  ------->>>>>> Testing

import { isPlatformAndroid, setApiUrl } from "../constants/Matrices";

// https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.EngDev/api/   ---------->>> Dev url
// export const baseURL = isPlatformAndroid()?"https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.EngDev/api/":global.apiURL;
// export const baseURL = "https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.EngDev/api/"
export const baseURL = "https://cobaltportal.mycobaltsoftware.com/MemberAppService.Wrapper.CobaltTest/API/"  // Testing baseurl api

export const endpoints = {
    AUTHENTICATE_USER:{
        AUTHENTICATE_USER : "Account/AuthenticateUser"
    },
    SERVICES:{
        GET_SERVICE_LIST : "Bookings/GetBmsBookingTypes"
    },
    UI_CONFIGURATIONS:{
        GET_UI_CONFIGURATIONS:"MobileOrdering/MO_GetControlsInfo"
    },
    PROFIT_CENTER: {
        GET_PROFIT_CENTERS: "MobileOrdering/MO_GetProfitCenters"
    },
   DASHBOARD:{
    GET_DASHBOARD:"Member/GetDashboard"
   },
   MEMBER_DIRECTORY:{
    GET_MEMBER_DIRECTORY:"Member/GetMemberSpouseList"
   },
   VALIDATE_NEW_GUEST:{
    VALIDATE_ADD_NEW_GUEST:"Member/GetGuestValidation"
   },
   NEW_GUEST:{
    ADD_NEW_GUEST:"Golf/AddGuestList"
   },
}
