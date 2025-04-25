import { Component, createRef } from 'react';
import { FlatList } from 'react-native';

const pageId = 'Reservation';

interface IState {
  currentIndex:number,
  selectedIndex:number,
  showCalendar: boolean;
  selectedGender: string;
  selectedTimePeriod: string | null;
  selectedTime: string;
}

const mappedDates = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
  { id: '5', title: 'Item 5' },
  { id: '6', title: 'Item 5' },
  { id: '7', title: 'Item 5' },
  { id: '8', title: 'Item 5' },
  { id: '9', title: 'Item 5' },
  { id: '10', title: 'Item 5' },
  { id: '11', title: 'Item 5' },
  { id: '12', title: 'Item 5' },
  { id: '13', title: 'Item 5' },
  { id: '14', title: 'Item 5' },
  { id: '15', title: 'Item 5' },
  { id: '16', title: 'Item 5' },
  { id: '17', title: 'Item 5' },
  { id: '18', title: 'Item 5' },
];
const dropdownOptions = [
  { label: "Couple Massage - 1hr", value: "massage_1hr" },
  { label: "Deep Cleansing", value: "deep_cleansing" },
  { label: "Hydra Facial Treatment", value: "hydra_facial" },
];

const providersdummyData = [
  { value: '1', label: 'Provider 1' },
  { value: '2', label: 'Provider 2' },
  { value: '3', label: 'Provider 3' },
  { value: '4', label: 'Provider 4' },
  // { id: '2', label: 'Dropdown 2', options: ['Option 4', 'Option 5', 'Option 6'] },
  // { id: '3', label: 'Dropdown 3', options: ['Option 7', 'Option 8', 'Option 9'] },
  // { id: '4', label: 'Dropdown 4', options: ['Option 10', 'Option 11', 'Option 12'] },
]

interface IProps {
}


export default class useReservationLogic extends Component<IProps, IState> {
  dummydata:any
  providersdummyData:any
  dropdownOptions:any
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentIndex :0,
      selectedIndex :0,
      showCalendar: false,
      selectedGender: 'Male',
      selectedTimePeriod: "morning",
      selectedTime: "",
    };
    this.dummydata = mappedDates
    this.dropdownOptions = dropdownOptions
    this.providersdummyData = providersdummyData
  }
  flatListRef = createRef<FlatList<string>>();

  
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
        // { id: "10", label: "11:30" },
      ],
    },
    {
      id: "midday",
      label: "Mid Day",
      time: "12:00 PM-6:00 PM (5)",
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
      time: "06:00 PM-11:00 PM (0)",
      slots: [],
    },
  ];

   scrollToIndex = (index : number) => {
    this.flatListRef.current.scrollToIndex({ animated: true, index });
    // setCurrentIndex(index);
    this.setState({ currentIndex: index, });
  };

   handleNext = () => {
    if (this.state.currentIndex <  this.dummydata.length - 1) {
      this.scrollToIndex(this.state.currentIndex + 1);
    }
  };

   handlePrevious = () => {
    if (this.state.currentIndex > 0) {
      this.scrollToIndex(this.state.currentIndex - 1);
    }
  };
   handleItemPress = (index : number) => {
    this.setState({ selectedIndex: index, });
  };
  toggleCalendar = () => {
    this.setState((prevState) => ({
      showCalendar: !prevState.showCalendar,
    }));
  };

  onDateChange = () =>{
    console.log('date');
    
  }

  
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

}
