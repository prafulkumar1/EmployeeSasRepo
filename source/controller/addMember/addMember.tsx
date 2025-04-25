import { navigateToScreen } from '@/components/constants/Navigations';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Component, createRef } from 'react';
import { FlatList } from 'react-native';

const pageId = 'AddMember';

interface IState {
  isModalVisible: boolean;
  timeLeft: number;
  timerRunning: boolean;
  isTimeOutModal:boolean
  membersList:{memberName:string}[]
  membersCount:any
  membersCountList:{
    number:number
    isCountActive:boolean
    id:string
  }[],
  currentIndex:number,
  selectedIndex:number,
  showCalendar: boolean;
  
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

interface IProps {
}

const BACKGROUND_TASK = 'background-timer-task';

export default class useAddMemberLogic extends Component<IProps, IState> {
  private interval: NodeJS.Timeout | null;
  dummydata:any
  dropdownOptions:any
  constructor(props: IProps) {
    super(props);
    this.state = {
      isModalVisible: false,
      timeLeft: 220,
      timerRunning: false,
      membersList:[],
      membersCount:4,
      membersCountList:[],
      isTimeOutModal:false,
      currentIndex :0,
      selectedIndex :0,
      showCalendar: false,
    };
    this.interval = null;
    this.dummydata = mappedDates
  }
  flatListRef = createRef<FlatList<string>>();
  componentDidMount(): void {
    const updateCountList = Array.from(
      { length: this.state.membersCount },
      (_, index) => ({ number: index + 1,isCountActive:false ,id:`${Date.now()}_${Math.random().toString(36).substring(2, 9)}`})
    );
    
  this.setState({ membersCountList: updateCountList });
    this.startTimer();
    this.registerBackgroundTask();
  }

  componentWillUnmount(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.unregisterBackgroundTask();
  }
  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
    if(prevState.timeLeft !==this.state.timeLeft){
      if(this.state.timeLeft === 0){
        this.setState({isTimeOutModal:true})
      }
    }
  }

  registerBackgroundTask = async () => {
    TaskManager.defineTask(BACKGROUND_TASK, async () => {
      this.updateTimerInBackground();

    });

    const status = await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK, {
      minimumInterval: 60 * 15,
      stopOnTerminate: false,
      startOnBoot: true,
    });
  };

  unregisterBackgroundTask = async () => {
    await BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASK);
  };

  updateTimerInBackground = () => {
    if (this.state.timeLeft > 0) {
      this.setState((prevState) => ({
        timeLeft: prevState.timeLeft - 1,
      }));
    } else {
      this.setState({
        timerRunning: false,
        timeLeft: 0,
      });
    }
  };

  toggleModal = (): void => {
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  };

  navigateToMember = (): void => {
    navigateToScreen(this.props,"MemberDirectoryUI",true,{})
  };

  startTimer = (): void => {
    if (this.state.timerRunning) return;

    this.setState({ timerRunning: true });

    this.interval = setInterval(() => {
      this.setState((prevState):any => {
        if (prevState.timeLeft <= 1) {
          clearInterval(this.interval!);
          return { timeLeft: 0, timerRunning: false };
        }
        return { timeLeft: prevState.timeLeft - 1 };
      });
    }, 1000);
  };

  resetTimer = (): void => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.setState({ timeLeft: 180, timerRunning: false });
  };

  formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  handleMembersCount = (id: string,memberCount:number) => {
    this.setState(prevState => ({
      membersCountList: prevState.membersCountList.map(item => ({
        ...item,
        isCountActive: item.id === id ? !item.isCountActive : false
      }))
    }));

    const updateCountList = Array.from(
      { length: memberCount },
      (_, index) => ({ number: index + 1,memberName:"Reservation",id:`${Date.now()}_${Math.random().toString(36).substring(2, 9)}`})
    );
    
    this.setState({ membersList: updateCountList });
  }
  resetTimeOutModal = () => {
    this.setState({isTimeOutModal:!this.state.isTimeOutModal})
  }

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

}
