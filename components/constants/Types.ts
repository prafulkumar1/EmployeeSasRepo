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