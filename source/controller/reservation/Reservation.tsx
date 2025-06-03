import { navigateToScreen } from "@/components/constants/Navigations";
import { Component, createRef } from "react";
import moment from "moment";
import { Dimensions, FlatList, Platform } from "react-native";
import { SingleBookingType } from "@/components/constants/Types";

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
  getReservationsData: ({ BookingTypeID, ServiceClassID }) => void;
  route: any;
  setOpenAddmemberModel?: () => void;
  setClosememberModel?: () => void;
  setOpenMembersModel?: () => void;
  setLoader?: () => void;
  OpenAddmemberModel?: boolean;
  OpenMemberModel?: boolean;
  closeMemberModel?: boolean;
  singleServiceItem?: SingleBookingType;
  reservationData?: any;
  ServiceClassID?: any;
}

interface Provider {
  ProviderID: string;
  ProviderImage: string;
  ProviderName: string;
}
[];
interface Service {
  ServiceID: string;
  ServiceImage: string;
  ServiceName: string;
}

interface AvailableTimeSlot {
  TimeSlot: string; // TimeSlot is a string, e.g., '06:00'
}

interface AvailableTimeCategory {
  TimeName: string; // e.g., 'Morning', 'Mid Day', 'Evening'
  TimeCat: string; // e.g., '06:00 AM - 12:00 PM'
  AvailableTimeSlots: AvailableTimeSlot[]; // Array of available time slots
}
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
  addMemberIndex: null | number;
  //webstate
  currentIndex: number;
  selectedItem: any;
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
  ProvidersData: Provider[];
  servicesOptions: Service[];
  serviceNames: string[];
  AvailableTimeCat: AvailableTimeCategory[];
  DefaultTimeCat:string
  IsLoading:boolean
  //webstateany
}

class ReservationLogic extends Component<Props, ControllerState> {
  flatListRef = createRef<FlatList>();
  //webcode
  dummydata: any;
  HeaderData: any;
  providersdummyData: any;
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
      addMemberIndex: null,
      //webstate
      currentIndex: 0,
      selectedItem: null,
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
      ProvidersData: null,
      servicesOptions: null,
      serviceNames: null,
      AvailableTimeCat: null,
      DefaultTimeCat:null,
      IsLoading:false
      //webstate
    };
  }

  
  componentDidMount(): void {
    // if(Platform.OS === "web"){
    //   this.props.setLoader()
    //   setTimeout(() => {
    //     this.props.setLoader()
    //   }, 2500);
    // }
    // let name = this.props?.route?.params?.serviceDetails?.title
    this.setState({
      mainServiceName: this.props?.route?.params?.serviceDetails?.title,
    });
    //webcode
    this.dimensionListener = Dimensions.addEventListener(
      "change",
      this.handleDimensionChange
    );
    let BookingId = this.props?.singleServiceItem[0]?.BookingTypeID;
    let ServiceClassId =
      this.props?.singleServiceItem[0]?.ServiceClass?.[0]?.ServiceClassID;
    this.props.getReservationsData({
      BookingTypeID: BookingId,
      ServiceClassID: ServiceClassId,
    });
  }
  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<ControllerState>,
    snapshot?: any
  ) {
    if (prevProps.reservationData !== this.props.reservationData) {
      const reservationData = this.props.reservationData;
      
      if (reservationData) {
        this.setState({IsLoading:true})
        const availableDates = reservationData?.AvailableDates || [];
        const lastDate = availableDates.length
          ? availableDates[availableDates.length - 1].Date
          : null;

        // Only perform mapping if the AvailableServices array has changed
        const serviceNames =
          reservationData?.AvailableServices?.map(
            (service) => service.ServiceName
          ) || [];
        const ProvidersDataNames =
          reservationData?.AvailableProviders?.map(
            (Provider) => Provider.ProviderName
          ) || [];

        if (this.state.serviceNames !== serviceNames) {
          this.setState({
            serviceNames:serviceNames,
            dateRange: availableDates,
            currentDate: reservationData?.DefaultDate,
            selectedItem: reservationData?.DefaultDate,
            sixtyDaysLater: lastDate,
            servicesOptions: reservationData?.AvailableServices,
            ProvidersData: ProvidersDataNames,
            AvailableTimeCat:reservationData?.AvailableTimeCat?.AvailableTimeCat,
            selectedTimePeriod:reservationData?.DefaultTimeCat
          });
        }
          this.setState({IsLoading:false})
      }
    }

    if (prevProps.route !== this.props.route) {
      const name = this.props?.route?.params?.serviceDetails?.title;
      if (name !== this.state.mainServiceName) {
        this.setState({ mainServiceName: name });
      }
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
    if (this.state.currentIndex > 7) {
      this.scrollToIndex(this.state.currentIndex - 7);
    } else {
      this.scrollToIndex(0);
    }
  };
  handleItemPress = (item: any, index: number) => {
    this.setState({ selectedItem: item?.Date });
  };
  toggleCalendar = () => {
    this.setState((prevState) => ({
      showCalendar: !prevState.showCalendar,
    }));
  };

  onDateChange = (date: any) => {
    const formattedDate = moment(new Date(date)).format("MM/DD/YYYY");
    const selectedItem = this.state.dateRange.find(
      (d: any) => d.Date === formattedDate
    );
    const selectedIndex = this.state.dateRange.findIndex(
      (d: any) => d.Date === formattedDate
    );
    if (selectedItem) {
      this.setState({ selectedItem: selectedItem?.Date }, () => {
        this.scrollToIndex(selectedIndex);
      });
    } else {
    }
    this.toggleCalendar();
  };

  handleSelectTimePeriod = (id: string) => {

    this.setState({ selectedTimePeriod: id });
  };

  getCurrentTimeSlots = () => {
    const selectedPeriod = this?.state?.AvailableTimeCat?.find(
      (period) => period?.TimeCat === this.state.selectedTimePeriod
    );
    return selectedPeriod?.AvailableTimeSlots || [];
  };

  handleSelectTime = (label: string, disabled?: boolean) => {
    if (disabled) return;
    this.setState({ selectedTime: label });
  };

  handleAddIconPress = (index: number, event: any) => {
    const { pageX, pageY } = event.nativeEvent;

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
    console.log(value, "value");
    
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

  handleCloseAllModels = () => {
    this.props.setClosememberModel();
    if (this.props.OpenAddmemberModel) {
      this.props.setOpenAddmemberModel();
    }
    if (this.props.OpenMemberModel) {
      this.props.setOpenMembersModel();
    }
  };
  setAddMemberIndex = (index: number) => {
    this.setState({ addMemberIndex: index });
  };

  navigateToService = () => {
    this.props?.navigation?.navigate("ServiceUI");
  };
}

export default ReservationLogic;
