import React from "react";
import * as UI from "@/components/cobalt/importUI";
import ServiceLogic from "@/source/controller/services/Service";
import { StatusBar } from "expo-status-bar";
import { styles } from "@/source/styles/services/ServiceStyles";
import { RootState } from "@/components/redux/store";
import { connect } from "react-redux";
import {
  getServiceClasses,
  storeServiceClassID,
  storeSingleService,
} from "@/components/redux/reducers/serviceReducer";
import CbLoader from "@/components/cobalt/cobaltLoader";
import { navigateToScreen } from "@/components/constants/Navigations";

const pageId = "ServiceClass";
class ServiceUI extends ServiceLogic {
  renderServiceList = ({ item }) => {
    return (
      <UI.TouchableOpacity onPress={() => this.navigateToReservation(item)}>
        <UI.ConnectedCbBox
          id="ServiceCardBox"
          pageId={pageId}
          style={styles.serviceCardBox}
        >
          <UI.ConnectedCbBox
            id="ServiceCardImg"
            pageId={pageId}
            style={styles.serviceCardImg}
          >
            <UI.ConnectedCbImage
              id="ServiceImg"
              pageId={pageId}
              imageJsx={
                <UI.Image
                  alt="image"
                  source={
                    item?.ServiceClassImage == ""
                      ? item.icon
                      : { uri: item.ServiceClassImage }
                  }
                  style={
                    item?.ServiceClassImage == "" ? styles.icon : styles.photo
                  }
                  resizeMode="cover"
                />
              }
            />
          </UI.ConnectedCbBox>
          <UI.ConnectedCbBox
            id="ServiceCardTextBox"
            pageId={pageId}
            style={styles.serviceCardTextBox}
          >
            <UI.ConnectedCbText
              id="ServiceName"
              pageId={pageId}
              style={styles.serviceName}
            >
              {item.ServiceClassName}
            </UI.ConnectedCbText>
            <UI.ConnectedCbText
              id="ServiceDisc"
              pageId={pageId}
              style={styles.serviceDesc}
            >
              {item.ServiceClassDiscription}
            </UI.ConnectedCbText>
          </UI.ConnectedCbBox>
        </UI.ConnectedCbBox>
      </UI.TouchableOpacity>
    );
  };
  render() {
    const { activeTab, serviceTypes } = this.state;
    // if  (this.props.Isshowbookintype === 1) {
    //   const result = serviceTypes.filter(
    //     (item) =>
    //       Array.isArray(item.ServiceClass) && item.ServiceClass.length === 1
    //   );
    //   console.log(result[0]?.ServiceClass, "result");
      
    //    navigateToScreen(this.props, "ReservationUI", true, {
    //     serviceDetails: result[0]?.ServiceClass,
    //   });
    // }

    const tabs = serviceTypes.map((service) => service.BookingTypeName);
    const activeServiceClass =
      serviceTypes.find((service) => service.BookingTypeName === activeTab)
        ?.ServiceClass || [];

    // Show loading message or spinner
    if (serviceTypes?.length === 0) {
      return (
        <UI.Box style={{ flex: 1 }}>
          <CbLoader />
        </UI.Box>
      );
    }

    return (
      <UI.ConnectedCbBox
        id="ServiceMainContainer"
        pageId={pageId}
        style={styles.serviceMainContainer}
      >
        <UI.ConnectedCbHeader
          id="ServiceHeaderContainer"
          pageId={pageId}
          headerTitle={"Book A Lesson"}
          props={this.props}
          // goHome={() => this.navigateToService()}
        />
        <StatusBar hidden={true} />

        <UI.ConnectedCbView
          id="ServiceTabContainer"
          pageId={pageId}
          style={styles.serviceTabContainer}
        >
          <UI.ScrollView horizontal>
            {tabs?.length > 0 &&
              tabs?.map((category) => {
                return (
                  <UI.TouchableOpacity
                    key={category}
                    onPress={() => this.setState({ activeTab: category })}
                  >
                    <UI.ConnectedCbBox
                      id="TabHeaderBtn"
                      pageId={pageId}
                      style={[
                        styles.tabHeaderBtn,
                        activeTab === category && styles.activeTab,
                      ]}
                    >
                      <UI.ConnectedCbText
                        style={[
                          styles.tabText,
                          // activeTab === category && styles.activeTabText,
                        ]}
                        id="TabText"
                        pageId={pageId}
                      >
                        {category}
                      </UI.ConnectedCbText>
                    </UI.ConnectedCbBox>
                  </UI.TouchableOpacity>
                );
              })}
          </UI.ScrollView>
        </UI.ConnectedCbView>

        <UI.ConnectedCbBox
          id="CardContainer"
          pageId={pageId}
          style={styles.cardContainer}
        >
          <UI.FlatList
            data={activeServiceClass}
            numColumns={2}
            contentContainerStyle={styles.serviceCards}
            renderItem={this.renderServiceList}
            showsVerticalScrollIndicator={false}
          />
        </UI.ConnectedCbBox>
      </UI.ConnectedCbBox>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.services.loading,
    serviceClassList: state.services.serviceClassList,
    Isshowbookintype: state.services.Isshowbookintype,
  };
};
const mapDispatchToProps = {
  getServiceClasses,
  storeSingleService,
  storeServiceClassID
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceUI);
