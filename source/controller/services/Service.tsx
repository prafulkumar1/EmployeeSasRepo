import React, { Component } from "react";
import { Dimensions, ScaledSize } from "react-native";
import { navigateToScreen } from "@/components/constants/Navigations";
import { ServiceType } from "@/components/constants/Types";

const pageId = "Service";
interface IProps {
    getServiceClasses?:() =>void
    storeSingleService?:(serviceDetails:ServiceType) => void
    serviceClassList:{
      "BookingTypeID": string
      "BookingTypeName": string
      "ServiceClass": ServiceType[]
    }[]
}

interface IState {
  activeTab: any;
  serviceTypes: { type: string; id: number; isSelected: boolean }[];
}

const serviceTypes = [
  { type: "Fitness", id: 1, isSelected: true },
  { type: "Spa", id: 3, isSelected: false },
  { type: "Salon", id: 2, isSelected: false },
];

const cards = [
  {
    title: "Aerobic Instruction",
    duration: "1 HR",
    icon: require("@/assets/images/icons/Home3x.png"),
  },
  {
    title: "Personal Training",
    duration: "1.5 HR",
    icon: require("@/assets/images/icons/Home3x.png"),
  },
  {
    title: "Nutrition Programs",
    duration: "1/2 HR",
    icon: require("@/assets/images/icons/Home3x.png"),
  },
  {
    title: "Private Tai Chi Training 55 Min ",
    duration: "1 HR",
    icon: require("@/assets/images/icons/Home3x.png"),
  },
  // { title: "LESSON SAM W 1.5 HR", duration: "1.5 HR", icon: require("@/assets/images/icons/Home3x.png") },
  // { title: "LESSON SAM W 1/2 HR", type: "image", image: "https://t3.ftcdn.net/jpg/02/87/04/00/360_F_287040077_U2ckmhpzeyqDHiybj0dfCfX6NRCEKdoe.jpg" },
  // { title: "TENNIS/PICKLEBALL", type: "image", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKyPqI6cJ_Jsh7pVwPo_geO3nhUDkreoQSg&s", },
];

const ServiceData = {
  BookingTypes: [
    {
      BookingTypeID: "cd123bjdbcjd",
      BookingTypeName: "Tennis",
      ServiceClass: [
        {
          ServiceClassID: "cd123bjdbcjd",
          ServiceClassName: "Lesson",
          ServiceClassImage: "https://res.cloudinary.com/people-matters/image/upload/q_auto,f_auto/v1545238540/1545238539.jpg",
          ServiceClassDiscription: "this is a service",
        },
        {
          ServiceClassID: "cd123bjdbcjd",
          ServiceClassName: "Lesson2",
          ServiceClassImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWztHZDKiYmBbSz5YifbfbioTtUTqEefwE4Q&s",
          ServiceClassDiscription: "this is a service2",
        },
        {
          ServiceClassID: "cd123bjdbcjd",
          ServiceClassName: "Lesson",
          ServiceClassImage: "https://res.cloudinary.com/people-matters/image/upload/q_auto,f_auto/v1545238540/1545238539.jpg",
          ServiceClassDiscription: "this is a service",
        },
        {
          ServiceClassID: "cd123bjdbcjd",
          ServiceClassName: "Lesson2",
          ServiceClassImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWztHZDKiYmBbSz5YifbfbioTtUTqEefwE4Q&s",
          ServiceClassDiscription: "this is a service2",
        },
        {
          ServiceClassID: "cd123bjdbcjd",
          ServiceClassName: "Lesson",
          ServiceClassImage: "https://res.cloudinary.com/people-matters/image/upload/q_auto,f_auto/v1545238540/1545238539.jpg",
          ServiceClassDiscription: "this is a service",
        },
      ],
    },
    {
      BookingTypeID: "cd123bjdbcjd",
      BookingTypeName: "Spa",
      ServiceClass: [
        {
          ServiceClassID: "cd123bjdbcjd",
          ServiceClassName: "Spa Lesson",
          ServiceClassImage: "https://example.com/images/living_room.jpg",
          ServiceClassDiscription: "this is a service",
        },
        {
          ServiceClassID: "cd123bjdbcjd",
          ServiceClassName: "Spa Lesson2",
          ServiceClassImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWztHZDKiYmBbSz5YifbfbioTtUTqEefwE4Q&s",
          ServiceClassDiscription: "this is a service2",
        },
      ],
    },
  ],
};

export default class ServiceLogic extends Component<IProps, IState> {
  dimensionChanges: any;
  cards = cards;
  ServiceData = ServiceData;
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeTab: null,
      serviceTypes: serviceTypes,
    };
  }
  componentDidMount() {
    this.setState({activeTab :ServiceData.BookingTypes[0].BookingTypeName})
    this.props.getServiceClasses()
  }
  navigateToReservation = (serviceDetails:ServiceType) => {
    navigateToScreen(this.props, "ReservationUI", true, {
      serviceDetails: serviceDetails,
    });
    this.props.storeSingleService(serviceDetails)
  };
  navigateToService =() => {
    navigateToScreen(this.props, "ServiceUI", true, {})
}
}
