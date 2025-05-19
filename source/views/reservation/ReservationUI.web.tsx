import * as UI from "@/components/cobalt/importUI";
import { RootState } from "@/components/redux/store";
import { styles } from "@/source/styles/reservation/Reservation.web";
import { connect } from "react-redux";
import { Image, Text, TouchableOpacity, Modal } from "react-native";
import { Icon } from "@/components/ui/icon";
import { CloseIcon, } from "@/components/ui/icon";
import { CalendarDaysIcon } from "@/components/ui/icon";
import CalendarComponent from "./CalendarComponent";
import useReservationLogic from "@/source/controller/reservation/Reservation";
import {setAdddropDownIndex,setClosememberModel,setOpenAddmemberModel} from "@/components/redux/reducers/reservationReducer";
import AddMemberUIWeb from "../addMember/addMemberUI.web";
import MemberDirectoryUI from "../memberDirectory/memberDirectoryUI.web";
import { setOpenMembersModel } from "@/components/redux/reducers/addMemberReducer";
import { setLoader } from "@/components/redux/reducers/uiSlice";

const pageId = "Reservation";
class ReservationUI extends useReservationLogic {
  renderItem = ({ item, index }) => {
    const [day, month] = item.split("-");

    return (
      <UI.TouchableOpacity
        key={index}
        onPress={() => this.handleItemPress(item, index)}
      >
        <UI.View
          style={[
            styles.dateItem,
            {
              backgroundColor:
                this.state.selectedItem === item ? "#00C2FF" : "#fff",
            },
          ]}
        >
          <UI.ConnectedCbText style={styles.dateText}   pageId={pageId}
          id="dateText">{day}</UI.ConnectedCbText>
          <UI.ConnectedCbText style={styles.dateText}   pageId={pageId}
          id="dateText">{month}</UI.ConnectedCbText>
        </UI.View>
      </UI.TouchableOpacity>
    );
  };

  //Radio render
  renderGenderSelector = () => {
    const { selectedGender } = this.state;
    return (
      <UI.ConnectedCbView style={styles.RadioContainer}   pageId={pageId}
      id="RadioContainer">
        {["Male", "Female", "Any"].map((gender) => (
          <TouchableOpacity
            key={gender}
            style={styles.optionContainer}
            onPress={() => this.setState({ selectedGender: gender })}
          >
            <UI.ConnectedCbView style={styles.radioOuter}   pageId={pageId}
          id="radioOuter">
              {selectedGender === gender && (
                <UI.ConnectedCbView style={styles.radioInner}   pageId={pageId}
                id="radioInner" />
              )}
            </UI.ConnectedCbView>
            <UI.ConnectedCbText style={styles.label}   pageId={pageId}
          id="label">{gender}</UI.ConnectedCbText>
          </TouchableOpacity>
        ))}
      </UI.ConnectedCbView>
    );
  };

  //timerender
  renderSlot = (item: any, index: number) => {
    const isDisabled = item.disabled;
    const isSelectedTime = this.state.selectedTime === item.label;

    return (
      <UI.TouchableOpacity
        key={index}
        style={[styles.slotBox, isSelectedTime && styles.selectedSlot]}
        disabled={isDisabled}
        onPress={() => this.handleSelectTime(item.label, item.disabled)}
      >
        <UI.ConnectedCbText
          style={[
            styles.slotText,
            isSelectedTime && styles.selectedText,
            isDisabled && styles.disabledText,
          ]}
        >
          {item.label}
        </UI.ConnectedCbText>
      </UI.TouchableOpacity>
    );
  };

  //timeperiods
  renderTimePeriods = ({ item, index }) => {
    const isLastCard = index === this.timeData.length - 1;
    const shouldAlignLeft = this.timeData.length % 2 !== 0 && isLastCard;
    const isSelected = this.state.selectedTimePeriod === item.id;

    return (
      <UI.ConnectedCbView
        style={[
          styles.timePeriodContainer,
          shouldAlignLeft && { alignItems: "center" },
        ]}
      >
        <UI.ConnectedCbText style={styles.timePeriodTxt}>{item.label}</UI.ConnectedCbText>
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
      </UI.ConnectedCbView>
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
        <UI.ConnectedCbBox
          style={styles.container}
          pageId={pageId}
          id="calenderContainer"
        >
          <UI.ConnectedCbView
            style={styles.scrollBox}
            id="togglecalender"
            pageId={pageId}
          >
            <UI.ConnectedCbText
              id="SelectDateLabel"
              pageId={pageId}
              style={styles.title}
            >
              {this.state.selectedKey}
            </UI.ConnectedCbText>
            <UI.TouchableOpacity
              style={[styles.calendarBox]}
              onPress={() => this.toggleCalendar()}
            >
              <UI.ConnectedCbBox style={styles.calendarIcon}>
                <Icon as={CalendarDaysIcon} size="md" color="#00c6ff" />
              </UI.ConnectedCbBox>
              <UI.ConnectedCbText style={styles.calendarText}>
                {this.state.selectedItem}
              </UI.ConnectedCbText>
            </UI.TouchableOpacity>
          </UI.ConnectedCbView>

          <UI.ConnectedCbView style={styles.row}>
            <UI.TouchableOpacity
              onPress={this.handlePrevious}
              style={{ paddingHorizontal: 20 }}
              disabled={this.state.currentIndex === 0}
            >
              <Image
                source={require("@/assets/images/icons/Back-Right-arrow.png")}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </UI.TouchableOpacity>
            <UI.FlatList
              ref={this.flatListRef}
              horizontal
              data={this.state.dateRange}
              renderItem={this.renderItem}
              keyExtractor={(_, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
            <UI.TouchableOpacity
              onPress={this.handleNext}
              style={{ paddingHorizontal: 20 }}
              disabled={
                this.state.currentIndex === this.state.dateRange.length - 1
              }
            >
              <Image
                source={require("@/assets/images/icons/Back-Right-arrow.png")}
              />
            </UI.TouchableOpacity>
          </UI.ConnectedCbView>
        </UI.ConnectedCbBox>
        <UI.ConnectedCbView style={[styles.selectorcontainer]}>
          <UI.ConnectedCbSelectDropDown
            options={this.servicesOptions}
            customstyle={styles.selectorcustomstyle}
            placeholder={"Select the service"}
          />

          {this.renderGenderSelector()}
          <UI.ConnectedCbView style={{ marginVertical: 10 }}>
            <UI.ConnectedCbText style={styles.providerText}>
              Please select provider
            </UI.ConnectedCbText>
          </UI.ConnectedCbView>
        </UI.ConnectedCbView>
        <UI.ConnectedCbView style={[styles.selectorcontainer]}>
          <UI.ConnectedCbSelectDropDown
            options={this.providersdummyData}
            customstyle={styles.selectorcustomstyle}
            onSelect={(values: any) => console.log(values, "--->>>")} // Pass the handleSelect method to the dropdown
            placeholder={"Select the Provider"}
          />
        </UI.ConnectedCbView>

        <UI.ConnectedCbView style={[{ width: "100%", zIndex: -2 }]}>
          <UI.ConnectedCbFlatList
            flatlistData={this.timeData}
            children={this.renderTimePeriods}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "flex-start" }}
          />
        </UI.ConnectedCbView>

        <UI.ConnectedCbView style={styles.slotTimeContainer}>
          {this.getCurrentTimeSlots().map(this.renderSlot)}
        </UI.ConnectedCbView>

        <UI.ConnectedCbView style={[styles.addMemberBtncontainer, {zIndex :-1}]}>
          <UI.TouchableOpacity
            style={styles.addMemberBtn}
            onPress={() => this.props.setOpenAddmemberModel()}
          >
            <UI.ConnectedCbText style={styles.addMemberBtnTxt}> Add Member</UI.ConnectedCbText>
          </UI.TouchableOpacity>
        </UI.ConnectedCbView>

        {/* Conditionally show AddMemberUIWeb only on Web and if modal open */}
        {this.props.OpenAddmemberModel && <AddMemberUIWeb />}

        {/*MODEL FOR THE TIME OUT*/}
        {this.props.closeMemberModel && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.props.closeMemberModel}
          >
            <UI.ConnectedCbView style={styles.modalBackground}>
              <UI.View
                style={[
                  styles.modalContainer,
                  {
                    height: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Image source={require("@/assets/images/icons/tennis.jpg")} />
                <Text style={[styles.txt2, { marginVertical: 10 }]}>
                  our Time has expired, you are no longer holding this
                  reservation. Please return to the reservation screen and try
                  again.
                </Text>
                <UI.View style={styles.SubmitContainer}>
                  <UI.Pressable
                    style={[
                      styles.SubmitBtn,
                      {
                        backgroundColor:
                          this.state.hover === "ok" ? "#000" : "transparent",
                      },
                    ]}
                    onPress={() => this.handleCloseAllModels()}
                    onMouseEnter={() => this.setState({ hover: "ok" })}
                    onMouseLeave={() => this.setState({ hover: null })}
                  >
                    <Text
                      style={[
                        styles.submitTxt,
                        {
                          color:
                            this.state.hover === "ok" ? "#fff" : " #5773A2,",
                        },
                      ]}
                    >
                      Ok
                    </Text>
                  </UI.Pressable>
                </UI.View>
              </UI.View>
            </UI.ConnectedCbView>
          </Modal>
        )}

        {this.props.OpenMemberModel && <MemberDirectoryUI />}
        {this.state.showCalendar && (
          <CalendarComponent
            onDateChange={this.onDateChange}
            currentDate={this.state.currentDate}
            sixtyDaysLater={this.state.sixtyDaysLater}
          />
        )}

        {/*MODEL FOR THE THANK  YOU */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showThankModal}
          onRequestClose={this.toggleThankModal}
        >
          <UI.View style={styles.modalBackground}>
            <UI.View
              style={[
                styles.modalContainer,
                {
                  height: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <UI.TouchableOpacity
                onPress={this.toggleThankModal}
                style={styles.closeIcon}
                onMouseEnter={() => this.setState({ hover: "close" })}
                onMouseLeave={() => this.setState({ hover: null })}
              >
                <Icon
                  as={CloseIcon}
                  size="sm"
                  style={{
                    color: this.state.hover === "close" ? "#000" : "#fff",
                  }}
                />
              </UI.TouchableOpacity>

              <Image source={require("@/assets/images/icons/tennis.jpg")} />
              <Text style={[styles.Thankyou, { marginVertical: 10 }]}>
                Thank you
              </Text>
              <Text style={[styles.txt2, { marginVertical: 10 }]}>
                Your couple massage service is Reservation has beeen confirmed
                for Tuesday, june 24, 2025
              </Text>
            </UI.View>
          </UI.View>
        </Modal>
      </UI.ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    dropDownIndex: state?.reservation?.dropDownIndex,
    OpenAddmemberModel: state?.reservation?.OpenAddmemberModel,
    OpenMemberModel: state?.addMember?.OpenMemberModel,
    closeMemberModel: state?.reservation?.closeMemberModel,
  };
};
const mapDispatchToProps = {
  setAdddropDownIndex,
  setOpenAddmemberModel,
  setClosememberModel,
  setOpenMembersModel,
  setLoader,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationUI);
