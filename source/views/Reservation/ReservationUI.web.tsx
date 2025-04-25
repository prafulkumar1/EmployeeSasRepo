import * as UI from "@/components/cobalt/importUI";
import { RootState } from "@/components/redux/store";
import { styles } from "@/source/styles/Reservation/Reservation.web";
import { connect } from "react-redux";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { getProfitCenterData } from "@/components/redux/reducers/loginReducer";
import BoxComponent from "./BoxComponent";
import CalendarComponent from "./CalendarComponent";
import useReservationLogic from "@/source/controller/Reservation/ReservationLogic";
import { setAdddropDownIndex } from "@/components/redux/reducers/reservationReducers";

const pageId = "Reservation";
class ReservationUI extends useReservationLogic {
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

  //Radio render
  renderGenderSelector = () => {
    const { selectedGender } = this.state;
    return (
      <View style={styles.RadioContainer}>
        {["Male", "Female", "Any"].map((gender) => (
          <TouchableOpacity
            key={gender}
            style={styles.optionContainer}
            onPress={() => this.setState({ selectedGender: gender })}
          >
            <View style={styles.radioOuter}>
              {selectedGender === gender && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.label}>{gender}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  //render providers
  renderproviders = ({ item, index }) => {
    return (
      <UI.ConnectedCbSelectDropDown
        options={item.options}
        customstyle={[styles.selectorcustomstyle]}
      />
    );
  };

  //timerender
  renderSlot = (item, index: number) => {
    const isDisabled = item.disabled;
    const isSelectedTime = this.state.selectedTime === item.label;

    return (
      <UI.TouchableOpacity
        key={index}
        style={[styles.slotBox, isSelectedTime && styles.selectedSlot]}
        disabled={isDisabled}
        onPress={() => this.handleSelectTime(item.label, item.disabled)}
      >
        <Text
          style={[
            styles.slotText,
            isSelectedTime && styles.selectedText,
            isDisabled && styles.disabledText,
          ]}
        >
          {item.label}
        </Text>
      </UI.TouchableOpacity>
    );
  };

  //timeperiods
  renderTimePeriods = ({ item, index }) => {
    const isLesson = item.type !== "image";
    const isLastCard = index === this.timeData.length - 1;
    const shouldAlignLeft = this.timeData.length % 2 !== 0 && isLastCard;
    const isSelected = this.state.selectedTimePeriod === item.id;

    return (
      <UI.View
        style={[
          styles.timePeriodContainer,
          shouldAlignLeft && { alignItems: "center" },
        ]}
      >
        <UI.Text style={styles.timePeriodTxt}>{item.label}</UI.Text>
        <UI.TouchableOpacity
          style={[
            styles.timeSlotsBtn,
            { backgroundColor: isSelected ? "#00c6ff" : "#fff" },
          ]}
          onPress={() => this.handleSelectTimePeriod(item.id)}
        >
          <Text
            style={[
              styles.timePeriodBtnTxt,
              { color: isSelected ? "#fff" : "#000" },
            ]}
          >
            {item.time}
          </Text>
        </UI.TouchableOpacity>
      </UI.View>
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
      <UI.ScrollView style={[styles.mainContainer]}>
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
            <UI.FlatList
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
        <UI.View style={[styles.selectorcontainer]}>
          <UI.ConnectedCbSelectDropDown
            options={this.dropdownOptions}
            customstyle={styles.selectorcustomstyle}
          />

          {this.renderGenderSelector()}
          <UI.View style={{marginVertical :10}}>
            <UI.Text style={styles.providerText}>
              Please select providers
            </UI.Text>
          </UI.View>
        </UI.View>
        <UI.View style={[styles.selectorcontainer, { zIndex: -1 }]}>
          <UI.ConnectedCbSelectDropDown
            options={this.providersdummyData}
            customstyle={styles.selectorcustomstyle}
          />
        </UI.View>
        <UI.View style={{ width: "100%" ,zIndex: -2 }}>
          <UI.ConnectedCbFlatList
            flatlistData={this.timeData}
            children={this.renderTimePeriods}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "flex-start" }}
            contentContainerStyle={{
              paddingTop: 20,
              paddingBottom: 10,
              paddingHorizontal: 1,
            }}
          />
        </UI.View>
        <UI.View style={styles.slotTimeContainer}>
          {this.getCurrentTimeSlots().map(this.renderSlot)}
        </UI.View>

        <UI.View style={{ alignItems: "center", marginVertical: 25 }}>
          <UI.TouchableOpacity style={styles.addMemberBtn}>
            <UI.Text style={styles.addMemberBtnTxt}> Add Member</UI.Text>
          </UI.TouchableOpacity>
        </UI.View>

        {this.state.showCalendar && (
          <CalendarComponent onDateChange={this.onDateChange} />
        )}
      </UI.ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    dropDownIndex: state?.reservation?.dropDownIndex,
  };
};
const mapDispatchToProps = {
  setAdddropDownIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationUI);
