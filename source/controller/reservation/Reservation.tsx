import { navigateToScreen } from "@/components/constants/Navigations";
import { Component, createRef } from "react";
import moment from 'moment';
import { FlatList } from "react-native";

export interface DateItem {
  id: string;
  day: string;
  date: number;
  month: string;
}

interface Props {
  navigation:any
  getSlotBookingData: () => Promise<any>;
  slotData: DateItem[];
  loading: boolean;
  addMemberIndex:number
  loadPageConfigurations:({pageId, controlId}) =>void
}

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
  serviceName: string,
  providerName: string,
  isServiceSelected:boolean
  selectedDate:any
  requiredDates:any
  startIndex:number
  loadingMore:boolean
  calenderSelectedDate:string
}

class ReservationLogic extends Component<Props, ControllerState> {
  flatListRef = createRef<FlatList>();
  constructor(props: Props) {
    super(props);
    this.state = {
      dates: [],
      selectedDateId: null,
      showCalendar: false,
      selectedService: null,
      isSelected: false,
      selectedGender: 'Male',
      selectedTimePeriod: "",
      selectedTime: "",
      openDropdownIndex: -1, 
      serviceName: '',
      providerName: '',
      isServiceSelected:false,
      selectedDate: moment(),
      requiredDates: this.generateDates(),
      startIndex: 20,
      loadingMore: false,
      calenderSelectedDate : ""
    };
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
        { id: "9", label: "11:00" }
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
        { id: "5", label: "04:00" }
       
      ],
    },
    {
      id: "evening",
      label: "Evening",
      time: "06:00 PM-11:00 PM (9)",
      slots: [],
    },
  ];


  handleSelectDate = (id: string) => {
    this.setState({ selectedDateId: id });
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

  onDate = (date: string) => {
    this.toggleCalendar();
    console.log("Selected Date:", date);
  };

  toggleCalendar = () => {
    this.setState((prevState) => ({
      showCalendar: !prevState.showCalendar,
    }));
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
    navigateToScreen(this.props, "AddMemberUI", true, {})
  }
  selectService = (value:string) => {
    this.setState({serviceName:value,isServiceSelected:!this.state.isServiceSelected})
  }
  selectProvider = (value:string) => {
    this.setState({providerName:value})
  }
  
  generateDates = (startIndex = 0, count = 60) => {
    const dates = [];
    const today = moment();
    for (let i = startIndex; i < startIndex + count; i++) {
      const date = moment(today).add(i, 'days');
      dates.push({
        id: date.format('YYYY-MM-DD'),
        day: date.format('ddd'),
        month: date.format('MMM'),
        date: date.format('D'),
        fullDate: date.format('YYYY-MM-DD'),
      });
    }
    return dates;
  };

  onDateSelect = (date:string) => {
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
      (dates:{id:string}) => dates.id === selectedDate
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
}

export default ReservationLogic;