import { navigateToScreen } from '@/components/constants/Navigations';
import { getFormFieldDataSelector } from '@/components/redux/reducers/loginReducer';
import React, { Component } from 'react';
 
const pageId='MemberDirectory';

interface IProps {
  getMemberList:({pageCount,searchChar,searchBy})=>void
  memberList:{
    "IsLoadMore": number
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
  memberListPerBatch:{
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
  }[]
  loading:boolean
  formData:Object,
  resetLoadedScreen:() =>void
  singleMemberDetails:any
  addMembersForReservation:() =>void
  addMemberList:any
}
 
interface IState {
    activeTab: number;
    pageCount:number
    checked:boolean
    updatedMembersListData:{
      "isMemberSelected": boolean;
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
    }[]
    singleMemberDetails:null|any
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
        pageCount:1,
        checked: false,
        updatedMembersListData:[],
        singleMemberDetails:null
    };
  }

  componentDidMount(): void {
    this.props.getMemberList({pageCount:1,searchChar:"All",searchBy:""})
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: SS): void {
    if(prevProps.memberListPerBatch !== this.props.memberListPerBatch){  
      const updatedData = this.props.memberListPerBatch?.map((items) => {
        const matchingMember = this.props.addMemberList?.find((item: any) => item?.singleMemberDetails?.ID === items?.ID);
        if (matchingMember) {
          return {
            ...items,
            isMemberSelected: true,
          };
        } else {
          return {
            ...items,
            isMemberSelected: false,
          };
        }
      });
        this.setState({updatedMembersListData:updatedData})
    }
  
    if(prevProps.formData !== this.props.formData){
      const searchValue = getFormFieldDataSelector(this.props?.formData, pageId, 'Search');
      if(searchValue.value !== undefined){
        setTimeout(() => {
          this.props.getMemberList({pageCount: this.state.pageCount, searchChar: "", searchBy: searchValue?.value});
        }, 1000);
      }
    }
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
      const currentValue = membersMock[index]
      this.props.getMemberList({pageCount:1,searchChar:currentValue.id,searchBy:""})
    };
    navigateToReservation = () => {
      this.props.resetLoadedScreen()
    }
    loadMoreData = () => {
      this.setState({pageCount:this.state.pageCount+1},() => {
        this.props.getMemberList({pageCount:this.state.pageCount,searchChar:"All",searchBy:""})
      })
    }
    toggleCheckbox = () => {
      this.setState(prevState => ({
        checked: !prevState.checked,
      }));
    };

    addMemberForReservation = () => {
      this.props.resetLoadedScreen()
      this.props.addMembersForReservation()
    }
  
    selectedMember = (memberData) => {
      this.props.singleMemberDetails(memberData);
      
      const updatedData = this.state.updatedMembersListData.map((items) => {
        if (items.ID === memberData?.ID) {
          return {
            ...items,
            isMemberSelected: !items.isMemberSelected,
          };
        }
        return items;
      });
    
      this.setState({ 
        updatedMembersListData: updatedData, 
        singleMemberDetails: memberData 
      });
    }
}
