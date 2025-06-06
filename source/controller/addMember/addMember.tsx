import { navigateToScreen } from "@/components/constants/Navigations";
import { ApiResponse, MemberListType } from "@/components/constants/Types";
import { postApiCall } from "@/components/utlis/api";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { Component } from "react";
import { Platform } from "react-native";

const pageId = "AddMember";

interface IState {
  isModalVisible: boolean;
  timeLeft: number;
  timerRunning: boolean;
  isTimeOutModal: boolean;
  membersCountList: {
    number: number;
    isCountActive: boolean;
    id: string;
  }[];
  selectedId: string;
  isSuccessModalOpen: boolean;
  errorMessagePopup: boolean;
  errorMessageTxt: string;
  //Webcode
  selectedCount: number;
  showplayedpopup: boolean;
  popupVisibleIndex: number | null;
  popupPosition: { top: number; left: number };
  hover: string | null;
  showSecondModal: boolean;
  showMemberModal: boolean;
  showThankModal: boolean;
  showGuestModal: boolean;
  addmemberloading: boolean;
  commentText: string | null;
  //Webcode
}
interface SingleMemberDetails {
  MemberID: string;
  ID: string;
  FirstName: string;
  LastName: string;
  // Add other fields as needed
  [key: string]: any; // optional catch-all if fields are dynamic
}

interface IProps {
  route: any;
  navigation?: any;
  resetLoadedScreen?: () => void;
  isScreenLoaded?: boolean;
  selectedIds?: [];
  handleSelectedMember?: (id: string) => void;
  setUserType?: (userType: string) => void;
  setMembersList?: (memberCount: number) => void;
  membersList?: {
    isMemberSelected: boolean;
    id: string;
    memberName: string;
    singleMemberDetails?: SingleMemberDetails | null;
  }[];
  removeMembersFromList?: (id: any) => void;
  addTbdToMemberList?: () => void;
  selectedMembersList?: {
    id: string;
    isMemberSelected: boolean;
    memberName: string;
    number: number;
    singleMemberDetails: MemberListType[];
  }[];
  OpenAddmemberModel?: boolean;
  OpenMemberModel?: boolean;
  setOpenAddmemberModel?: () => void;
  setOpenMembersModel?: () => void;
  setClosememberModel?: () => void;
  setLoader?: () => void;
  setChangeToGuest?: ({ userType }) => void;
  setAddMultiple?: (AddMultiple: boolean) => void;
  setmembersCount?: (AddMultiple: number) => void;
  setSaveAppointmentMessage?: (SaveAppointmentMessage: string) => void;
  membersCount: number;
  ReservationData: any;
  SaveAppointmentMessage: string;
}

const BACKGROUND_TASK = "background-timer-task";

export default class useAddMemberLogic extends Component<IProps, IState> {
  private interval: NodeJS.Timeout | null;
  protected addIconRefs: { [key: string]: any };

  constructor(props: IProps) {
    super(props);
    this.addIconRefs = {};
    this.state = {
      isModalVisible: false,
      timeLeft: 750,
      timerRunning: false,
      membersCountList: [],
      isTimeOutModal: false,
      selectedId: "",
      isSuccessModalOpen: false,
      errorMessagePopup: false,
      errorMessageTxt: "",
      //webcode
      selectedCount: 1,
      showplayedpopup: false,
      popupVisibleIndex: null,
      popupPosition: { top: 0, left: 0 },
      hover: null,
      showSecondModal: false,
      showMemberModal: false,
      showThankModal: false,
      showGuestModal: false,
      addmemberloading: false,
      commentText: "",
      //webcode
    };
    this.interval = null;
  }

  componentDidMount(): void {
    const updateCountList = Array.from(
      { length: this.props.membersCount },
      (_, index) => {
        // Set the last member as active based on the length of the membersCount
        const isActive = index === this.props.membersCount - 1;

        return {
          number: index + 1,
          isCountActive: isActive,
          id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        };
      }
    );
    this.props.setMembersList(this.props.membersCount);
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
  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any
  ): void {
    if (prevState.timeLeft !== this.state.timeLeft) {
      if (this.state.timeLeft === 0) {
        this.setState({ isTimeOutModal: true });
        this?.props?.setClosememberModel();
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

  toggleModal = (item: any) => {
    this.props.handleSelectedMember(item?.number);
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
      selectedId: item?.id,
    }));
  };

  navigateToMember = (memberType: string) => {
    this.props.setUserType(memberType);
    if (memberType === "TBD") {
      this.setState({ isModalVisible: !this.state.isModalVisible }, () => {
        this.props.addTbdToMemberList();
      });
    } else {
      this.setState({ isModalVisible: !this.state.isModalVisible }, () => {
        this.props.resetLoadedScreen();
      });
    }
  };
  handleNavToReservation = () => {
    this.setState({ isSuccessModalOpen: false }, () => {
      navigateToScreen(this.props, "ServiceUI", true, {});
    });
  };

  startTimer = () => {
    if (this.state.timerRunning) return;

    this.setState({ timerRunning: true });

    this.interval = setInterval(() => {
      this.setState((prevState): any => {
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
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  handleMembersCount = (id: string, memberCount: number) => {
    this.setState((prevState) => ({
      membersCountList: prevState?.membersCountList?.map((item) => ({
        ...item,
        isCountActive: item?.id === id ? true : false,
      })),
    }));

    this.props.setMembersList(memberCount);
    this.props.setmembersCount(memberCount);
  };
  resetTimeOutModal = () => {
    this.setState({ isTimeOutModal: !this.state.isTimeOutModal }, () => {
      navigateToScreen(this.props, "ReservationUI", true, {});
    });
  };

  //SUBMIT
  handleSubmitReservation = async () => {
    if (this?.props?.selectedMembersList?.length === 0) {
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
      const cleanedMemberDetails = (this?.props?.membersList || [])
        .filter(
          (member) => member?.isMemberSelected && member?.singleMemberDetails
        )
        .map((member) => {
          const { isMemberSelected, ...restDetails } =
            member?.singleMemberDetails;
          return restDetails;
        });

      const reservation = this?.props?.ReservationData || {};

      const ParamsData = {
        AppointmentID: "",
        PlayersList: cleanedMemberDetails,
        SelectedDate: reservation?.RequestedDate || "",
        SelectedTime: reservation?.RequestedTime || "",
        SelectedBookingTypeID: reservation?.ServiceID || "",
        SelectedServiceClassID: reservation?.ServiceID || "",
        SelectedService: reservation?.ServiceID || "",
        SelectedGender: reservation?.gender || "",
        SelectedProvider: reservation?.ProviderID || "",
        SelectedTimeCat: reservation?.selectedTimePeriod || "",
        BMSUserActivityID: "4F22794F-554B-4449-B12D-36D71FDC7868",
      };
      const response = await postApiCall(
        "APPOINTMENT_DATA",
        "SAVE_APPOINTMENT_DATA",
        ParamsData
      );
      const apiResponse = response as ApiResponse;

      if (apiResponse?.response?.ResponseCode === "Fail") {
        const errorMessage =
          apiResponse?.response?.ResponseMessage || "An error occurred.";
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
      } else if (apiResponse?.response?.ResponseCode === "success") {
        this.props.setSaveAppointmentMessage(
          apiResponse?.response?.ResponseMessage
        );
        this.setState({ isSuccessModalOpen: true });
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
    }
  };

  navigateToService = () => {
    navigateToScreen(this.props, "ServiceUI", true, {});
  };

  //webcode
  handleCirclePress = (item: number) => {
    this.setState({ selectedCount: item });
  };

  toggleMutiplePlayers = () => {
    const { showplayedpopup } = this.state;
    this.setState({
      showplayedpopup: !showplayedpopup,
    });
    this.props.setAddMultiple(true);
  };
  handleAddIconPress = (item: any, event: any) => {
    let id = item?.id;
    this.props.handleSelectedMember(item?.number);
    const ref = this.addIconRefs[id];
    if (ref && ref.measure) {
      this.setState({ popupVisibleIndex: null });
      ref.measure((x, y, width, height, pageX, pageY) => {
        // pageX, pageY is the position on the screen of the element

        this.setState((prev) => ({
          popupVisibleIndex: prev.popupVisibleIndex === id ? null : id,
          popupPosition: { top: pageY + height, left: pageX }, // show popup below the icon
        }));
      });
    } else {
      // fallback to event if measure not available
      const { pageX, pageY } = event.nativeEvent;
      this.setState((prev) => ({
        popupVisibleIndex: prev.popupVisibleIndex === id ? null : id,
        popupPosition: { top: pageY, left: pageX },
      }));
    }
  };

  handleGlobalClosePopUp = () => {
    this.setState({ popupVisibleIndex: null });
  };
  handleRemoveMember = (indexToRemove: number) => {
    const { selectedCount } = this.state;

    // Ensure at least one member remains
    if (selectedCount <= 1) return;
    this.setState({ addmemberloading: true });

    this.setState((prevState) => ({
      selectedCount: prevState.selectedCount - 1,
      popupVisibleIndex: null, // Close any open popup
    }));
    setTimeout(() => {
      this.setState({ addmemberloading: false });
    }, 300);
  };

  handleSetGuest = (userType: string) => {
    if (userType === "TBD") {
      // this.setState({ isModalVisible: !this.state.isModalVisible }, () => {
      this.props.addTbdToMemberList();
      // });
    } else {
      this.props.setOpenMembersModel();
    }
    this.props.setChangeToGuest({ userType: userType });
    this.props.setUserType(userType);
    this.setState({ popupVisibleIndex: null });
    this.setState({
      showplayedpopup: false,
    });
  };
  handlecomment = (value: string) => {
    this.setState({ commentText: value });
  };
  //webcode
}
