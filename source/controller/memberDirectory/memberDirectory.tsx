import { navigateToScreen } from '@/components/constants/Navigations';
import React, { Component } from 'react';
 
const pageId='MemberDirectory';

interface IProps {
  getMemberList:()=>void
  memberList:{
    "IsLoadMore": 1,
    "Members": {
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
    }[],
    "PageCount": number
    "RecordsPerPage": number
    "ResponseCode": string
    "ResponseMessage": string
    "TotalRecords": number
  }
}
 
interface IState {
    activeTab: number;
}
interface SS{}
 
const membersMock = [
    { id: "All" },
    { id: "A" },
    { id: "B" },
    { id: "C" },
    { id: "D" },
    { id: "E" },
    { id: "F" },
    { id: "G" },
    { id: "H" },
    { id: "I" },
    { id: "J" },
    { id: "K" },
    { id: "L" },
    { id: "M" },
    { id: "N" },
    { id: "O" },
    { id: "P" },
    { id: "Q" },
    { id: "R" },
    { id: "S" },
    { id: "T" },
    { id: "U" },
    { id: "V" },
    { id: "W" },
    { id: "X" },
    { id: "Y" },
    { id: "Z" },
  ];
 
export default class useMemberDirectoryLogic extends Component<IProps, IState,SS> {
  dimensionChanges: any;
  flatListRef:any = React.createRef();
  membersMock = membersMock;
  constructor(props: IProps) {
    super(props);
    this.state = {
 
        activeTab: 0,
    };
  }

  componentDidMount(): void {
    this.props.getMemberList()
  }
 
    scrollLeft = () => {
      const { activeTab } = this.state;
      if (activeTab > 0) {
        const newActiveTab = activeTab - 1;
        this.setState({ activeTab: newActiveTab }, () => this.scrollToTab(newActiveTab));
      }
    };
 
    scrollRight = () => {
      const { activeTab } = this.state;
      if (activeTab < membersMock.length - 1) {
        const newActiveTab = activeTab + 1;
        this.setState({ activeTab: newActiveTab }, () => this.scrollToTab(newActiveTab));
      }
    };
 
    scrollToTab = (index: number) => {
      this.flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    };
    navigateToReservation = () => {
      navigateToScreen(this.props,"AddMemberUI",true,{})
    }
}
