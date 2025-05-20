import { isPlatformWeb } from "@/components/constants/Matrices";
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
interface IProps {
  getMemberList?: ({ pageCount, searchChar, searchBy }) => void;
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
  loading?: boolean;
  formData?: Object;
  resetLoadedScreen?: () => void;
  singleMemberDetails?: any;
  addMembersForReservation?: () => void;
  resetSingleMemberDetails?: () => void;
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
  ChangeToGuest?: string;
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
  props?: any;
}
//webinterface
interface Member {
  id: string;
  name: string;
}
//webinterface

interface IState {
  activeTab: number;
  pageCount: number;
  checked: boolean;
  updatedMembersListData: {
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
  }[];
  singleMemberDetails: null | any;
  errorMessagePopup: boolean;
  errorMessageTxt: string;
  selectedGuest: string;
  showMemberModal: boolean;
  showGuestModal: boolean;
  hover: null | string;
  isChecked: Boolean;
  members: Member[];
  currentPage: number;
  startPage: number;
  membersPerPage: number;
  visiblePageLimit: number;
  date: null;
  showDatePicker: boolean;
  selectedService: "";
  selectedGender: "";
  addMemberIndex: null | number;
  selectedValue: null | string;
  screenWidth: number;
  Opencalender: boolean | null;
  selectedDate: string | null;
  selectedMembers: (Member | null)[];
}
interface SS {}
interface GuestDetails {
  firstName: string;
  lastName: string;
  Phone: string;
  email: string;
  gender: string;
  service: string;
  dateOfBirth: string | null; // depending on your actual data type
}

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
const maxSelectableItems = 2;
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
  membersMock = membersMock;
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeTab: 0,
      pageCount: 1,
      checked: false,
      updatedMembersListData: [],
      singleMemberDetails: null,
      errorMessagePopup: false,
      errorMessageTxt: "",
      selectedGuest: "Existing Guest",
      date: null,
      showDatePicker: false,
      selectedService: "",
      selectedGender: "",
      addMemberIndex: null,
      selectedValue: "Existing Guest",
      screenWidth: Dimensions.get("window").width,
      //webcode
      showMemberModal: false,
      showGuestModal: false,
      hover: null,
      isChecked: false,
      members: [
        { id: "#9851", name: "Alexa, Mathew" },
        { id: "#9851-1", name: "alexa, Roman" },
        { id: "#9851-2", name: "alexa, siddu" },
        { id: "#9851-3", name: "Alexander, MR Jake" },
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
        { id: "#9851-4", name: "Agran, Alex" },
        { id: "#9851-5", name: "Alexa, Mathew" },
        { id: "#9851-6", name: "alexa, Roman" },
        { id: "#9851-7", name: "alexa, siddu" },
        { id: "#9851-8", name: "Alexa, Mathew" },
      ],

      selectedMembers: Array(maxSelectableItems).fill(null),
      currentPage: 1,
      startPage: 1,
      membersPerPage: 16,
      visiblePageLimit: 10,
      selectedDate: null,
      Opencalender: false,
      //webcode
    };
    this.genderOptions = genderOptions;
    this.servicesOptions = servicesOptions;
  }

  componentDidMount(): void {
    if (!isPlatformWeb()) {
      this.props.getMemberList({
        pageCount: 1,
        searchChar: "All",
        searchBy: "",
      });
    }
    this.dimensionListener = Dimensions.addEventListener(
      "change",
      this.handleDimensionChange
    );
  }

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

    if (prevProps.formData !== this.props.formData) {
      const searchValue = getFormFieldDataSelector(
        this.props?.formData,
        pageId,
        "Search"
      );
      if (searchValue.value !== undefined) {
        setTimeout(() => {
          this.props.getMemberList({
            pageCount: this.state.pageCount,
            searchChar: "",
            searchBy: searchValue?.value,
          });
        }, 1000);
      }
    }
  }

  componentWillUnmount() {
    if (this.dimensionListener?.remove) {
      this.dimensionListener.remove();
    } else if (this.dimensionListener?.remove) {
      this.dimensionListener.remove();
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
    this.props.getMemberList({
      pageCount: 1,
      searchChar: currentValue.id,
      searchBy: "",
    });
  };
  navigateToReservation = () => {
    this.props.resetLoadedScreen();
  };
  loadMoreData = () => {
    this.setState({ pageCount: this.state.pageCount + 1 }, () => {
      this.props.getMemberList({
        pageCount: this.state.pageCount,
        searchChar: "All",
        searchBy: "",
      });
    });
  };
  toggleCheckbox = () => {
    this.setState((prevState) => ({
      checked: !prevState.checked,
    }));
  };

  addMemberForReservation = () => {
    if (this.props.singleItemDetails === null) {
      this.setState(
        {
          errorMessagePopup: true,
          errorMessageTxt: "Please enter at least one player details.",
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
    }
  };

  addNewGuest = async () => {
    const { formData, pageId } = this.props;
    const fields: Array<keyof GuestDetails> = [
      "firstName",
      "lastName",
      "Phone",
      "email",
    ];

    const guestDetails = fields.reduce((acc, fieldId) => {
      const field = getFormFieldDataSelector(formData, pageId, fieldId);
      acc[fieldId] = field.value || "";
      return acc;
    }, {} as GuestDetails);

    const combinedDetails = {
      ...guestDetails,
      gender: this.state.selectedGender,
      service: this.state.selectedService,
      dateOfBirth: this.state.date,
    };

    const payload = {
      GuestFirstName: combinedDetails?.firstName,
      GuestLastName: combinedDetails?.lastName,
      GuestTypeID: "FA6ABC0D-393E-4933-936D-0991A7BBC785",
      GuestDOB: combinedDetails?.dateOfBirth,
      GuestGender: combinedDetails?.gender,
      // MemberID: "1438",
      // ID: "57987FB5-35B6-4025-8D94-31076D833A56",
      GuestEmail: combinedDetails?.email,
      Category: "Reservations",
      GuestType: combinedDetails?.service,
      // ParentID: "7A890369-C6B1-4E64-B128-EED9FCC96048",
      GuestContact: combinedDetails?.Phone,
      Type: "BookingType",
    };

    const GuestPayload = {
      Type: "BookingType",
      // ParentID: "7A890369-C6B1-4E64-B128-EED9FCC96048",
      // ID: "57987FB5-35B6-4025-8D94-31076D833A56",
      GuestLastName: combinedDetails?.lastName,
      GuestGender: combinedDetails?.gender,
      GuestEmail: combinedDetails?.email,
      // MemberID: "1438",
      GuestDOB: combinedDetails?.dateOfBirth,
      GuestType: combinedDetails?.service,
      Category: "Reservations",
      EntityMode: "4",
      MemberGuestID: "",
      GuestFirstName: combinedDetails?.firstName,
      GuestContact: combinedDetails?.firstName,
      PageCount: 1,
    };

    const response = await postApiCall(
      "VALIDATE_NEW_GUEST",
      "VALIDATE_ADD_NEW_GUEST",
      payload
    );

    const apiResponse = response as ApiResponse;
    if (apiResponse.response?.ResponseCode === "Fail") {
      const errorMessage =
        apiResponse.response?.BrokenRules?.Fields?.join(", ") ||
        "An error occurred.";
      // console.log("Success:", "Successfully added guest.");
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
      const Guestresponse = await postApiCall(
        "NEW_GUEST",
        "ADD_NEW_GUEST",
        GuestPayload
      );
      console.log(Guestresponse, "secondapicall");
      if (Guestresponse?.response?.ResponseCode === "Fail") {
        const errorMessage =
          Guestresponse.response?.ResponseMessage || "An error occurred.";
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
      }
    } else {
      // Handle unexpected response codes
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

  selectedMember = (memberData) => {
    this.props.singleMemberDetails(memberData);

    const updatedData = this.state.updatedMembersListData.map((items) => {
      return {
        ...items,
        isMemberSelected: items.ID === memberData?.ID ? true : false,
      };
      return items;
    });

    this.setState({
      updatedMembersListData: updatedData,
      singleMemberDetails: memberData,
    });
  };

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

  //guest code
  setAddMemberIndex = (index: number) => {
    console.log("njnjnj", index);

    this.setState({ addMemberIndex: index });
  };

  handleShowDatePicker = () => {
    this.setState({ showDatePicker: true });
  };

  onDateChange = (event, selectedDate) => {
    console.log(selectedDate, "selectedDate");

    if (Platform.OS === "android") {
      this.setState({ showDatePicker: false });
    }
    if (selectedDate) {
      this.setState({ date: selectedDate });
    }
  };

  formatDate = (date) => {
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

  onWebDateChange = (date: any) => {
    const formattedDate = moment(new Date(date)).format("DD-MMM-YYYY");
    this.setState({ selectedDate: formattedDate });
    this.toggleCalendar();
  };

  navigateToService = () => {
    this.props?.props?.navigation?.navigate("ServiceUI");
  };

  //webaAddMutiple

  webselectedMember = (member) => {
    console.log(member, "member-----");

    const { selectedMembers } = this.state;

    // Check if already selected
    if (selectedMembers.find((m) => m?.id === member.id)) return;

    const firstEmptyIndex = selectedMembers.findIndex((m) => m === null);
    if (firstEmptyIndex !== -1) {
      const updated = [...selectedMembers];
      updated[firstEmptyIndex] = member;

      this.setState(
        { selectedMembers: updated },
        this.updateMemberSelectionState
      );
    }
  };

  removeSelectedMember = (index) => {
    const updated = [...this.state.selectedMembers];
    updated[index] = null;
    this.setState(
      { selectedMembers: updated },
      this.updateMemberSelectionState
    );
  };

  updateMemberSelectionState = () => {
    const selectedIds = this.state.selectedMembers
      .filter(Boolean)
      .map((m) => m.id);

    const updatedMembers = this.state.members.map((member) => ({
      ...member,
      isMemberSelected: selectedIds.includes(member.id),
    }));

    this.setState({ members: updatedMembers });
  };
}
