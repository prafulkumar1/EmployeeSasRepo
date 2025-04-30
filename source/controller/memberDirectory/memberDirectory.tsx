import { navigateToScreen } from '@/components/constants/Navigations';
import { MemberListType } from '@/components/constants/Types';
import { getFormFieldDataSelector } from '@/components/redux/reducers/loginReducer';
import React, { Component } from 'react';
 
const pageId='MemberDirectory';

interface IProps {
  getMemberList:({pageCount,searchChar,searchBy})=>void
  memberList:{
    "IsLoadMore": number
    "Members": MemberListType[],
    "PageCount": number
    "RecordsPerPage": number
    "ResponseCode": string
    "ResponseMessage": string
    "TotalRecords": number
  }
  memberListPerBatch:MemberListType[]
  loading:boolean
  formData:Object,
  resetLoadedScreen:() =>void
  singleMemberDetails:any
  addMembersForReservation:() =>void
  resetSingleMemberDetails:() =>void
  addMemberList:any
  selectedMembersList:{
    "id": string
    "isMemberSelected": boolean
    "memberName": string
    "number":number
    "singleMemberDetails": MemberListType[]
  }[]
  singleItemDetails: MemberListType | null
  userType:string
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
    errorMessagePopup:boolean
    errorMessageTxt:string
    selectedGuest:string
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
        singleMemberDetails:null,
        errorMessagePopup:false,
        errorMessageTxt:"",
        selectedGuest:"Existing Guest"
    };
  }

  componentDidMount(): void {
    this.props.getMemberList({pageCount:1,searchChar:"All",searchBy:""})
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: SS): void {
    if(prevProps.memberListPerBatch !== this.props.memberListPerBatch){  
      const updatedData = this.props.memberListPerBatch?.map((items) => {
        return {
          ...items,
          isMemberSelected: false,
        };
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
      if(this.props.singleItemDetails === null){
        this.setState({errorMessagePopup:true,errorMessageTxt:"Please enter at least one player details."},() => {
          setTimeout(() => {
            this.setState({errorMessagePopup:false,errorMessageTxt:""})
          }, 2000);
         })
      }else{
        this.props.resetLoadedScreen()
        this.props.addMembersForReservation()
        this.props.resetSingleMemberDetails()
      }
    }
  
    selectedMember = (memberData) => {
      this.props.singleMemberDetails(memberData);
      
      const updatedData = this.state.updatedMembersListData.map((items) => {
          return {
            ...items,
            isMemberSelected: items.ID === memberData?.ID?true:false,
          };
        return items;
      });
    
      this.setState({ 
        updatedMembersListData: updatedData, 
        singleMemberDetails: memberData 
      });
    }
}
