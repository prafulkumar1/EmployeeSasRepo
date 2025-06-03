// import React, { Component } from "react";
// import { Dimensions, ScaledSize } from "react-native";
// import { navigateToScreen } from "@/components/constants/Navigations";
// import { ServiceType } from "@/components/constants/Types";

// const pageId = "Service";
// interface IProps {
//     getServiceClasses?:() =>void
//     storeSingleService?:(serviceDetails:ServiceType) => void
//     serviceClassList:{
//       "BookingTypeID": string
//       "BookingTypeName": string
//       "ServiceClass": ServiceType[]
//     }[]
// }

// interface IState {
//   activeTab: any;
//   serviceTypes:
// }

// const ServiceData = {
//   BookingTypes: [
//     {
//       BookingTypeID: "cd123bjdbcjd",
//       BookingTypeName: "Tennis",
//       ServiceClass: [
//         {
//           ServiceClassID: "cd123bjdbcjd",
//           ServiceClassName: "Lesson",
//           ServiceClassImage: "https://res.cloudinary.com/people-matters/image/upload/q_auto,f_auto/v1545238540/1545238539.jpg",
//           ServiceClassDiscription: "this is a service",
//         },
//         {
//           ServiceClassID: "cd123bjdbcjd",
//           ServiceClassName: "Lesson2",
//           ServiceClassImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWztHZDKiYmBbSz5YifbfbioTtUTqEefwE4Q&s",
//           ServiceClassDiscription: "this is a service2",
//         },
//         {
//           ServiceClassID: "cd123bjdbcjd",
//           ServiceClassName: "Lesson",
//           ServiceClassImage: "https://res.cloudinary.com/people-matters/image/upload/q_auto,f_auto/v1545238540/1545238539.jpg",
//           ServiceClassDiscription: "this is a service",
//         },
//         {
//           ServiceClassID: "cd123bjdbcjd",
//           ServiceClassName: "Lesson2",
//           ServiceClassImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWztHZDKiYmBbSz5YifbfbioTtUTqEefwE4Q&s",
//           ServiceClassDiscription: "this is a service2",
//         },
//         {
//           ServiceClassID: "cd123bjdbcjd",
//           ServiceClassName: "Lesson",
//           ServiceClassImage: "https://res.cloudinary.com/people-matters/image/upload/q_auto,f_auto/v1545238540/1545238539.jpg",
//           ServiceClassDiscription: "this is a service",
//         },
//       ],
//     },
//     {
//       BookingTypeID: "cd123bjdbcjd",
//       BookingTypeName: "Spa",
//       ServiceClass: [
//         {
//           ServiceClassID: "cd123bjdbcjd",
//           ServiceClassName: "Spa Lesson",
//           ServiceClassImage: "https://example.com/images/living_room.jpg",
//           ServiceClassDiscription: "this is a service",
//         },
//         {
//           ServiceClassID: "cd123bjdbcjd",
//           ServiceClassName: "Spa Lesson2",
//           ServiceClassImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWztHZDKiYmBbSz5YifbfbioTtUTqEefwE4Q&s",
//           ServiceClassDiscription: "this is a service2",
//         },
//       ],
//     },
//   ],
// };

// export default class ServiceLogic extends Component<IProps, IState> {
//   dimensionChanges: any;
//   constructor(props: IProps) {
//     super(props);
//     this.state = {
//       activeTab: null,
//       serviceTypes: null,
//     };
//   }
//   componentDidMount() {
//     this.setState({activeTab :ServiceData.BookingTypes[0].BookingTypeName})
//     this.props.getServiceClasses()
//   }
//   navigateToReservation = (serviceDetails:ServiceType) => {
//     navigateToScreen(this.props, "ReservationUI", true, {
//       serviceDetails: serviceDetails,
//     });
//     this.props.storeSingleService(serviceDetails)
//   };
//   navigateToService =() => {
//     navigateToScreen(this.props, "ServiceUI", true, {})
// }
// }

import React, { Component } from "react";
import { Dimensions, ScaledSize } from "react-native";
import { navigateToScreen } from "@/components/constants/Navigations";
// import { ServiceType } from "@/components/constants/Types";

const pageId = "Service";
interface ServiceType {
  ServiceClassID: string;
  ServiceClassName: string;
  ServiceClassDiscription: string;
  ServiceClassImage?: string;
}

interface BookingType {
  BookingTypeID: string;
  BookingTypeName: string;
  ServiceClass: ServiceType[];
}

interface IProps {
  getServiceClasses?: () => void;
  storeSingleService?: (serviceDetails: any) => void;
  storeServiceClassID?: (ServiceClassID: any) => void;
  serviceClassList: BookingType[];
  Isshowbookintype: number;
}

interface IState {
  activeTab: string | null;
  serviceTypes: BookingType[] | null;
}

export default class ServiceLogic extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeTab: null,
      serviceTypes: [],
    };
  }

  componentDidMount() {
    if (this.props.getServiceClasses) {
      this.props.getServiceClasses();
    }
  }
  componentDidUpdate(prevProps: IProps) {
    if (prevProps.serviceClassList !== this.props.serviceClassList) {
      this.setState({
        serviceTypes: this.props.serviceClassList,
        activeTab: this.props.serviceClassList[0].BookingTypeName,
      });
    }

    if (
      this.props.Isshowbookintype === 0 &&
      prevProps.serviceClassList !== this.props.serviceClassList &&
      Array.isArray(this.props.serviceClassList)
    ) {
      const result = this.props.serviceClassList.filter(
        (item) =>
          Array.isArray(item.ServiceClass) && item.ServiceClass.length === 0
      );
      if (this.props.storeSingleService) {
        this.props.storeSingleService(result);
      }
      if (result.length > 0) {
        navigateToScreen(this.props, "ReservationUI", true, {
          serviceDetails: result,
        });
      }
    }
  }
  navigateToReservation = (serviceDetails: ServiceType) => {
    this.props.storeServiceClassID(serviceDetails?.ServiceClassID);
    const result = this.props.serviceClassList.find((item) =>
      item.ServiceClass.some(
        (service) => service.ServiceClassID === serviceDetails?.ServiceClassID
      )
    );
console.log(serviceDetails?.ServiceClassID, "serviceDetails");
console.log(result, "result");

    if (this.props.storeSingleService) {
      this.props.storeSingleService([result]);
    }
    if (result) {
      navigateToScreen(this.props, "ReservationUI", true, {
        serviceDetails: [result],
      });
    }
  };
}
