export interface MemberListType {
    "DefaultTransportaionType": string
    "DietaryRestrictions": string
    "DisplayName": string
    "FirstName": string
    "ID": string
    "IsMemberNotAllowed": number
    "IsSpouse":number
    "LastName":string
    "MemberID": string
    "MemberName":string
    "ModifyDietary": number
    "ParentID": string
    "ProfilePic": string
    "RequestedBy": string
  }

  // export interface ServiceType { 
  //   "ServiceClassDiscription": string, 
  //   "ServiceClassID": string, 
  //   "ServiceClassImage": string, 
  //   "ServiceClassName": string 
  // }

  export interface ServiceClassType {
  ServiceClassDescription: string;
  ServiceClassID: string;
  ServiceClassName: string;
}

export interface SingleBookingType {
  BookingTypeID: string;
  BookingTypeName: string;
  ServiceClass: ServiceClassType[];
}

export interface ServiceType {
  ServiceClassID: string;
  ServiceClassName: string;
  ServiceClassDiscription: string;
  ServiceClassImage?: string;
}

export interface BookingType {
  BookingTypeID: string;
  BookingTypeName: string;
  ServiceClass: ServiceType[];
}
export interface ApiResponse {
  response: {
    ResponseCode: string;
    ResponseMessage: string;
    BrokenRules: {
      Fields: string[];
    };
  };
  statusCode: number;
  statusText: string;
}