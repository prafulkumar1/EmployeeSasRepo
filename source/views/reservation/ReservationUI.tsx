import * as UI from "@/components/cobalt/importUI";
import React, { Component } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { styles } from "@/source/styles/reservation/ReservationStyles";
import ReservationLogic from "@/source/controller/reservation/Reservation";
import { ActivityIndicator } from "react-native";
import moment from "moment";

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
export default class ReservationUI extends ReservationLogic {
  renderHorizontalCalender = ({ item }) => {
    const isSelected = this.state.selectedDateId === item.id;
    const isToday = item?.fullDate === moment()?.format("YYYY-MM-DD");
    const showHighlight = isSelected || (!this.state.selectedDateId && isToday);
    return (
      <UI.TouchableOpacity onPress={() => this.handleSelectDate(item.id)}>
        <UI.Box
          style={[
            styles.dateBox,
            styles.boxshadow,
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
        style={styles.optionContainer}
        onPress={() => this.setState({ selectedGender: item?.gender })}
      >
        <UI.Box style={styles.radioOuter}>
          {selectedGender === item?.gender && (
            <UI.Box style={styles.radioInner} />
          )}
        </UI.Box>
        <UI.Text style={styles.label}>{item?.gender}</UI.Text>
      </UI.TouchableOpacity>
    );
  };

  renderTimePeriods = ({ item, index }) => {
    const isLesson = item.type !== "image";
    const isLastCard = index === this.timeData.length - 1;
    const shouldAlignLeft = this.timeData.length % 2 !== 0 && isLastCard;
    const isSelected = this.state.selectedTimePeriod === item.id;

    return (
      <UI.Box
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
          <UI.Text
            style={[
              styles.timePeriodBtnTxt,
              { color: isSelected ? "#fff" : "#000" },
            ]}
          >
            {item.time}
          </UI.Text>
        </UI.TouchableOpacity>
      </UI.Box>
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
      <UI.Box style={styles.calenderLoader}>
        <ActivityIndicator color={"#00c6ff"} size={"small"} />
      </UI.Box>
    );
  };
  render() {
    return (
      <UI.ScrollView
        contentContainerStyle={styles.mainContainer}
        bounces={false}
      >
        <UI.Box style={styles.topContainer}>
          <UI.Text style={styles.selectTxt}>Select Date</UI.Text>
          <UI.TouchableOpacity onPress={this.toggleCalendar}>
            <UI.Text style={styles.dateTxt}>
              {moment()?.format("MMMM, YYYY")}
            </UI.Text>
          </UI.TouchableOpacity>
        </UI.Box>

        <UI.FlatList
          data={this.state.requiredDates}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={this.renderHorizontalCalender}
          showsHorizontalScrollIndicator={false}
          onEndReached={this.loadMoreDates}
          ListFooterComponent={this.renderCalenderLoader}
          onEndReachedThreshold={0.5}
          style={{
            flex: 1,
            maxHeight: 110,
            minHeight: 80,
            paddingTop: 10,
          }}
        />

        {this.state.showCalendar && (
          <UI.Box style={styles.calendar}>
            <UI.Box style={{ transform: [{ scale: 0.85 }], marginTop: -15 }}>
              <CalendarPicker
                onDateChange={(date) =>
                  console.log(date, "---->>>datedatedate")
                }
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
                // selectedStartDate={this.state.selectedDate}
              />
              <UI.Text style={styles.calendarText}>{"18-April-2025"}</UI.Text>
            </UI.Box>
          </UI.Box>
        )}
        <UI.ConnectedCbSelectDropDown
          options={servicesOptions}
          customstyle={[
            styles.serviceBtn,
            { zIndex: this.state.isServiceSelected ? 1 : -1 },
          ]}
          onSelect={(value: string) => this.selectService(value)}
          openDropDown={() =>
            this.setState({ isServiceSelected: !this.state.isServiceSelected })
          }
          placeholder={"Select Service"}
        />

        <UI.Box style={styles.container}>
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
        </UI.Box>

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
          style={styles.timePeriodContainers}
          scrollEnabled={false}
        />

        <UI.Box style={styles.gridContainer}>
          {this.getCurrentTimeSlots().map(this.renderSlot)}
        </UI.Box>

        <UI.Box style={styles.addMemberContainer}>
          <UI.TouchableOpacity
            style={styles.addMemberBtn}
            onPress={() => this.navigateToAddMembers()}
          >
            <UI.Text style={styles.addMemberBtnTxt}> Add Member</UI.Text>
          </UI.TouchableOpacity>
        </UI.Box>
      </UI.ScrollView>
    );
  }
}