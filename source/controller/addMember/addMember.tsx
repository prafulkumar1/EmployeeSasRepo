import { navigateToScreen } from '@/components/constants/Navigations';
import { MemberListType } from '@/components/constants/Types';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Component } from 'react';

const pageId = 'AddMember';

interface IState {
  isModalVisible: boolean;
  timeLeft: number;
  timerRunning: boolean;
  isTimeOutModal:boolean
  membersCount:any
  membersCountList:{
    number:number
    isCountActive:boolean
    id:string
  }[]
  selectedId:string
  isSuccessModalOpen:boolean
  errorMessagePopup:boolean
  errorMessageTxt:string
  //Webcode
  selectedCount: number,
  showplayedpopup: boolean;
  popupVisibleIndex: number | null;
  popupPosition: { top: number; left: number };
  hover:string | null
  showSecondModal: boolean,
  showMemberModal: boolean,
  showThankModal: boolean,
  showGuestModal: boolean,
  addmemberloading: boolean,
  //Webcode
}

interface IProps {
  navigation?:any
  resetLoadedScreen?:() => void
  isScreenLoaded?:boolean
  selectedId?:string
  handleSelectedMember?:(id:string) => void
  setUserType?:(userType:string) => void
  setMembersList?:(memberCount:number) => void
  membersList?:{isMemberSelected:boolean,id:string,memberName:string}[]
  removeMembersFromList?:(id:string) =>void
  addTbdToMemberList?:() =>void
  selectedMembersList?:{
    "id": string
    "isMemberSelected": boolean
    "memberName": string
    "number":number
    "singleMemberDetails": MemberListType[]
  }[]
  OpenAddmemberModel?:boolean,
  OpenMemberModel?:boolean,
  setOpenAddmemberModel?:()=>void
  setOpenMembersModel?:()=>void
  setClosememberModel?:()=>void
  setLoader?:()=>void
  setChangeToGuest?:({userType})=>void
  
}

const BACKGROUND_TASK = 'background-timer-task';

export default class useAddMemberLogic extends Component<IProps, IState> {
  private interval: NodeJS.Timeout | null;

  constructor(props: IProps) {
    super(props);
    this.state = {
      isModalVisible: false,
      timeLeft: 3000,
      timerRunning: false,
      membersCount:4,
      membersCountList:[],
      isTimeOutModal:false,
      selectedId:"",
      isSuccessModalOpen:false,
      errorMessagePopup:false,
      errorMessageTxt:"",
      //webcode
      selectedCount: 1,
      showplayedpopup: false,
      popupVisibleIndex: null,
      popupPosition: { top: 0, left: 0 },
      hover :null,
      showSecondModal: false,
      showMemberModal: false,
      showThankModal: false,
      showGuestModal: false,
      addmemberloading: false,
      //webcode
    };
    this.interval = null;
  }

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
        // this?.props?.setClosememberModel()
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

  toggleModal = (id:string) => {
    this.props.handleSelectedMember(id)
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
      selectedId:id
    }));
  };

  navigateToMember = (memberType:string) => {
    this.props.setUserType(memberType)
    if(memberType === "TBD"){
      this.setState({isModalVisible:!this.state.isModalVisible},() => {
        this.props.addTbdToMemberList()
      })
    }else{
      this.setState({isModalVisible:!this.state.isModalVisible},() => {
        this.props.resetLoadedScreen()
      })
    }
  };
  handleNavToReservation = () => {
    this.setState({isSuccessModalOpen:false},() => {
      navigateToScreen(this.props, "ReservationUI", true, {})
    })
  }

  startTimer = () => {
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

  formatTime = (timeInSeconds: number) => {
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
    
    this.props.setMembersList(memberCount)
  }
  resetTimeOutModal = () => {
    this.setState({isTimeOutModal:!this.state.isTimeOutModal},() => {
      navigateToScreen(this.props, "ReservationUI", true, {})
    })
  }

  handleSubmitReservation = () => {
    if(this.props.selectedMembersList.length === 0){
       this.setState({errorMessagePopup:true,errorMessageTxt:"Please enter at least one player details."},() => {
        setTimeout(() => {
          this.setState({errorMessagePopup:false,errorMessageTxt:""})
        }, 2000);
       })
    }else{
      this.setState({isSuccessModalOpen:!this.state.isSuccessModalOpen})
    }
  }
  navigateToService =() => {
    navigateToScreen(this.props, "ServiceUI", true, {})
}

//webcode
handleCirclePress = (item: number) => {
  console.log(item, '00000000000000000000000000000000000000');
  
  this.setState({ selectedCount: item });
};

toggleMutiplePlayers = () => {
  const { showplayedpopup } = this.state;
  this.setState({
    showplayedpopup: !showplayedpopup,
  });
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
  this.setState({addmemberloading:true})

  this.setState((prevState) => ({
    selectedCount: prevState.selectedCount - 1,
    popupVisibleIndex: null, // Close any open popup
  }));
  setTimeout(() => {
      this.setState({addmemberloading:false})
  }, 300);
};

handleSetGuest = (userType:string) =>{
  this.props.setChangeToGuest({userType:userType}) ;
  this.props.setOpenMembersModel()
}
//webcode
}
