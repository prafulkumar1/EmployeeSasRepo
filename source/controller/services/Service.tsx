import { Component } from "react";
import { navigateToScreen } from "@/components/constants/Navigations";
import { BookingType, ServiceType } from "@/components/constants/Types";

const pageId = "Service";

interface IProps {
  getServiceClasses?: () => void;
  storeSingleService?: (serviceDetails: any) => void;
  storeServiceClassID?: (ServiceClassID: any) => void;
  serviceClassList: BookingType[];
  Isshowbookintype: number;
}

interface IState {
  activeTab: string | null;
  serviceTypes: BookingType[] | null;
}

export default class ServiceLogic extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeTab: null,
      serviceTypes: [],
    };
  }

  componentDidMount() {
    if (this.props.getServiceClasses) {
      this.props.getServiceClasses();
    }
  }
  componentDidUpdate(prevProps: IProps) {
    if (prevProps?.serviceClassList !== this?.props?.serviceClassList) {
      this.setState({
        serviceTypes: this?.props?.serviceClassList,
        activeTab: this?.props?.serviceClassList[0]?.BookingTypeName,
      });
    }

    if (
      this?.props?.Isshowbookintype === 0 &&
      prevProps?.serviceClassList !== this?.props?.serviceClassList &&
      Array.isArray(this?.props?.serviceClassList)
    ) {
      const result = this?.props?.serviceClassList?.filter(
        (item) =>
          Array?.isArray(item?.ServiceClass) && item?.ServiceClass?.length === 0
      );
      if (this?.props?.storeSingleService) {
        this?.props?.storeSingleService(result);
      }
      if (result?.length > 0) {
        navigateToScreen(this.props, "ReservationUI", true, {
          serviceDetails: result,
        });
      }
    }
  }
  navigateToReservation = (serviceDetails: ServiceType) => {
    this.props.storeServiceClassID(serviceDetails?.ServiceClassID);
    const result = this.props.serviceClassList.find((item) =>
      item.ServiceClass.some(
        (service) => service.ServiceClassID === serviceDetails?.ServiceClassID
      )
    );

    if (this.props.storeSingleService) {
      this.props.storeSingleService([result]);
    }
    if (result) {
      navigateToScreen(this.props, "ReservationUI", true, {
        serviceDetails: [result],
      });
    }
  };
}
