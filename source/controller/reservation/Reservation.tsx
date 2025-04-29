import { navigateToScreen } from "@/components/constants/Navigations";
import { Component } from "react";

export interface DateItem {
  id: string;
  day: string;
  date: number;
  month: string;
}

interface Props {
  getSlotBookingData: () => Promise<any>;
  slotData: DateItem[];
  loading: boolean;
  addMemberIndex:number
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

}

class ReservationLogic extends Component<Props, ControllerState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dates: [],
      selectedDateId: null,
      showCalendar: false,
      selectedService: null,
      isSelected: false,
      selectedGender: 'Male',
      selectedTimePeriod: "morning",
      selectedTime: "",
      openDropdownIndex: -1, 
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
}

export default ReservationLogic;