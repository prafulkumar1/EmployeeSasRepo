import { MemberListType } from "@/components/constants/Types";
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
interface GuestData {
  MemberID: string;
  ID: string;
  ParentID: string;
  FirstName: string;
  LastName: string;
  MemberName: string;
  ProfilePic: string;
  IsMemberNotAllowed: number;
  RequestedBy: string;
  GuestVisitData: string;
  GuestFirstName: string;
  GuestLastName: string;
  GuestType: string;
  GuestPhone: string;
  GuestEmail: string;
  GuestDOB: string; // Format: MM/DD/YYYY
  GuestGender: string;
  IsActive: number;
  GuestIdentityID: string;
  GuestName: string;
  DietaryRestrictions: string;
  ModifyDietary: number;
  MemberGuestID: string;
  GuestTypeID: string;
  isMemberSelected: boolean;
}

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
  GuestListPerBatch?: GuestData[];
  loading?: boolean;
  formData?: Object;
  resetLoadedScreen?: () => void;
  singleMemberDetails?: any;
  setselectedMembersList?: any;
  addMembersForReservation?: () => void;
  removeMembersFromList?: (number) => void;
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
  selectedId?: any;
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
  membersList?: { isMemberSelected: boolean; id: string; memberName: string }[];
}
interface IState {
  activeTab: number;
  pageCount: number;
  checked: boolean;
  updatedMembersListData: MemberOrGuest[];
  updatedGuestListData: GuestData[];
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
      selectedMembers: Array.from(
        { length: this.props.addMemberList.length },
        (_, index) => ({
          number: index + 1,
          memberName: `Reservation ${index + 1}`,
          id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          isMemberSelected: false,
        })
      ),
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
    this.setState({ selectedMembers: this.props.addMemberList });
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
      const { memberListPerBatch, addMemberList } = this.props;

      // Collect all selected member IDs from addMemberList → singleMemberDetails.ID
      const selectedIds = addMemberList
        .map((item) => item?.singleMemberDetails?.ID)
        .filter(Boolean); // Remove null/undefined

      // Update each member in memberListPerBatch
      const updatedData = memberListPerBatch.map((item) => {
        return {
          ...item,
          isMemberSelected: selectedIds.includes(item.ID),
        };
      });

      this.setState({ updatedMembersListData: updatedData });
    }
    if (prevProps.GuestListPerBatch !== this.props.GuestListPerBatch) {
      const { GuestListPerBatch, addMemberList } = this.props;

      // Collect all selected member IDs from addMemberList → singleMemberDetails.ID
      const selectedIds = addMemberList
        .map((item) => item?.singleMemberDetails?.MemberGuestID)
        .filter(Boolean); // Remove null/undefined

      // Update each member in memberListPerBatch
      const updatedData = GuestListPerBatch.map((item) => {
        return {
          ...item,
          isMemberSelected: selectedIds.includes(item.MemberGuestID),
        };
      });

      this.setState({ updatedGuestListData: updatedData });
    }
    // if (prevState.selectedMembers !== this.state.selectedMembers) {
    //   this.setState({ selectedMembers: this.props.membersList });
    // }

    //Need to check this code How to handle search in mobile due this facing issue in new Guest create
    if (Platform.OS !== "web") {
      if (this.state.selectedGuest === "Existing Guest") {
        if (prevState.searchText !== this.state.searchText) {
          this.searchTimeout = setTimeout(() => {
            if (this.props.userType === "Member") {
              this.props.getMemberList({
                pageCount: this.state.pageCount,
                searchChar: "",
                searchBy: this.state.searchText,
              });
            } else {
              this.props.getExistingGuestList({
                pageCount: this.state.pageCount,
                searchChar: "",
                searchBy: this.state.searchText,
              });
            }
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

  formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
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
    const { updatedMembersListData, updatedGuestListData, selectedMembers } = this.state;

    const {
      userType,
      AddMultiple,
      membersCount,
      singleMemberDetails,
      setselectedMembersList,
    } = this.props;

    let updateList =
      userType !== "Member" ? updatedGuestListData : updatedMembersListData;

    // SINGLE SELECT MODE
    if (!AddMultiple) {
      singleMemberDetails(memberData);
      const updatedData = updateList.map((item) => ({
        ...item,
        isMemberSelected: item.ID === memberData?.ID,
      }));
      const updatedSelectedMembers = [
        {
          number: this.props.selectedId,
          memberName:
            memberData?.MemberName ||
            memberData?.DisplayName ||
            "Reservation 1",
          id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          isMemberSelected: true,
          singleMemberDetails: memberData,
        },
      ];
      const newState =
        userType !== "Member"
          ? {
              updatedMembersListData: [],
              updatedGuestListData: updatedData,
              singleMemberDetails: memberData,
            }
          : {
              updatedMembersListData: updatedData,
              updatedGuestListData: [],
              singleMemberDetails: memberData,
            };

      this.setState(newState, () => {
        setselectedMembersList(updatedSelectedMembers);
      });
      return;
    }

    // MULTI SELECT MODE
    const isAlreadySelected = memberData?.isMemberSelected;
    const selectedCount = selectedMembers.filter(
      (item) => item?.isMemberSelected === true
    ).length;
    // Block selection if limit reached
    if (selectedCount >= membersCount && !isAlreadySelected) {
      this.setState(
        {
          errorMessagePopup: true,
          errorMessageTxt: `You can only select up to ${membersCount} members.`,
        },
        () => {
          setTimeout(() => {
            this.setState({ errorMessagePopup: false, errorMessageTxt: "" });
          }, 2000);
        }
      );
      return;
    }

    // Update member list with toggle
    const updatedData = updateList.map((item) =>
      item.ID === memberData.ID
        ? { ...item, isMemberSelected: !item.isMemberSelected }
        : item
    );

    // Update selectedMembers array based on selection
    const updatedSelectedMembers = [...selectedMembers];

    if (isAlreadySelected) {
      // Deselect: clear the matching slot
      for (let i = 0; i < updatedSelectedMembers.length; i++) {
        if (
          updatedSelectedMembers[i].singleMemberDetails?.ID === memberData.ID
        ) {
          updatedSelectedMembers[i] = {
            ...updatedSelectedMembers[i],
            isMemberSelected: false,
            singleMemberDetails: null,
          };
          break;
        }
      }
    } else {
      // Select: place in first unselected slot
      const firstEmptyIndex = updatedSelectedMembers.findIndex(
        (item) => !item.isMemberSelected
      );

      if (firstEmptyIndex !== -1) {
        updatedSelectedMembers[firstEmptyIndex] = {
          ...updatedSelectedMembers[firstEmptyIndex],
          isMemberSelected: true,
          singleMemberDetails: memberData,
        };
      }
    }

    // Update state and callback
    this.setState(
      {
        updatedMembersListData: userType !== "Member" ? [] : updatedData,
        updatedGuestListData: userType !== "Member" ? updatedData : [],
        selectedMembers: updatedSelectedMembers,
      },
      () => {
        const filtered = updatedSelectedMembers.filter(
          (item) => item.singleMemberDetails !== null
        );
   
        setselectedMembersList(filtered);
      }
    );
  };
  removeSelectedMember = async (item: any, index: number) => {
    const { selectedMembers, updatedMembersListData } = this.state;
    const itemId = item?.singleMemberDetails?.ID;

    // 1. Update local updatedMembersListData
    const updatedUpdatedMembersListData = updatedMembersListData.map(
      (member) => {
        const memberId = member?.ID;

        if (memberId === itemId) {
          return {
            ...member,
            isMemberSelected: false,
          };
        }

        return member;
      }
    );

    // 2. Remove the selected member from local selectedMembers array
    const updatedSelectedMembersArray = [...selectedMembers];
    updatedSelectedMembersArray[index] = {
      number: index+1,
      memberName: `Reservation ${index + 1}`,
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      isMemberSelected: false,
    };

    // 3. Update local state
    this.setState(
      {
        selectedMembers: updatedSelectedMembersArray,
        updatedMembersListData: updatedUpdatedMembersListData,
      },
      () => {
        const nonNullSelectedMembers = updatedSelectedMembersArray.filter(
          (item) => item !== null
        );
        this.props.setselectedMembersList(nonNullSelectedMembers);

        // 🔥 Dispatch Redux action to update global membersList
        this.props.removeMembersFromList(item?.number);
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

  onWebDateChange = (date: string) => {
    const formattedDate: any = moment(new Date(date)).format("DD-MMM-YYYY");
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
    this.setState({ searchText: "" });
  };
  handleMemberDirtory = () => {
    this.props.setOpenMembersModel();
    this.props.setAddMultiple(false);
  };
}
