
// https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.CobaltDev/api/  ---->>> BA Dev
// https://cobaltportal.mycobaltsoftware.com/MemberAppService.Wrapper.CobaltTest/API/  ------->>>>>> Testing

import { isPlatformAndroid } from "../constants/Matrices";

// https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.EngDev/api/   ---------->>> Dev url
export const baseURL = isPlatformAndroid()?"https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.EngDev/api/":global.apiURL;

export const endpoints = {
    UI_CONFIGURATIONS:{
        GET_UI_CONFIGURATIONS:"MobileOrdering/MO_GetControlsInfo"
    },
    PROFIT_CENTER: {
        GET_PROFIT_CENTERS: "MobileOrdering/MO_GetProfitCenters"
    },
    MENU_ORDER:{
        GET_MENU_ORDER_LIST:"MobileOrdering/MO_GetMenuItems",
        GET_MENU_ORDER_STATUS:"MobileOrdering/MO_GetItemStatus"
    },
    ITEM_MODIFIERS:{
        GET_ITEM_MODIFIERS:"MobileOrdering/MO_GetItemModifiers",
    },
    CART:{
        GET_CART_CONFIG:"MobileOrdering/MO_GetCartConfig",
        GET_CART_PRICE:"MobileOrdering/MO_GetCartPrice",
        PLACE_ORDER:"MobileOrdering/MO_SaveOrder",
    },
    RECENT_ORDERS:{
        GET_RECENT_ORDERS: "MobileOrdering/MO_getrecentorders"
    },
    FAVORITES:{
        GET_FAVORITES :"MobileOrdering/MO_getfavouriteitems",
        SAVE_FAVORITES:"MobileOrdering/MO_SaveFavourites"
    }
}
