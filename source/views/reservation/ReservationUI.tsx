import * as UI from "@/components/cobalt/importUI";
import React, { Component } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { styles } from "@/source/styles/reservation/ReservationStyles";
import ReservationLogic from "@/source/controller/reservation/Reservation";
import { ActivityIndicator } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { RootState } from "@/components/redux/store";
import { getAppConfiguration } from "@/components/redux/reducers/reservationReducer";
import { StatusBar } from "expo-status-bar";

const pageId = "Reservation";

const servicesOptions = [
  { label: "Couple Massage - 1hr", value: "massage_1hr" },
  { label: "Deep Cleansing", value: "deep_cleansing" },
  { label: "Hydra Facial Treatment", value: "hydra_facial" },
];

const dropdownOptions = [
  { label: "John smith", value: "massage_1hr" },
  { label: "Lyn", value: "deep_cleansing" },
  { label: "Hydra", value: "hydra_facial" },
];
class ReservationUI extends ReservationLogic {
  renderHorizontalCalender = ({ item }) => {
    const isSelected = this.state.selectedDateId === item.id;
    const isToday = item?.fullDate === moment()?.format("YYYY-MM-DD");
    const showHighlight = isSelected || (!this.state.selectedDateId && isToday);
    return (
      <UI.TouchableOpacity onPress={() => this.handleSelectDate(item.id)}>
        <UI.Box
          style={[
            styles.dateBox,
            {
              backgroundColor: isSelected
                ? "#00c6ff"
                : !this.state.selectedDateId && isToday
                ? "#00c6ff"
                : "#fff",
            },
          ]}
        >
          <UI.Text 
            style={[styles.day, { color: showHighlight ? "#fff" : "#4B5154" }]}
          >
            {item?.day}
          </UI.Text>
          <UI.Text
            style={[
              styles.mnthAndDate,
              { color: showHighlight ? "#fff" : "#000" },
            ]}
          >
            {item?.month}
          </UI.Text>
          <UI.Text
            style={[
              styles.mnthAndDate,
              { color: showHighlight ? "#fff" : "#000" },
            ]}
          >
            {item?.date}
          </UI.Text>
        </UI.Box>
      </UI.TouchableOpacity>
    );
  };

  renderGenderSelector = ({ item, index }) => {
    const { selectedGender } = this.state;
    return (
      <UI.TouchableOpacity
        key={index}
        onPress={() => this.setState({ selectedGender: item?.gender })}
      >
        <UI.ConnectedCbBox id="optionContainer" pageId={pageId} style={styles.optionContainer}>
          <UI.ConnectedCbBox id="radioOuter" pageId={pageId} style={styles.radioOuter}>
            {selectedGender === item?.gender && (
              <UI.ConnectedCbBox id="radioInner" pageId={pageId} style={styles.radioInner} />
            )}
          </UI.ConnectedCbBox>
          <UI.ConnectedCbText id="gendarLabel" pageId={pageId} style={styles.gendarLabel}>{item?.gender}</UI.ConnectedCbText>
        </UI.ConnectedCbBox>
      </UI.TouchableOpacity>
    );
  };

  renderTimePeriods = ({ item, index }) => {
    const isLesson = item.type !== "image";
    const isLastCard = index === this.timeData.length - 1;
    const shouldAlignLeft = this.timeData.length % 2 !== 0 && isLastCard;
    const isSelected = this.state.selectedTimePeriod === item.id;

    return (
      <UI.ConnectedCbBox
        id="timePeriodContainer" 
        pageId={pageId}
        style={[
          styles.timePeriodContainer,
          shouldAlignLeft && { alignItems: "center" },
        ]}
      >
        <UI.ConnectedCbText id="timePeriodTxt" pageId={pageId} style={styles.timePeriodTxt}>{item.label}</UI.ConnectedCbText>
        <UI.TouchableOpacity
          style={[
            styles.timeSlotsBtn,
            { backgroundColor: isSelected ? "#00c6ff" : "#fff" },
          ]}
          onPress={() => this.handleSelectTimePeriod(item.id)}
        >
          <UI.Text
            style={[
              styles.timePeriodBtnTxt,
              { color: isSelected ? "#fff" : "#000" },
            ]}
          >
            {item.time}
          </UI.Text>
        </UI.TouchableOpacity>
      </UI.ConnectedCbBox>
    );
  };

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
        <UI.Text
          style={[
            styles.slotText,
            isSelectedTime && styles.selectedText,
            isDisabled && styles.disabledText,
          ]}
        >
          {item.label}
        </UI.Text>
      </UI.TouchableOpacity>
    );
  };

  renderCalenderLoader = () => {
    return (
      <UI.ConnectedCbBox id="CbLoader" pageId={pageId} style={styles.calenderLoader}>
        <ActivityIndicator color={"#00c6ff"} size={"small"} />
      </UI.ConnectedCbBox>
    );
  };
  render() {
    const displayDate = this.state.selectedDate || moment();
    const displayMonthYear = displayDate.format("MMMM, YYYY");
    return (
      <UI.Box style={styles.mainContainer}>
        <UI.ConnectedCbHeader />
        <StatusBar hidden={true} />
        <UI.ScrollView bounces={false} style={{ padding: 10 }}>
          <UI.ConnectedCbBox
            id="CalenderContainer"
            pageId={pageId}
            style={styles.topContainer}
          >
            <UI.ConnectedCbText
              id="SelectDateLabel"
              pageId={pageId}
              style={styles.selectTxt}
            >
              Select Date
            </UI.ConnectedCbText>
            <UI.TouchableOpacity onPress={this.toggleCalendar}>
              <UI.ConnectedCbText
                id="CurrentDateLable"
                pageId={pageId}
                style={styles.dateTxt}
              >
                {this.state.selectedDate
                  ? this.state.selectedDate.format("MMMM, YYYY")
                  : moment().format("MMMM, YYYY")}
              </UI.ConnectedCbText>
            </UI.TouchableOpacity>
          </UI.ConnectedCbBox>

          <UI.FlatList
            ref={this.flatListRef}
            data={this.state.requiredDates}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={this.renderHorizontalCalender}
            showsHorizontalScrollIndicator={false}
            onEndReached={this.loadMoreDates}
            ListFooterComponent={this.renderCalenderLoader}
            onEndReachedThreshold={0.5}
            style={{
              paddingVertical: 10,
              marginBottom: 10,
            }}
          />

          {this.state.showCalendar && (
            <UI.ConnectedCbBox
              id="topCalenderContainer"
              pageId={pageId}
              style={styles.calendar}
            >
              <UI.ConnectedCbBox
                id="topSubCalenderContainer"
                pageId={pageId}
                style={{ transform: [{ scale: 0.85 }], marginTop: -15 }}
              >
                <CalendarPicker
                  onDateChange={(date:string) => this.handleChangeDate(date)}
                  selectedDayColor="#002c5f"
                  selectedDayTextColor="#fff"
                  textStyle={{ color: "#fff" }}
                  yearTitleStyle={{ color: "#fff" }}
                  previousTitle="<"
                  nextTitle=">"
                  previousTitleStyle={styles.previousTitleStyle}
                  nextTitleStyle={styles.nextTitleStyles}
                  width={300}
                  height={350}
                  selectedStartDate={this.state.selectedDate}
                />
                <UI.ConnectedCbText
                  id="currentDateLabel"
                  pageId={pageId}
                  style={styles.calendarText}
                >
                  {(this.state.selectedDate || moment()).format("DD-MMMM-YYYY")}
                </UI.ConnectedCbText>
              </UI.ConnectedCbBox>
            </UI.ConnectedCbBox>
          )}
          <UI.ConnectedCbSelectDropDown
            options={servicesOptions}
            customstyle={[
              styles.serviceBtn,
              { zIndex: this.state.isServiceSelected ? 1 : -1 },
            ]}
            onSelect={(value: string) => this.selectService(value)}
            openDropDown={() =>
              this.setState({
                isServiceSelected: !this.state.isServiceSelected,
              })
            }
            placeholder={"Select Service"}
          />

          <UI.ConnectedCbBox
            id="genderBox"
            pageId={pageId}
            style={styles.container}
          >
            <UI.FlatList
              data={[
                { id: 1, gender: "Male" },
                { id: 2, gender: "Female" },
                { id: 3, gender: "Any" },
              ]}
              scrollEnabled={false}
              keyExtractor={(item) => `${item.id}_${Math.random()}`}
              horizontal
              renderItem={this.renderGenderSelector}
            />
          </UI.ConnectedCbBox>

          <UI.ConnectedCbSelectDropDown
            options={dropdownOptions}
            customstyle={[
              styles.dropDownBtn,
              { zIndex: !this.state.isServiceSelected ? 1 : -1 },
            ]}
            onSelect={(value: string) => this.selectProvider(value)}
            placeholder={"Select Provider"}
          />

          <UI.FlatList
            data={this.timeData}
            renderItem={this.renderTimePeriods}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "flex-start" }}
            scrollEnabled={false}
          />

          <UI.ConnectedCbBox
            id="gridContainer"
            pageId={pageId}
            style={styles.gridContainer}
          >
            {this.getCurrentTimeSlots().map(this.renderSlot)}
          </UI.ConnectedCbBox>
        </UI.ScrollView>
        <UI.ConnectedCbBox
          id="addMemberContainer"
          pageId={pageId}
          style={styles.addMemberContainer}
        >
          <UI.TouchableOpacity onPress={() => this.navigateToAddMembers()}>
            <UI.ConnectedCbBox
              id="addMemberBtn"
              pageId={pageId}
              style={styles.addMemberBtn}
            >
              <UI.ConnectedCbText
                id="addMemberBtnTxt"
                pageId={pageId}
                style={styles.addMemberBtnTxt}
              >
                {" "}
                Add Member
              </UI.ConnectedCbText>
            </UI.ConnectedCbBox>
          </UI.TouchableOpacity>
        </UI.ConnectedCbBox>
      </UI.Box>
    );
  }
}

const mapStateToProps = (state:RootState) => {
  return {
    loading:state.dashboard.loading,
    dashboardResponse:state.dashboard.dashboardResponse,
    errorMessage:state.dashboard.errorMessage
  }
}
const mapDispatchToProps = {
  getAppConfiguration,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationUI)