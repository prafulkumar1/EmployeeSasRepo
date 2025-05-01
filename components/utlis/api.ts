import axios from "axios";
import { baseURL, endpoints } from "../config/config";
import * as DeviceInfo from 'expo-device';
import { setApiUrl } from "../constants/Matrices";
 
const api = axios.create({
    baseURL,
});
api.interceptors.request.use((request) => {
  console.log("Starting Request", request.url);
  return request;
});
 
api.interceptors.response.use((response) => {
  // console.log("Response:", JSON.stringify(response.data));
  return response;
});
export default api;

export const postApiCall = async (screenName: string, endpoint: string, params: any) => {
  try {
    // const commonParams = {
    //   "MemberID": global.memberID,
    //   "ID": global.memberID,
    //   "ParentID": "78F8EE9D-CF86-441D-86F8-29F8B9161B9F",
    //   "DeviceInfo": [
    //     {
    //       "DeviceType": DeviceInfo.deviceType,
    //       "OSVersion": DeviceInfo.osVersion,
    //       "OriginatingIP": "183.82.116.84",
    //       "SessionID": "iedtpmh83f860p0daqq75bhf76kbmmlt",
    //       "Browser": DeviceInfo.osName,
    //       "HostName": "183.82.116.84.actcorp.in",
    //       "SourcePortNo": "50189"
    //     }
    //   ],
    //   "IsAdmin": "0",
    //   "UserName": global.username,
    //   "Role": "Full Access",
    //   "UserId":global.userID,
    // };
    // const commonParams = {
    //   "MemberID": "EBC475B2-369A-496E-B8B2-AE7F4E846781",
    //   "ID": "EBC475B2-369A-496E-B8B2-AE7F4E846781",
    //   "ParentID": "78F8EE9D-CF86-441D-86F8-29F8B9161B9F",
    //   "DeviceInfo": [
    //     {
    //       "DeviceType": DeviceInfo.deviceType,
    //       "OSVersion": DeviceInfo.osVersion,
    //       "OriginatingIP": "183.82.116.84",
    //       "SessionID": "iedtpmh83f860p0daqq75bhf76kbmmlt",
    //       "Browser": DeviceInfo.osName,
    //       "HostName": "183.82.116.84.actcorp.in",
    //       "SourcePortNo": "50189"
    //     }
    //   ],
    //   "IsAdmin": "0",
    //   "UserName": "Wesselman, Bob",
    //   "Role": "Full Access",
    //   "UserId":"00026 - 00",
    // };
    const commonParams = {
      "EventID": "",
      "RequestId": "",
      "ReservationRequestTime": "04:00 AM",
      "DeviceInfo": [
        {
          "AppVersion": "2.8.3",
          "Browser": "Android",
          "DeviceModel": "vivo I2202",
          "DeviceType": "Android",
          "OSVersion": "14",
          "OriginatingIP": "100.71.128.227",
          "SessionID": "ebb06aa698d1538d",
          "SourcePortNo": "0"
        }
      ],
      "ID": "57987FB5-35B6-4025-8D94-31076D833A56",
      "MemberID": "1438",
      "ParentID": "7A890369-C6B1-4E64-B128-EED9FCC96048",
      "Type": "Golf",
      "PreferedSpaceDetailId": "",
      "ReservationRequestDate": [
        {
          "RequestDate": "2025-04-24"
        }
      ],
    };
    const finalParams = { ...commonParams, ...params };
    console.log('Params', commonParams); 
    let responseData = await api.post(
      `${baseURL}${endpoints[screenName][endpoint]}`,
      finalParams,
      {
        headers: {
          "Content-Type": "application/json",
          token: "",
        },
      }
    );

    return {
      response: responseData.data,
      statusCode: responseData.status,
      statusText: responseData.statusText,
    };
  } catch (error) {
    console.log(JSON.stringify(error))
  }
}
 
//No sonar
// const response = await api.get(endpoints, {
//   headers: {
//     "Content-Type": "application/json",
//     token: userToken,
//   },
// });
 
 
// const response = await api.post(endpoints,{},
//        {
//          headers: {
//            "Content-Type": "application/json",
//            token: userToken,
//          },
//        }
//      );
 
//No sonar
//  const response = await api.put(endpoints + id, {},
//    {
//      headers: {
//        "Content-Type": "application/json",
//        token: userToken,
//      },
//    }
//  );
 
//No sonar
//   const response = await api.delete(
//     endpoints + id,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         token: userToken,
//       },
//     }
//   );