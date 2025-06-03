import { MemberListType } from "@/components/constants/Types";
import { getFormFieldDataSelector } from "@/components/redux/reducers/memberDirectoryReducer";
import { postApiCall } from "@/components/utlis/api";
import React, { Component } from "react";
import { Dimensions, Platform } from "react-native";
import moment from "moment";

const pageId = "MemberDirectory";

const servicesOptions = [
  { label: "All" },
  { label: "Day Guest" },
  { label: "Dining Guest" },
  { label: "Family" },
  { label: "Golf Guest" },
  { label: "Golf Past date" },
  { label: "Nearer Guest" },
  { label: "Social" },
  { label: "Temp Guest" },
];

const genderOptions = [
  { label: "Male" },
  { label: "Female" },
  { label: "N/A" },
  { label: "Unknown" },
];
type MemberOrGuest = {
  isMemberSelected: boolean;
  DefaultTransportaionType: string;
  DietaryRestrictions: string;
  DisplayName: string;
  FirstName: string;
  ID: string;
  IsMemberNotAllowed: number;
  IsSpouse: number;
  LastName: string;
  MemberID: string;
  MemberName: string;
  ModifyDietary: number;
  ParentID: string;
  ProfilePic: string;
  RequestedBy: string;
};
interface IProps {
  getMemberList?: ({ pageCount, searchChar, searchBy }) => void;
  getExistingGuestList?: ({ pageCount, searchChar, searchBy }) => void;
  memberList?: {
    IsLoadMore: number;
    Members: MemberListType[];
    PageCount: number;
    RecordsPerPage: number;
    ResponseCode: string;
    ResponseMessage: string;
    TotalRecords: number;
  };
  memberListPerBatch?: MemberListType[];
  GuestListPerBatch?: MemberListType[];
  loading?: boolean;
  formData?: Object;
  resetLoadedScreen?: () => void;
  singleMemberDetails?: any;
  setselectedMembersList?: any;
  addMembersForReservation?: () => void;
  resetSingleMemberDetails?: () => void;
  resetMemberListPerBatch?: () => void;
  setAddMultiple?: (AddMultiple: boolean) => void;
  addMemberList?: any;
  selectedMembersList?: {
    id: string;
    isMemberSelected: boolean;
    memberName: string;
    number: number;
    singleMemberDetails: MemberListType[];
  }[];
  singleItemDetails?: MemberListType | null;
  userType?: string;
  OpenMemberModel?: boolean;
  memberDirectoryloading?: boolean;
  ChangeToGuest?: string;
  AddMultiple?: boolean;
  setOpenMembersModel?: () => void;
  setFormFieldData?: ({
    formId,
    controlType,
    controlId,
    controlValue,
    isInvalid,
    errorMessage,
  }) => void;
  pageId?: string;
  totalCount?: number;
  membersCount?: number;
  props?: any;
  setMembersList?: (memberCount: number) => void;
}
interface IState {
  activeTab: number;
  pageCount: number;
  checked: boolean;
  updatedMembersListData: MemberOrGuest[];
  updatedGuestListData: MemberOrGuest[];
  singleMemberDetails: null | any;
  selectMutiMemberDetails: null | any;
  errorMessagePopup: boolean;
  errorMessageTxt: string;
  selectedGuest: string;
  showMemberModal: boolean;
  showGuestModal: boolean;
  hover: null | string;
  isChecked: Boolean;
  currentPage: number;
  startPage: number;
  membersPerPage: number;
  visiblePageLimit: number;
  date: Date;
  showDatePicker: boolean;
  selectedService: "";
  selectedGender: "";
  addMemberIndex: null | number;
  screenWidth: number;
  Opencalender: boolean | null;
  selectedDate: string | null;
  selectedMembers: any;
  firstName: string;
  lastName: string;
  Phone: string;
  email: string;
  searchText: string;
}
interface SS {}

type FormField = "firstName" | "lastName" | "Phone" | "email";
interface ApiResponse {
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
export default class useMemberDirectoryLogic extends Component<
  IProps,
  IState,
  SS
> {
  dimensionChanges: any;
  servicesOptions: any;
  genderOptions: any;
  flatListRef: any = React.createRef();
  dimensionListener: any;
  private searchTimeout: NodeJS.Timeout | null = null;
  membersMock = membersMock;
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeTab: 0,
      pageCount: 1,
      checked: false,
      updatedMembersListData: [],
      updatedGuestListData: [],
      singleMemberDetails: null,
      selectMutiMemberDetails: null,
      errorMessagePopup: false,
      errorMessageTxt: "",
      selectedGuest: "Existing Guest",
      date: null,
      showDatePicker: false,
      selectedService: "",
      selectedGender: "",
      addMemberIndex: null,
      screenWidth: Dimensions.get("window").width,
      //webcode
      showMemberModal: false,
      showGuestModal: false,
      hover: null,
      isChecked: false,
      selectedMembers: Array(this?.props?.addMemberList?.length).fill(null),
      currentPage: 1,
      startPage: 1,
      membersPerPage: 25,
      visiblePageLimit: 10,
      selectedDate: null,
      Opencalender: false,
      //webcode
      firstName: "",
      lastName: "",
      Phone: "",
      email: "",
      searchText: "",
    };
    this.genderOptions = genderOptions;
    this.servicesOptions = servicesOptions;
  }

  componentDidMount(): void {
    this.fetchApiCall();
    this.dimensionListener = Dimensions.addEventListener(
      "change",
      this.handleDimensionChange
    );
  }

  fetchApiCall = () => {
    if (this.props.userType === "Member") {
      this.props.getMemberList({
        pageCount: 1,
        searchChar: "All",
        searchBy: "",
      });
    } else {
      this.props.getExistingGuestList({
        pageCount: 1,
        searchChar: "All",
        searchBy: "",
      });
    }
  };

  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: SS
  ): void {
    if (prevProps.memberListPerBatch !== this.props.memberListPerBatch) {
      const updatedData = this.props.memberListPerBatch?.map((items) => {
        return {
          ...items,
          isMemberSelected: false,
        };
      });
      this.setState({ updatedMembersListData: updatedData });
    }
    if (prevProps.GuestListPerBatch !== this.props.GuestListPerBatch) {
      console.log(
        "testinjfsnjnfjsnfn---------->>>>",
        this.props.GuestListPerBatch
      );

      const GuestupdatedData = this.props.GuestListPerBatch?.map((items) => {
        return {
          ...items,
          isMemberSelected: false,
        };
      });
      this.setState({ updatedGuestListData: GuestupdatedData });
    }

    //Need to check this code How to handle search in mobile due this facing issue in new Guest create
    if (Platform.OS !== "web") {
      if (this.state.selectedGuest === "Existing Guest") {
          if (this.state.searchText !== "") {
            this.searchTimeout = setTimeout(() => {
              this.props.getMemberList({
                pageCount: this.state.pageCount,
                searchChar: "",
                searchBy: this.state.searchText,
              });
            }, 1000);
          }
      }
    }
  }

  componentWillUnmount() {
    if (this.dimensionListener?.remove) {
      this.dimensionListener.remove();
    } else if (this.dimensionListener?.remove) {
      this.dimensionListener.remove();
    }
    this.setState({ updatedGuestListData: [] });
    this.setState({ updatedMembersListData: [] });
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }

  handleDimensionChange = ({ window }) => {
    this.setState({ screenWidth: window.width });
  };

  scrollLeft = () => {
    const { activeTab } = this.state;
    if (activeTab > 0) {
      const newActiveTab = activeTab - 1;
      this.setState({ activeTab: newActiveTab }, () =>
        this.scrollToTab(newActiveTab)
      );
    }
  };

  scrollRight = () => {
    const { activeTab } = this.state;
    if (activeTab < membersMock.length - 1) {
      const newActiveTab = activeTab + 1;
      this.setState({ activeTab: newActiveTab }, () =>
        this.scrollToTab(newActiveTab)
      );
    }
  };

  scrollToTab = (index: number) => {
    this.flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
    const currentValue = membersMock[index];
    if (this.props.userType === "Member") {
      this.props.getMemberList({
        pageCount: 1,
        searchChar: currentValue.id,
        searchBy: "",
      });
    } else {
      this.props.getExistingGuestList({
        pageCount: 1,
        searchChar: currentValue.id,
        searchBy: "",
      });
    }
  };
  navigateToReservation = () => {
    this.props.resetLoadedScreen();
  };
  loadMoreData = () => {
    this.setState({ pageCount: this.state.pageCount + 1 }, () => {
      this.fetchMemberListApi(this.state.pageCount);
    });
  };
  toggleCheckbox = () => {
    this.setState((prevState) => ({
      checked: !prevState.checked,
    }));
  };
  handleInputChange = (id: FormField, value: string) => {
    this.setState({ [id]: value } as Pick<IState, FormField>);
  };
  addMemberForReservation = () => {
    const { AddMultiple, selectedMembersList, singleItemDetails } = this.props;
    // Condition for AddMultiple = true and at least one member selected
    if (AddMultiple && selectedMembersList && selectedMembersList.length > 0) {
      this.props.resetLoadedScreen();
      this.props.addMembersForReservation();
      this.props.resetSingleMemberDetails();
      if (Platform.OS === "web") {
        this.props.setOpenMembersModel();
        this.props.setAddMultiple(false);
      }
      return;
    }

    // Fallback to single member if AddMultiple is false
    if (!singleItemDetails) {
      this.setState(
        {
          errorMessagePopup: true,
          errorMessageTxt: "Please enter at least one player detail.",
        },
        () => {
          setTimeout(() => {
            this.setState({ errorMessagePopup: false, errorMessageTxt: "" });
          }, 2000);
        }
      );
    } else {
      this.props.resetLoadedScreen();
      this.props.addMembersForReservation();
      this.props.resetSingleMemberDetails();
      if (Platform.OS === "web") {
        this.props.setOpenMembersModel();
        this.props.setAddMultiple(false);
      }
    }
  };

  formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };

  addNewGuest = async () => {
    const {
      firstName,
      lastName,
      Phone,
      email,
      selectedGender,
      selectedService,
      date,
    } = this.state;

    const combinedDetails = {
      firstName,
      lastName,
      Phone,
      email,
    };

    const GuestPayload = {
      // Type: "BookingType",
      GuestFirstName: combinedDetails?.firstName,
      GuestLastName: combinedDetails?.lastName,
      GuestType: selectedService,
      GuestGender: selectedGender,
      GuestEmail: combinedDetails?.email,
      GuestDOB: date,
      GuestContact: this.formatPhoneNumber(combinedDetails?.Phone),
      GuestTypeID: "3114F65F-9115-4BB0-BDC9-11B51AD2CB41",
      Category: "Reservations",
      EntityMode: "4",
      MemberGuestID: "",
      UserId: "10041",
      CompanyCode: "00",
    };

    // Directly call the first API for adding the new guest
    const response = await postApiCall(
      "NEW_GUEST",
      "ADD_NEW_GUEST",
      GuestPayload
    );
    const apiResponse = response as ApiResponse;

    if (apiResponse.response?.ResponseCode === "Fail") {
      const errorMessage =
        apiResponse.response?.ResponseMessage || "An error occurred.";
      this.setState(
        {
          errorMessagePopup: true,
          errorMessageTxt: errorMessage,
        },
        () => {
          setTimeout(() => {
            this.setState({ errorMessagePopup: false, errorMessageTxt: "" });
          }, 2000);
        }
      );
    } else if (apiResponse.response?.ResponseCode === "Success") {
      this.props.resetLoadedScreen();
      this.props.setOpenMembersModel();
      this.props.setAddMultiple(false);
    } else {
      this.setState(
        {
          errorMessagePopup: true,
          errorMessageTxt: "Unexpected error occurred.",
        },
        () => {
          setTimeout(() => {
            this.setState({ errorMessagePopup: false, errorMessageTxt: "" });
          }, 2000);
        }
      );
    }
  };

  selectedMember = (memberData: any) => {
    const { updatedMembersListData, selectedMembers, updatedGuestListData } =
      this.state;
    let UpdateGuestOrMemberList =
      this.props.userType !== "Member"
        ? updatedGuestListData
        : updatedMembersListData;
    if (!this.props.AddMultiple) {
      this.props.singleMemberDetails(memberData);
      const updatedData = UpdateGuestOrMemberList.map((item) => ({
        ...item,
        isMemberSelected: item.ID === memberData?.ID,
      }));
      if (this.props.userType !== "Member") {
        this.setState({
          updatedMembersListData: [],
          updatedGuestListData: updatedData,
          singleMemberDetails: memberData,
        });
      } else {
        this.setState({
          updatedMembersListData: updatedData,
          updatedGuestListData: [],
          singleMemberDetails: memberData,
        });
      }

      return;
    }

    const isMemberAlreadySelected = memberData?.isMemberSelected;
    const selectedCount = UpdateGuestOrMemberList?.filter(
      (item) => item?.isMemberSelected
    ).length;

    // Show error if max reached and user is trying to select a new member
    if (selectedCount >= this.props.membersCount && !isMemberAlreadySelected) {
      this.setState(
        {
          errorMessagePopup: true,
          errorMessageTxt: `You can only select up to ${this.props.membersCount} members.`,
        },
        () => {
          setTimeout(() => {
            this.setState({ errorMessagePopup: false, errorMessageTxt: "" });
          }, 2000);
        }
      );
      return;
    }

    // Toggle member selection
    const updatedData = UpdateGuestOrMemberList.map((item) => {
      if (item.ID === memberData.ID) {
        return {
          ...item,
          isMemberSelected: !item.isMemberSelected,
        };
      }
      return item;
    });

    // Update selectedMembers array from the toggled list
    const updatedSelectedMembers = updatedData.filter(
      (item) => item.isMemberSelected
    );

    // Fill nulls where needed
    const updatedSelectedMembersArray = Array(this.props.membersCount).fill(
      null
    );
    updatedSelectedMembers.forEach((member, index) => {
      updatedSelectedMembersArray[index] = member;
    });

    this.setState(
      {
        updatedMembersListData: updatedData,
        selectMutiMemberDetails: memberData,
        selectedMembers: updatedSelectedMembersArray,
      },
      () => {
        this.props.setselectedMembersList(updatedSelectedMembers);
      }
    );
  };

  removeSelectedMember = async (item: any, index: number) => {
    const { selectedMembers, updatedMembersListData } = this.state;

    // 2. Update `updatedMembersListData` to deselect the member (set `isMemberSelected` to false)
    const updatedUpdatedMembersListData = await updatedMembersListData.map(
      (member) => {
        if (member.ID === item.ID) {
          console.log(member.ID === item.ID, "member.ID === item.ID");
          return {
            ...member,
            isMemberSelected: false,
          };
        }
        return member;
      }
    );
    // 1. Remove the selected member from `selectedMembers` array (set index back to null)
    const updatedSelectedMembersArray = [...selectedMembers];
    updatedSelectedMembersArray[index] = null;
    // 3. Update the state with the updated arrays
    this.setState(
      {
        selectedMembers: updatedSelectedMembersArray,
        updatedMembersListData: updatedUpdatedMembersListData,
      },
      () => {
        // Optionally, update the parent component's selected members list, if needed
        const nonNullSelectedMembers = updatedSelectedMembersArray.filter(
          (item) => item !== null
        );
        this.props.setselectedMembersList(nonNullSelectedMembers);
      }
    );
  };

  handleCheckBox = () => {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
  };
  getTotalPages() {
    const { membersPerPage } = this.state;
    const totalMembers = this.props.totalCount || 0;
    return Math.ceil(totalMembers / membersPerPage);
  }

  getCurrentPageData = () => {
    const { updatedMembersListData, updatedGuestListData } = this.state;
    console.log(this.props.userType, "this.props.userType");

    let UpdateGuestOrMemberList =
      this.props.userType !== "Member"
        ? updatedGuestListData
        : updatedMembersListData;
    return UpdateGuestOrMemberList;
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

    // Set pagination state
    this.setState({
      currentPage: page,
      startPage: newStartPage,
    });

    this.fetchMemberListApi(page);
  };

  fetchMemberListApi = (page) => {
    // Fetch data for that page
    if (this.props.userType === "Member") {
      this.props.getMemberList({
        pageCount: page,
        searchChar: "All",
        searchBy: "",
      });
    } else {
      this.props.getExistingGuestList({
        pageCount: page,
        searchChar: "All",
        searchBy: "",
      });
    }
  };
  handleFirstPage = () => {
    this.setState({ currentPage: 1, startPage: 1 });
    this.fetchMemberListApi(1);
  };

  handleLastPage = () => {
    const totalPages = this.getTotalPages();
    const { visiblePageLimit } = this.state;
    this.setState({
      currentPage: totalPages,
      startPage: Math.max(totalPages - visiblePageLimit + 1, 1),
    });
    this.fetchMemberListApi(totalPages);
    this.getCurrentPageData();
  };

  handleLeftPress = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.handlePageChange(currentPage - 1);
    }
  };

  handleRightPress = () => {
    const { currentPage } = this.state;
    const totalPages = this.getTotalPages();
    if (currentPage < totalPages) {
      this.handlePageChange(currentPage + 1);
    }
  };
  //webcode

  //guest code
  setAddMemberIndex = (index: number) => {
    this.setState({ addMemberIndex: index });
  };

  handleShowDatePicker = () => {
    this.setState({ showDatePicker: true });
  };

  onDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      this.setState({ showDatePicker: false });
    }
    if (selectedDate) {
      this.setState({ date: selectedDate });
    }
  };

  formatDate = (date: string | number | Date) => {
    if (!date) return "";
    const d = new Date(date);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  selectService = (value) => {
    this.setState({ selectedService: value });
  };

  selectGender = (value) => {
    this.setState({ selectedGender: value });
  };
  toggleCalendar = () => {
    this.setState((prevState) => ({
      Opencalender: !prevState.Opencalender,
    }));
  };

  onWebDateChange = (date:string) => {
    const formattedDate:any = moment(new Date(date)).format("DD-MMM-YYYY");
    this.setState({ selectedDate: formattedDate });
    this.setState({ date: formattedDate });
    this.toggleCalendar();
  };

  navigateToService = () => {
    this.props?.props?.navigation?.navigate("ServiceUI");
    this.props.resetLoadedScreen();
  };

  //WebSearchbyCharHandler
  handleSearchMemberByChar = () => {
    if (this.state.searchText !== undefined || this.state.searchText !== "") {
      setTimeout(() => {
        if (this.props.userType === "Member") {
          this.props.getMemberList({
            pageCount: this.state.pageCount,
            searchChar: "All",
            searchBy: this.state.searchText,
          });
        } else {
          this.props.getExistingGuestList({
            pageCount: this.state.pageCount,
            searchChar: "All",
            searchBy: this.state.searchText,
          });
        }
      }, 1000);
    }
  };
  handleClear = () => {
    // this.props.setFormFieldData({
    //   formId: pageId,
    //   controlType: "input",
    //   controlId: "Search",
    //   controlValue: "",
    //   isInvalid: false,
    //   errorMessage: "",
    // });
   this.setState({searchText:""})
  };
  handleMemberDirtory = () => {
    this.props.setOpenMembersModel();
    this.props.setAddMultiple(false);
  };
}
