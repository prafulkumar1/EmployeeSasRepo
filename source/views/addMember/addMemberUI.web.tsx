import * as UI from "@/components/cobalt/importUI";
import { RootState } from "@/components/redux/store";
import { styles } from "@/source/styles/Reservation/Reservation.web";
import { connect } from "react-redux";

import useAddMemberLogic from "@/source/controller/addMember/addMember";
import { FlatList, Dimensions, Image } from "react-native";

import { getProfitCenterData } from "@/components/redux/reducers/loginReducer";
import CalendarComponent from "../Reservation/CalendarComponent";
import BoxComponent from "../Reservation/BoxComponent";

const ITEM_WIDTH = 70;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDE_PADDING = (SCREEN_WIDTH - ITEM_WIDTH) / 2;

const pageId = "AddMember";
class AddMemberUI extends useAddMemberLogic {
  renderItem = ({ item, index }) => {
    return (
      <UI.TouchableOpacity
        key={index}
        onPress={() => this.handleItemPress(index)}
      >
        <UI.View
          style={[
            styles.dateItem,
            {
              backgroundColor:
                this.state.selectedIndex === index ? "#00C2FF" : "#fff",
            },
          ]}
        >
          <UI.Text style={styles.dateText}>{item.id}</UI.Text>
          <UI.Text style={styles.dateText}>{item.title}</UI.Text>
        </UI.View>
      </UI.TouchableOpacity>
    );
  };
  render() {
    this.dummydata;
    this.state.currentIndex;
    let pageConfigJson = global.appConfigJsonArray.find(
      (item) => item?.PageId === pageId
    );
    global.controlsConfigJson =
      pageConfigJson && pageConfigJson.Controlls
        ? pageConfigJson.Controlls
        : [];
    return (
      <UI.View style={[styles.mainContainer]}>
        <UI.Box style={styles.container}>
          <BoxComponent
            title="Spa"
            onPressCalendar={this.toggleCalendar}
            date="THU APR 24"
          />
          <UI.View style={styles.row}>
            <UI.TouchableOpacity
              onPress={this.handlePrevious}
              style={{ paddingHorizontal: 20 }}
              disabled={this.state.currentIndex === 0}
            >
              <Image source={require("@/assets/images/icons/back_icon.png")} />
            </UI.TouchableOpacity>
            <FlatList
              ref={this.flatListRef}
              horizontal
              data={this.dummydata}
              renderItem={this.renderItem}
              keyExtractor={(_, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
            <UI.TouchableOpacity
              onPress={this.handleNext}
              style={{ paddingHorizontal: 20 }}
              disabled={this.state.currentIndex === this.dummydata.length - 1}
            >
              <Image source={require("@/assets/images/icons/back_icon.png")} />
            </UI.TouchableOpacity>
          </UI.View>
        </UI.Box>
        <UI.View style={{ justifyContent :'center', alignItems :'center', width :'100%', height : 100}}>
        <UI.ConnectedCbSelectDropDown options={this.dropdownOptions} />
        </UI.View>


        {this.state.showCalendar && (
          <CalendarComponent onDateChange={this.onDateChange} />
        )}
      </UI.View>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.dashboard.loading,
  };
};
const mapDispatchToProps = {
  getProfitCenterData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberUI);
