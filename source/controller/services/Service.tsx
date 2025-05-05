import React, { Component } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import { navigateToScreen } from '@/components/constants/Navigations';

const pageId = 'Service';

interface IProps {}

interface IState {
    activeTab: number;
    serviceTypes:{ type: string,id:number,isSelected:boolean }[],
}

const serviceTypes = [
    { type: "Pickle",id:1,isSelected:true },
    { type: "Tennis",id:2,isSelected:false },
    { type: "Paddle",id:3,isSelected:false },
];

const cards = [
    { title: "LESSON BRYAN T 1 HR", duration: "1 HR", icon: require("@/assets/images/icons/Home3x.png") },
    { title: "LESSON BRYAN T 1.5 HR", duration: "1.5 HR", icon: require("@/assets/images/icons/Home3x.png") },
    { title: "LESSON BRYAN T 1/2 HR", duration: "1/2 HR", icon: require("@/assets/images/icons/Home3x.png") },
    { title: "LESSON SAM W 1 HR", duration: "1 HR", icon: require("@/assets/images/icons/Home3x.png") },
    { title: "LESSON SAM W 1.5 HR", duration: "1.5 HR", icon: require("@/assets/images/icons/Home3x.png") },
    { title: "LESSON SAM W 1/2 HR", type: "image", image: "https://t3.ftcdn.net/jpg/02/87/04/00/360_F_287040077_U2ckmhpzeyqDHiybj0dfCfX6NRCEKdoe.jpg" },
    { title: "TENNIS/PICKLEBALL", type: "image", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKyPqI6cJ_Jsh7pVwPo_geO3nhUDkreoQSg&s", },
];

export default class ServiceLogic extends Component<IProps, IState> {
  dimensionChanges: any;
  cards = cards;
  constructor(props: IProps) {
    super(props);
    this.state = {
        activeTab: 0,
        serviceTypes:serviceTypes
    };
  }
    navigateToReservation =(serviceDetails:any) => {
        navigateToScreen(this.props, "ReservationUI", true, {serviceDetails:serviceDetails})
    }
    handleActiveService = (id:number) => {
        let toggleUpdateService = this.state.serviceTypes.map((items) => {
            return{
                ...items,
                isSelected:items.id === id ? true:false
            }
        })
        this.setState({serviceTypes:toggleUpdateService})
    }
 
}