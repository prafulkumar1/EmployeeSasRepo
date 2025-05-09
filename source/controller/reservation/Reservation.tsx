import { navigateToScreen } from "@/components/constants/Navigations";
import { Component, createRef } from "react";
import moment from "moment";
import { Dimensions, FlatList } from "react-native";

//webinterface
interface Member {
  id: string;
  name: string;
}
//webinterface

export interface DateItem {
  id: string;
  day: string;
  date: number;
  month: string;
}

interface Props {
  navigation: any;
  getSlotBookingData: () => Promise<any>;
  slotData: DateItem[];
  loading: boolean;
  addMemberIndex: number;
  loadPageConfigurations: ({ pageId, controlId }) => void;
  route: any;
  setOpenAddmemberModel?:()=>void
  setClosememberModel?:()=>void
  setOpenMembersModel?:()=>void
  OpenAddmemberModel?:boolean
  OpenMemberModel?:boolean
  closeMemberModel?:boolean
}

//webdummydata
const mappedDates = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
  { id: "4", title: "Item 4" },
  { id: "5", title: "Item 5" },
  { id: "6", title: "Item 5" },
  { id: "7", title: "Item 5" },
  { id: "8", title: "Item 5" },
  { id: "9", title: "Item 5" },
  { id: "10", title: "Item 5" },
  { id: "11", title: "Item 5" },
  { id: "12", title: "Item 5" },
  { id: "13", title: "Item 5" },
  { id: "14", title: "Item 5" },
  { id: "15", title: "Item 5" },
  { id: "16", title: "Item 5" },
  { id: "17", title: "Item 5" },
  { id: "18", title: "Item 5" },
];

const servicesOptions = [
  { label: "Couple Massage - 1hr", value: "massage_1hr" },
  { label: "Deep Cleansing", value: "deep_cleansing" },
  { label: "Hydra Facial Treatment", value: "hydra_facial" },
];

const providersdummyData = [
  { label: "John smith", value: "massage_1hr" },
  { label: "Lyn", value: "deep_cleansing" },
  { label: "Hydra", value: "hydra_facial" },
];
const HeaderData = {
  Tennis: {
    values: ["First", "Second"],
    image: "https://via.placeholder.com/30?text=T",
  },
  "Tennis Booking": {
    values: ["First Booking", "Second Booking"],
    image: "https://via.placeholder.com/30?text=TB",
  },
  Salon: {
    values: ["Hair", "Nails"],
    image: "https://via.placeholder.com/30?text=S",
  },
  Spa: {
    values: ["Body", "Head"],
    image: "https://via.placeholder.com/30?text=S",
  },
  "Pickle clinic": {
    values: ["Hair", "Nails"],
    image: "https://via.placeholder.com/30?text=S",
  },
  "Pickle Ball": {
    values: ["Hair", "Nails"],
    image: "https://via.placeholder.com/30?text=S",
  },
  Sport: {
    values: ["golf", "cricket"],
    image: "https://via.placeholder.com/30?text=S",
  },
};

//webdummydata

export interface ControllerState {
  dates: DateItem[];
  selectedDateId: string | null;
  showCalendar: boolean;
  selectedService: string | null;
  isSelected: boolean;
  selectedGender: string;
  selectedTimePeriod: string | null;
  selectedTime: string;
  openDropdownIndex: number;
  serviceName: string;
  providerName: string;
  isServiceSelected: boolean;
  selectedDate: any;
  requiredDates: any;
  startIndex: number;
  loadingMore: boolean;
  calenderSelectedDate: string;
  mainServiceName: string;
  //webstate
  currentIndex: number;
  selectedItem: string;
  showModal: boolean;
  secondsLeft: number;
  comments: string;
  selectedCount: number;
  popupVisibleIndex: number | null;
  popupPosition: { top: number; left: number };
  showSecondModal: boolean;
  showMemberModal: boolean;
  selectedValue: string | null;
  hover: string;
  isChecked: Boolean;
  number: string;
  buddyList: boolean;
  // members: Member[];
  currentPage: number;
  startPage: number;
  membersPerPage: number;
  visiblePageLimit: number;
  perPage: number;
  screenWidth: number;
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
  singleMemberDetails: any;
  currentDate: null | string;
  sixtyDaysLater: null | string;
  dateRange: string[];
  showGuestModal: boolean;
  showplayedpopup: boolean;
  showThankModal: boolean;
  selectedKey: null | any;
  //webstate
}

class ReservationLogic extends Component<Props, ControllerState> {
  flatListRef = createRef<FlatList>();
  //webcode
  dummydata: any;
  HeaderData: any;
  providersdummyData: any;
  servicesOptions: any;
  dimensionListener: any;
  timer: NodeJS.Timeout | null = null;
  //webcode
  constructor(props: Props) {
    super(props);
    this.state = {
      dates: [],
      selectedDateId: null,
      showCalendar: false,
      selectedService: null,
      isSelected: false,
      selectedGender: "Male",
      selectedTimePeriod: "",
      selectedTime: "",
      openDropdownIndex: -1,
      serviceName: "",
      providerName: "",
      isServiceSelected: false,
      selectedDate: moment(),
      requiredDates: this.generateDates(),
      startIndex: 20,
      loadingMore: false,
      calenderSelectedDate: "",
      mainServiceName: "",
      //webstate
      currentIndex: 0,
      selectedItem: "",
      showModal: false,
      secondsLeft: 1200,
      comments: "",
      selectedCount: 1,
      popupVisibleIndex: null,
      popupPosition: { top: 0, left: 0 },
      showSecondModal: false,
      showMemberModal: false,
      selectedValue: null,
      hover: null,
      isChecked: false,
      buddyList: true,
      currentPage: 1,
      startPage: 1,
      perPage: 16,
      number: "",
      screenWidth: Dimensions.get("window").width,
      updatedMembersListData: [],
      singleMemberDetails: null,
      currentDate: null,
      sixtyDaysLater: null,
      dateRange: [],
      membersPerPage: 16,
      visiblePageLimit: 10,
      showGuestModal: false,
      showplayedpopup: false,
      showThankModal: false,
      selectedKey: null,
      //webstate
    };
    //wecode
    this.dummydata = mappedDates;
    this.servicesOptions = servicesOptions;
    this.providersdummyData = providersdummyData;
    this.HeaderData = HeaderData;
    //wecode
  }

  timeData = [
    {
      id: "morning",
      label: "Morning",
      time: "06:00 AM-12:00 PM (8)",
      slots: [
        { id: "1", label: "06:00" },
        { id: "2", label: "07:00" },
        { id: "3", label: "08:00", disabled: true },
        { id: "4", label: "08:30" },
        { id: "5", label: "09:00" },
        { id: "6", label: "09:30" },
        { id: "7", label: "10:00" },
        { id: "8", label: "10:30" },
        { id: "9", label: "11:00" },
      ],
    },
    {
      id: "midday",
      label: "Mid Day",
      time: "12:00 PM-6:00 PM (9)",
      slots: [
        { id: "1", label: "12:00" },
        { id: "2", label: "01:00" },
        { id: "3", label: "02:00", disabled: true },
        { id: "4", label: "03:30" },
        { id: "5", label: "04:00" },
      ],
    },
    {
      id: "evening",
      label: "Evening",
      time: "06:00 PM-11:00 PM (0)",
      slots: [],
    },
  ];
  //web handlers functions
  formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0"); // Pad single digits with leading zero
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()]; // Get full month name
    const year = date.getFullYear(); // Get full year

    return `${day}-${month}-${year}`; // Format as DD-MMMM-YYYY
  };
  //web handlers functions

  componentDidMount(): void {
    // let name = this.props?.route?.params?.serviceDetails?.title
    // console.log(this.props?.route?.params?.serviceDetails,"---1111111")
    this.setState({
      mainServiceName: this.props?.route?.params?.serviceDetails?.title,
    });
    //webcode
    this.dimensionListener = Dimensions.addEventListener(
      "change",
      this.handleDimensionChange
    );
    const date = new Date();
    date?.setDate(date.getDate() + 59); // Add 59 days to current date (60-day range)
    // Set state with formatted dates (strings)
    const dateRange = [];
    for (let i = 0; i <= 59; i++) {
      const newDate = new Date();
      newDate?.setDate(newDate?.getDate() + i);
      dateRange?.push(this?.formatDate(newDate));
    }

    this.setState({
      currentDate: this?.formatDate(new Date()),
      sixtyDaysLater: this?.formatDate(date),
      dateRange: dateRange,
      selectedItem: this?.formatDate(new Date()),
      selectedKey: Object?.keys(this?.HeaderData)?.[0],
    });
    //webcode
  }
  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<ControllerState>,
    snapshot?: any
  ): void {
    if (prevProps.route !== this.props.route) {
      let name = this.props?.route?.params?.serviceDetails?.title;
      this.setState({ mainServiceName: name });
    }
  }
  //webcode
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    if (this.dimensionListener?.remove) {
      this.dimensionListener.remove();
    }
  }

  handleDimensionChange = ({ window }) => {
    this.setState({ screenWidth: window.width });
  };

  formatTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  toggleMemberModel = () => {
    const { showMemberModal } = this.state;
    this.setState({
      showMemberModal: !showMemberModal,
    });
  };
  toggleGuestModel = () => {
    const { showGuestModal } = this.state;
    this.setState({
      showGuestModal: !showGuestModal,
    });
  };
  toggleMutiplePlayers = () => {
    const { showplayedpopup } = this.state;
    this.setState({
      showplayedpopup: !showplayedpopup,
    });
  };
  toggleThankModal = () => {
    const { showThankModal } = this.state;
    this.setState({
      showThankModal: !showThankModal,
    });
  };
  scrollToIndex = (index: number) => {
    this.flatListRef.current.scrollToIndex({ animated: true, index });
    // setCurrentIndex(index);
    this.setState({ currentIndex: index });
  };

  handleNext = () => {
    if (this.state.currentIndex < this.state.dateRange.length - 1) {
      this.scrollToIndex(this.state.currentIndex + 7);
    }
  };

  handlePrevious = () => {
    if (this.state.currentIndex > 0) {
      this.scrollToIndex(this.state.currentIndex - 7);
    }
  };
  handleItemPress = (item: any, index: number) => {
    this.setState({ selectedItem: item });
  };
  toggleCalendar = () => {
    this.setState((prevState) => ({
      showCalendar: !prevState.showCalendar,
    }));
  };

  onDateChange = (date: any) => {
    const formattedDate = moment(new Date(date)).format("DD-MMM-YYYY");
    const selecteditem = this.state.dateRange.find((d) => d === formattedDate);
    if (selecteditem) {
      this.setState({ selectedItem: selecteditem});
    } else {
    }
    this.toggleCalendar();
  };

  handleSelectTimePeriod = (id: string) => {
    this.setState({ selectedTimePeriod: id });
  };

  getCurrentTimeSlots = () => {
    const selectedPeriod = this.timeData.find(
      (period) => period.id === this.state.selectedTimePeriod
    );
    return selectedPeriod?.slots || [];
  };

  handleSelectTime = (label: string, disabled?: boolean) => {
    if (disabled) return;
    this.setState({ selectedTime: label });
  };

  handleAddIconPress = (index: number, event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    console.log(typeof index, "indexx");

    this.setState((prev) => ({
      popupVisibleIndex: prev.popupVisibleIndex === index ? null : index,
      popupPosition: { top: pageY, left: pageX },
    }));
  };
  handleRemoveMember = (indexToRemove: number) => {
    const { selectedCount } = this.state;

    // Ensure at least one member remains
    if (selectedCount <= 1) return;

    this.setState((prevState) => ({
      selectedCount: prevState.selectedCount - 1,
      popupVisibleIndex: null, // Close any open popup
    }));
  };

  // This will be called when a new option is selected
  handleSelect = (selectedItem: string, index) => {
    this.setState({
      selectedValue: selectedItem, // Save selected item to state
    });
    console.log("Selected value:", selectedItem);
  };


  selectedMember = (memberData: any) => {
    const updatedData = this.state.updatedMembersListData.map((items) => {
      return {
        ...items,
        isMemberSelected: items.ID === memberData?.ID ? true : false,
      };
    });
    this.setState({
      updatedMembersListData: updatedData,
      singleMemberDetails: memberData,
    });
  };
  //webcode
  handleSelectDate = (id: string) => {
    this.setState({ selectedDateId: id });
  };

  onDate = (date: string) => {
    this.toggleCalendar();
  };

  toggleSelect = () => {
    this.setState((prevState) => ({
      isSelected: !prevState.isSelected,
    }));

    console.log("isSelected (before update):", this.state.isSelected);
  };

  handleDropdownChange = (value: string) => {
    this.setState({ selectedService: value }, () => {
      console.log("Selected Service:", this.state.selectedService);
    });
  };
  navigateToAddMembers = () => {
    navigateToScreen(this.props, "AddMemberUI", true, {});
  };
  selectService = (value: string) => {
    this.setState({
      serviceName: value,
      isServiceSelected: !this.state.isServiceSelected,
    });
  };
  selectProvider = (value: string) => {
    this.setState({ providerName: value });
  };

  generateDates = (startIndex = 0, count = 60) => {
    const dates = [];
    const today = moment();
    for (let i = startIndex; i < startIndex + count; i++) {
      const date = moment(today).add(i, "days");
      dates.push({
        id: date.format("YYYY-MM-DD"),
        day: date.format("ddd"),
        month: date.format("MMM"),
        date: date.format("D"),
        fullDate: date.format("YYYY-MM-DD"),
      });
    }
    return dates;
  };

  onDateSelect = (date: string) => {
    this.setState({ selectedDate: date });
  };

  loadMoreDates = () => {
    if (this.state.loadingMore) return;

    this.setState({ loadingMore: true }, () => {
      const newDates = this.generateDates(this.state.startIndex, 20);
      this.setState((prevState) => ({
        requiredDates: [...prevState.requiredDates, ...newDates],
        startIndex: prevState.startIndex + 20,
        loadingMore: false,
      }));
    });
  };
  handleChangeDate = (date: string) => {
    const selectedDate = moment(date).format("YYYY-MM-DD");

    const index = this.state.requiredDates.findIndex(
      (dates: { id: string }) => dates.id === selectedDate
    );

    if (index !== -1 && this.flatListRef?.current) {
      this.flatListRef?.current.scrollToIndex({
        index,
        animated: true,
      });
    }

    this.setState({
      showCalendar: false,
      selectedDate: moment(date),
      selectedDateId: selectedDate,
    });
  };

  handleCloseAllModels = () =>{
      this.props.setClosememberModel(),
      this.props.setOpenAddmemberModel();
      if(this.props.OpenMemberModel){
        this.props.setOpenMembersModel();
      }
  }
  //
}

export default ReservationLogic;