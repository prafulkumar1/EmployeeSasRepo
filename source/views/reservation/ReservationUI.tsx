import * as UI from "@/components/cobalt/importUI";
import React, { Component } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { styles } from "@/source/styles/reservation/ReservationStyles";
import ReservationLogic from "@/source/controller/reservation/Reservation";

const pageId='Reservation';

const interestOptions = [
  { label: "Bicycling", value: "bicycling" },
  { label: "Boating", value: "boating" },
  { label: "Books", value: "books" },
  { label: "Classic Cars", value: "classicCars" },
  { label: "Cooking", value: "cooking" },
];

const date = [
  { id: "2025-4-1", day: "Tue", month: "Apr", date: 1 },
  { id: "2025-4-2", day: "Wed", month: "Apr", date: 2 },
  { id: "2025-4-3", day: "Thu", month: "Apr", date: 3 },
  { id: "2025-4-4", day: "Fri", month: "Apr", date: 4 },
  { id: "2025-4-5", day: "Sat", month: "Apr", date: 5 },
  { id: "2025-4-6", day: "Sun", month: "Apr", date: 6 },
  { id: "2025-4-7", day: "Mon", month: "Apr", date: 7 },
  { id: "2025-4-8", day: "Tue", month: "Apr", date: 8 },
  { id: "2025-4-9", day: "Wed", month: "Apr", date: 9 },
  { id: "2025-4-10", day: "Thu", month: "Apr", date: 10 },
];
const dropdownOptions = [
  { label: "Couple Massage - 1hr", value: "massage_1hr" },
  { label: "Deep Cleansing", value: "deep_cleansing" },
  { label: "Hydra Facial Treatment", value: "hydra_facial" },
];

const providers = [
  {
    label: 'Provider 1',
    options: dropdownOptions
  }
];
export default class ReservationUI extends ReservationLogic {


  renderItem = ({ item }) => {
    const isSelected = this.state.selectedDateId === item.id;
    return (
      <UI.TouchableOpacity onPress={() => this.handleSelectDate(item.id)} >
        <UI.Box
          style={[
            styles.dateBox,
            styles.boxshadow,
            { backgroundColor: isSelected ? "#00c6ff" : "#fff" },
          ]}
        >
          <UI.Text style={styles.day}>
            {item.day}
          </UI.Text>
          <UI.Text style={styles.mnthAndDate}>
            {item.month}
          </UI.Text>
          <UI.Text style={styles.mnthAndDate}>
            {item.date}
          </UI.Text>
        </UI.Box>
      </UI.TouchableOpacity>
    );
  };

  renderGenderSelector = () => {
    const { selectedGender } = this.state;
    return (
      <UI.Box style={styles.container}>
        <UI.FlatList
          data={[{ id: 1, gender: "Male" }, { id: 2, gender: "Female" }, { id: 3, gender: "Any" }]}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <UI.TouchableOpacity
                key={index}
                style={styles.optionContainer}
                onPress={() => this.setState({ selectedGender: item?.gender })}
              >
                <UI.Box style={styles.radioOuter}>
                  {selectedGender === item?.gender && <UI.Box style={styles.radioInner} />}
                </UI.Box>
                <UI.Text style={styles.label}>{item?.gender}</UI.Text>
              </UI.TouchableOpacity>
            )
          }}
        />
      </UI.Box>
    );
  };


  renderTimePeriods = ({ item, index }) => {
    const isLesson = item.type !== "image";
    const isLastCard = index === this.timeData.length - 1;
    const shouldAlignLeft = this.timeData.length % 2 !== 0 && isLastCard;
    const isSelected = this.state.selectedTimePeriod === item.id;

    return (
      <UI.Box style={[styles.timePeriodContainer, shouldAlignLeft && { alignItems: 'center', }]}>
        <UI.Text style={styles.timePeriodTxt}>{item.label}</UI.Text>
        <UI.TouchableOpacity style={[styles.timeSlotsBtn, { backgroundColor: isSelected ? "#00c6ff" : "#fff" }]} onPress={() => this.handleSelectTimePeriod(item.id)}>

          <UI.Text style={[styles.timePeriodBtnTxt, { color: isSelected ? "#fff" : "#000" }]}>{item.time}</UI.Text>
        </UI.TouchableOpacity>
      </UI.Box>
    );
  };
  renderProviders = (item: any) => {
    return (
      <>
        <UI.Box style={{ width: '100%', marginBottom: 16,zIndex:999 }}>
          <UI.ConnectedCbSelectDropDown
            options={dropdownOptions}
            style={{ width: '100%', }}
          />
        </UI.Box>
      </>

    )
  }

  renderSlot = (item: any, index: number) => {

    const isDisabled = item.disabled;
    const isSelectedTime = this.state.selectedTime === item.label;

    return (
      <UI.TouchableOpacity
        key={index}
        style={[
          styles.slotBox,
          isSelectedTime && styles.selectedSlot,

        ]}
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

  render() {
    return (
      <UI.ScrollView contentContainerStyle={{ flex:1,paddingHorizontal: 10,marginTop:50,backgroundColor:"#fff",paddingBottom:100 }}>
        <UI.Box
          style={styles.topContainer}
        >
          <UI.Text style={styles.selectTxt}>
            Select Date
          </UI.Text>
          <UI.TouchableOpacity onPress={this.toggleCalendar}>
            <UI.Text
              style={styles.dateTxt}
            >
              April, 2025
            </UI.Text>
          </UI.TouchableOpacity>
        </UI.Box>
        <UI.FlatList
          data={date}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
          showsHorizontalScrollIndicator={false}
          style={{flex:1,maxHeight:110,minHeight:80,paddingTop:10}}
        />


        {this.state.showCalendar && (
          <UI.Box
            style={styles.calendar}
          >
            <UI.Box style={{ transform: [{ scale: 0.85 }], marginTop: -15 }}>
              <CalendarPicker
                // onDateChange={this.onDte}
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
              <UI.Text
                style={styles.calendarText}
              >
                {"18-April-2025"}
              </UI.Text>
            </UI.Box>
          </UI.Box>
        )}
        <UI.ConnectedCbSelectDropDown options={dropdownOptions} customstyle={{ width: "100%",zIndex:1  }} />

        {this.renderGenderSelector()}

        <UI.ConnectedCbSelectDropDown options={dropdownOptions} customstyle={{ width: "100%",zIndex:1,marginBottom:30  }} />
      
        <UI.FlatList
          data={this.timeData}
          renderItem={this.renderTimePeriods}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'flex-start' }}
          style={{flex:1,maxHeight:160,minHeight:80}}
        />

        <UI.Box style={styles.gridContainer}>
          {this.getCurrentTimeSlots().map(this.renderSlot)}
        </UI.Box>

        <UI.Box style={styles.addMemberContainer}>
          <UI.TouchableOpacity style={styles.addMemberBtn} onPress={() => this.navigateToAddMembers()}>
            <UI.Text style={styles.addMemberBtnTxt}> Add Member</UI.Text>
          </UI.TouchableOpacity>
        </UI.Box>

      </UI.ScrollView>
    );
  }
}