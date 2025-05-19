import React from "react";
import * as UI from "@/components/cobalt/importUI";
import ServiceLogic from "@/source/controller/services/Service";
import { FlatList,  } from "react-native";
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
  renderTab = ({ item }) => (
    <UI.TouchableOpacity
      key={item}
      style={[styles.tab, this.state.activeTab === item && styles.activeTab]}
      onPress={() => this.setState({ activeTab: item })}
    >
      <UI.ConnectedCbText
        style={[
          styles.tabText,
          this.state.activeTab === item && styles.activeTabText,
        ]}
      >
        {item}
      </UI.ConnectedCbText>
    </UI.TouchableOpacity>
  );

  render() {
    const { activeTab } = this.state;
    const tabs = this.ServiceData.BookingTypes.map(
      (service) => service.BookingTypeName
    );
    const activeServiceClass =
      this.ServiceData.BookingTypes.find(
        (service) => service.BookingTypeName === activeTab
      )?.ServiceClass || [];
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
        /> 


        
        {/* {true && (
          <UI.Box style={{flex:1,  backgroundColor :'red'}}>
            <CbLoader  visible={true}/>
          </UI.Box>
        )} */}
      </UI.ScrollView>
    );
  }
}

export default ServiceUI;
