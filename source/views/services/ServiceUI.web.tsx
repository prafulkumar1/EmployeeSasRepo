import React from "react";
import * as UI from "@/components/cobalt/importUI";
import ServiceLogic from "@/source/controller/services/Service";
import { FlatList, Image } from "react-native";
import { styles } from "@/source/styles/services/ServiceStyles.web";
class ServiceUI extends ServiceLogic {
  renderItem = ({ item }) => (
    <UI.ConnectedCbView style={[styles.card]}>
      <UI.TouchableOpacity onPress={() => this.navigateToReservation(item)}>
        <UI.ConnectedCbText style={styles.icon}>🏋️‍♂️</UI.ConnectedCbText>

        <UI.ConnectedCbView style={styles.TextContainer}>
          <UI.ConnectedCbText style={styles.title}>
            {item.ServiceClassName}
          </UI.ConnectedCbText>
          <UI.ConnectedCbText style={styles.description}>
            Description: {item.ServiceClassDiscription}
          </UI.ConnectedCbText>
        </UI.ConnectedCbView>
      </UI.TouchableOpacity>
    </UI.ConnectedCbView>
  );

  render() {
    const { activeTab } = this.state;
    const tabs = this.ServiceData.BookingTypes.map((service) => service.BookingTypeName);
    const activeServiceClass = this.ServiceData.BookingTypes.find( (service) => service.BookingTypeName === activeTab)?.ServiceClass || [];
    return (
      <UI.ConnectedCbView style={styles.container}>
        <UI.ConnectedCbView style={styles.tabContainer}>
          {tabs?.map((tab) => (
            <UI.TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => this.setState({ activeTab: tab })}
            >
              <UI.ConnectedCbText
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </UI.ConnectedCbText>
            </UI.TouchableOpacity>
          ))}
        </UI.ConnectedCbView>

        <FlatList
          data={activeServiceClass}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={{ justifyContent: "center" }}
        />
      </UI.ConnectedCbView>
    );
  }
}

export default ServiceUI;
