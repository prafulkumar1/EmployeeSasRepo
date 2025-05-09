import { isPlatformWeb } from '@/components/constants/Matrices';
import { navigateToScreen } from '@/components/constants/Navigations';
import { MemberListType } from '@/components/constants/Types';
import { getFormFieldDataSelector } from '@/components/redux/reducers/loginReducer';
import React, { Component } from 'react';
 
const pageId='MemberDirectory';

interface IProps {
  getMemberList?:({pageCount,searchChar,searchBy})=>void
  memberList?:{
    "IsLoadMore": number
    "Members": MemberListType[],
    "PageCount": number
    "RecordsPerPage": number
    "ResponseCode": string
    "ResponseMessage": string
    "TotalRecords": number
  }
  memberListPerBatch?:MemberListType[]
  loading?:boolean
  formData?:Object,
  resetLoadedScreen?:() =>void
  singleMemberDetails?:any
  addMembersForReservation?:() =>void
  resetSingleMemberDetails?:() =>void
  addMemberList?:any
  selectedMembersList?:{
    "id": string
    "isMemberSelected": boolean
    "memberName": string
    "number":number
    "singleMemberDetails": MemberListType[]
  }[]
  singleItemDetails?: MemberListType | null
  userType?:string,
  OpenMemberModel?:boolean,
  ChangeToGuest?:string,
  setOpenMembersModel?:()=> void
}
//webinterface
interface Member {
  id: string;
  name: string;
}
//webinterface
 
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
    showMemberModal:boolean
    showGuestModal:boolean
    hover:null | string
    isChecked: Boolean;
    members: Member[];
    currentPage: number;
    startPage: number;
    membersPerPage: number;
    visiblePageLimit: number,
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
        selectedGuest:"Existing Guest",
        //webcode
        showMemberModal:false,
        showGuestModal:false,
        hover:null,
        isChecked: false,
        members: [
          { id: "#0089", name: "’s, MR O’Fla" },
          { id: "#65432", name: "456, MR Vin123" },
          { id: "#0277", name: "a, Mr. appu" },
          { id: "#1438", name: "Abraham, Mr. James" },
          { id: "#1005", name: "Abraham, John" },
          { id: "#1752-A", name: "Abraham, Mrs. Sam" },
          { id: "#1202", name: "Abramson, mr Shelley" },
          { id: "#1224", name: "Adam, Dr Jose" },
          { id: "#6699", name: "Adelsheimer, Carol" },
          { id: "#1117-W", name: "Adelson, Mr. Seymour" },
          { id: "#4061", name: "Aery, Mr. Wayne" },
          { id: "#9851", name: "Agran, Alex" },
          { id: "#9851", name: "Alexa, Mathew" },
          { id: "#9851", name: "alexa, Roman" },
          { id: "#9851", name: "alexa, siddu" },
          { id: "#9851", name: "Alexander, MR Jake" },
          { id: "#9851", name: "Alexa, Mathew" },
          { id: "#9851", name: "alexa, Roman" },
          { id: "#9851", name: "alexa, siddu" },
          { id: "#9851", name: "alexa, siddu" },
  
          { id: "#0089", name: "’s, MR O’Fla" },
          { id: "#65432", name: "456, MR Vin123" },
          { id: "#0277", name: "a, Mr. appu" },
          { id: "#1438", name: "Abraham, Mr. James" },
          { id: "#1005", name: "Abraham, John" },
          { id: "#1752-A", name: "Abraham, Mrs. Sam" },
          { id: "#1202", name: "Abramson, mr Shelley" },
          { id: "#1224", name: "Adam, Dr Jose" },
          { id: "#6699", name: "Adelsheimer, Carol" },
          { id: "#1117-W", name: "Adelson, Mr. Seymour" },
          { id: "#4061", name: "Aery, Mr. Wayne" },
          { id: "#9851", name: "Agran, Alex" },
          { id: "#9851", name: "Alexa, Mathew" },
          { id: "#9851", name: "alexa, Roman" },
          { id: "#9851", name: "alexa, siddu" },
          { id: "#9851", name: "Alexander, MR Jake" },
          { id: "#9851", name: "Alexa, Mathew" },
          { id: "#9851", name: "alexa, Roman" },
          { id: "#9851", name: "alexa, siddu" },
          { id: "#9851", name: "alexa, siddu" },
  
          { id: "#0089", name: "’s, MR O’Fla" },
          { id: "#65432", name: "456, MR Vin123" },
          { id: "#0277", name: "a, Mr. appu" },
          { id: "#1438", name: "Abraham, Mr. James" },
          { id: "#1005", name: "Abraham, John" },
          { id: "#1752-A", name: "Abraham, Mrs. Sam" },
          { id: "#1202", name: "Abramson, mr Shelley" },
          { id: "#1224", name: "Adam, Dr Jose" },
          { id: "#6699", name: "Adelsheimer, Carol" },
          { id: "#1117-W", name: "Adelson, Mr. Seymour" },
          { id: "#4061", name: "Aery, Mr. Wayne" },
          { id: "#9851", name: "Agran, Alex" },
          { id: "#9851", name: "Alexa, Mathew" },
          { id: "#9851", name: "alexa, Roman" },
          { id: "#9851", name: "alexa, siddu" },
          { id: "#9851", name: "Alexander, MR Jake" },
          { id: "#9851", name: "Alexa, Mathew" },
          { id: "#9851", name: "alexa, Roman" },
          { id: "#9851", name: "alexa, siddu" },
          { id: "#9851", name: "alexa, siddu" },
  
          { id: "#0089", name: "’s, MR O’Fla" },
          { id: "#65432", name: "456, MR Vin123" },
          { id: "#0277", name: "a, Mr. appu" },
          { id: "#1438", name: "Abraham, Mr. James" },
          { id: "#1005", name: "Abraham, John" },
          { id: "#1752-A", name: "Abraham, Mrs. Sam" },
          { id: "#1202", name: "Abramson, mr Shelley" },
          { id: "#1224", name: "Adam, Dr Jose" },
          { id: "#6699", name: "Adelsheimer, Carol" },
          { id: "#1117-W", name: "Adelson, Mr. Seymour" },
          { id: "#4061", name: "Aery, Mr. Wayne" },
          { id: "#9851", name: "Agran, Alex" },
          { id: "#0089", name: "’s, MR O’Fla" },
          { id: "#65432", name: "456, MR Vin123" },
          { id: "#0277", name: "a, Mr. appu" },
          { id: "#1438", name: "Abraham, Mr. James" },
          { id: "#1005", name: "Abraham, John" },
          { id: "#1752-A", name: "Abraham, Mrs. Sam" },
          { id: "#1202", name: "Abramson, mr Shelley" },
          { id: "#1224", name: "Adam, Dr Jose" },
          { id: "#6699", name: "Adelsheimer, Carol" },
          { id: "#1117-W", name: "Adelson, Mr. Seymour" },
          { id: "#4061", name: "Aery, Mr. Wayne" },
          { id: "#9851", name: "Agran, Alex" },
          { id: "#0089", name: "’s, MR O’Fla" },
          { id: "#65432", name: "456, MR Vin123" },
          { id: "#0277", name: "a, Mr. appu" },
          { id: "#1438", name: "Abraham, Mr. James" },
          { id: "#1005", name: "Abraham, John" },
          { id: "#1752-A", name: "Abraham, Mrs. Sam" },
          { id: "#1202", name: "Abramson, mr Shelley" },
          { id: "#1224", name: "Adam, Dr Jose" },
          { id: "#6699", name: "Adelsheimer, Carol" },
          { id: "#1117-W", name: "Adelson, Mr. Seymour" },
          { id: "#4061", name: "Aery, Mr. Wayne" },
          { id: "#9851", name: "Agran, Alex" },
          { id: "#0089", name: "’s, MR O’Fla" },
          { id: "#65432", name: "456, MR Vin123" },
          { id: "#0277", name: "a, Mr. appu" },
          { id: "#1438", name: "Abraham, Mr. James" },
          { id: "#1005", name: "Abraham, John" },
          { id: "#1752-A", name: "Abraham, Mrs. Sam" },
          { id: "#1202", name: "Abramson, mr Shelley" },
          { id: "#1224", name: "Adam, Dr Jose" },
          { id: "#6699", name: "Adelsheimer, Carol" },
          { id: "#1117-W", name: "Adelson, Mr. Seymour" },
          { id: "#4061", name: "Aery, Mr. Wayne" },
          { id: "#9851", name: "Agran, Alex" },
          { id: "#0089", name: "’s, MR O’Fla" },
          { id: "#65432", name: "456, MR Vin123" },
          { id: "#0277", name: "a, Mr. appu" },
          { id: "#1438", name: "Abraham, Mr. James" },
          { id: "#1005", name: "Abraham, John" },
          { id: "#1752-A", name: "Abraham, Mrs. Sam" },
          { id: "#1202", name: "Abramson, mr Shelley" },
          { id: "#1224", name: "Adam, Dr Jose" },
          { id: "#6699", name: "Adelsheimer, Carol" },
          { id: "#1117-W", name: "Adelson, Mr. Seymour" },
          { id: "#4061", name: "Aery, Mr. Wayne" },
          { id: "#9851", name: "Agran, Alex" },
          { id: "#0089", name: "’s, MR O’Fla" },
          { id: "#65432", name: "456, MR Vin123" },
          { id: "#0277", name: "a, Mr. appu" },
          { id: "#1438", name: "Abraham, Mr. James" },
          { id: "#1005", name: "Abraham, John" },
          { id: "#1752-A", name: "Abraham, Mrs. Sam" },
          { id: "#1202", name: "Abramson, mr Shelley" },
          { id: "#1224", name: "Adam, Dr Jose" },
          { id: "#6699", name: "Adelsheimer, Carol" },
          { id: "#1117-W", name: "Adelson, Mr. Seymour" },
          { id: "#4061", name: "Aery, Mr. Wayne" },
          { id: "#9851", name: "Agran, Alex" },
          { id: "#0089", name: "’s, MR O’Fla" },
          { id: "#65432", name: "456, MR Vin123" },
          { id: "#0277", name: "a, Mr. appu" },
          { id: "#1438", name: "Abraham, Mr. James" },
          { id: "#1005", name: "Abraham, John" },
          { id: "#1752-A", name: "Abraham, Mrs. Sam" },
          { id: "#1202", name: "Abramson, mr Shelley" },
          { id: "#1224", name: "Adam, Dr Jose" },
          { id: "#6699", name: "Adelsheimer, Carol" },
          { id: "#1117-W", name: "Adelson, Mr. Seymour" },
          { id: "#4061", name: "Aery, Mr. Wayne" },
          { id: "#9851", name: "Agran, Alex" },
          { id: "#0089", name: "’s, MR O’Fla" },
          { id: "#65432", name: "456, MR Vin123" },
          { id: "#0277", name: "a, Mr. appu" },
          { id: "#1438", name: "Abraham, Mr. James" },
          { id: "#1005", name: "Abraham, John" },
          { id: "#1752-A", name: "Abraham, Mrs. Sam" },
          { id: "#1202", name: "Abramson, mr Shelley" },
          { id: "#1224", name: "Adam, Dr Jose" },
          { id: "#6699", name: "Adelsheimer, Carol" },
          { id: "#1117-W", name: "Adelson, Mr. Seymour" },
          { id: "#4061", name: "Aery, Mr. Wayne" },
          { id: "#9851", name: "Agran, Alex" },
          { id: "#0089", name: "’s, MR O’Fla" },
          { id: "#65432", name: "456, MR Vin123" },
          { id: "#0277", name: "a, Mr. appu" },
          { id: "#1438", name: "Abraham, Mr. James" },
          { id: "#1005", name: "Abraham, John" },
          { id: "#1752-A", name: "Abraham, Mrs. Sam" },
          { id: "#1202", name: "Abramson, mr Shelley" },
          { id: "#1224", name: "Adam, Dr Jose" },
          { id: "#6699", name: "Adelsheimer, Carol" },
          { id: "#1117-W", name: "Adelson, Mr. Seymour" },
          { id: "#4061", name: "Aery, Mr. Wayne" },
          { id: "#9851", name: "Agran, Alex" },
          { id: "#0089", name: "’s, MR O’Fla" },
          { id: "#65432", name: "456, MR Vin123" },
          { id: "#0277", name: "a, Mr. appu" },
          { id: "#1438", name: "Abraham, Mr. James" },
          { id: "#1005", name: "Abraham, John" },
          { id: "#1752-A", name: "Abraham, Mrs. Sam" },
          { id: "#1202", name: "Abramson, mr Shelley" },
          { id: "#1224", name: "Adam, Dr Jose" },
          { id: "#6699", name: "Adelsheimer, Carol" },
          { id: "#1117-W", name: "Adelson, Mr. Seymour" },
          { id: "#4061", name: "Aery, Mr. Wayne" },
          { id: "#9851", name: "Agran, Alex" },
        ],
        currentPage: 1,
        startPage: 1,
        membersPerPage: 16,
        visiblePageLimit: 10,
        //webcode
    };
  }

  componentDidMount(): void {
    if (!isPlatformWeb()) {
      this.props.getMemberList({
        pageCount: 1,
        searchChar: "All",
        searchBy: ""
      });
    }
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

    //webcode
    handleCheckBox = () => {
      const { isChecked } = this.state;
      this.setState({ isChecked: !isChecked });
    };
    getTotalPages() {
      return Math.ceil(this.state.members.length / this.state.membersPerPage);
    }

    getCurrentPageData = () => {
      const { currentPage, membersPerPage, members } = this.state;
      const startIndex = (currentPage - 1) * membersPerPage;
      return members.slice(startIndex, startIndex + membersPerPage);
    };

    handlePageChange = (page) => {
      const { visiblePageLimit } = this.state;
      const totalPages = this.getTotalPages();
  
      let newStartPage = this.state.startPage;
      if (
        page < this.state.startPage ||
        page >= this.state.startPage + visiblePageLimit
      ) {
        newStartPage = Math.max(
          Math.min(
            page - Math.floor(visiblePageLimit / 2),
            totalPages - visiblePageLimit + 1
          ),
          1
        );
      }
  
      this.setState({
        currentPage: page,
        startPage: newStartPage,
      });
    };
  
    handleFirstPage = () => {
      this.setState({ currentPage: 1, startPage: 1 });
    };
  
    handleLastPage = () => {
      const totalPages = this.getTotalPages();
      const { visiblePageLimit } = this.state;
      this.setState({
        currentPage: totalPages,
        startPage: Math.max(totalPages - visiblePageLimit + 1, 1),
      });
    };
  
    handleLeftPress = () => {
      const { currentPage } = this.state;
      if (currentPage > 1) {
        this.handlePageChange(currentPage - 1);
      }
    };
  
    handleRightPress = () => {
      const { currentPage } = this.state;
      console.log(currentPage, "currentPage");
  
      const totalPages = this.getTotalPages();
      if (currentPage < totalPages) {
        this.handlePageChange(currentPage + 1);
      }
    };
    //webcode
}
