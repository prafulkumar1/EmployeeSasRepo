import React from "react";
import * as UI from "@/components/cobalt/importUI";
import ServiceLogic from "@/source/controller/services/Service";
import { FlatList } from "react-native";
import { styles } from "@/source/styles/services/ServiceStyles.web";
import { connect } from "react-redux";
import {
  getServiceClasses,
  storeServiceClassID,
  storeSingleService,
} from "@/components/redux/reducers/serviceReducer";
import { RootState } from "@/components/redux/store";
import CbLoader from "@/components/cobalt/webCobaltLoader";
import { navigateToScreen } from "@/components/constants/Navigations";
class ServiceUI extends ServiceLogic {
  renderItem = ({ item }) => {
    console.log(item, "item");
    
    return (
      <UI.TouchableOpacity
        style={[styles.card]}
        onPress={() => this.navigateToReservation(item)}
      >
        {/* <UI.ConnectedCbText style={styles.icon}>🏋️‍♂️</UI.ConnectedCbText> */}
        <UI.ConnectedCbView style={styles.TextContainer}>
          <UI.ConnectedCbText style={styles.title}>
            {item.ServiceClassName}
          </UI.ConnectedCbText>
          <UI.ConnectedCbText style={styles.description}>
            Description: {item.ServiceClassDiscription}
          </UI.ConnectedCbText>
        </UI.ConnectedCbView>
      </UI.TouchableOpacity>
    );
  };
  renderTab = ({ item }) => (
    <UI.TouchableOpacity
      key={item}
      style={[styles.tab, this.state.activeTab === item && styles.activeTab]}
      onPress={() => this.setState({ activeTab: item })}
    >
      <UI.ConnectedCbText
        style={[
          styles.tabText,
          // this.state.activeTab === item && styles.activeTabText,
        ]}
      >
        {item}
      </UI.ConnectedCbText>
    </UI.TouchableOpacity>
  );

  render() {
    const { activeTab, serviceTypes } = this.state;
    // console.log(serviceTypes, "serviceTypes");

    // if (this.props.Isshowbookintype === 0) {
    //   const result = serviceTypes.filter(
    //     (item) =>
    //       Array.isArray(item.ServiceClass) && item.ServiceClass.length === 1
    //   );
    //   navigateToScreen(this.props, "ReservationUI", true, {
    //     serviceDetails: result,
    //   });
    // }

    // Show loading message or spinner
    if (serviceTypes.length === 0) {
      return (
        <UI.Box style={{ flex: 1 }}>
          <CbLoader visible={true} />
        </UI.Box>
      );
    }

    const tabs = serviceTypes.map((service) => service.BookingTypeName);
    const activeServiceClass =
      serviceTypes.find((service) => service.BookingTypeName === activeTab)
        ?.ServiceClass || [];
    return (
      <UI.ScrollView style={styles.container}>
        <FlatList
          data={tabs}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={this.renderTab}
          contentContainerStyle={styles.tabContainer}
        />
        <FlatList
          data={activeServiceClass}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
          numColumns={3}
          contentContainerStyle={styles.list}
          columnWrapperStyle={{ justifyContent: "center" }}
          ListEmptyComponent={
            <UI.ConnectedCbView style={styles.emptyContainer}>
              <UI.ConnectedCbText style={styles.emptyText}>
                No service classes available.
              </UI.ConnectedCbText>
            </UI.ConnectedCbView>
          }
        />
      </UI.ScrollView>
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
