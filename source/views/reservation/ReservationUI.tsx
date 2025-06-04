import * as UI from "@/components/cobalt/importUI";
import React from "react";
import CalendarPicker from "react-native-calendar-picker";
import { styles } from "@/source/styles/reservation/ReservationStyles";
import ReservationLogic from "@/source/controller/reservation/Reservation";
import { ActivityIndicator } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { RootState } from "@/components/redux/store";
import {
  getAppConfiguration,
  getReservationsData,
} from "@/components/redux/reducers/reservationReducer";
import { StatusBar } from "expo-status-bar";
import CbLoader from "@/components/cobalt/cobaltLoader";

const pageId = "Reservation";

class ReservationUI extends ReservationLogic {
  renderHorizontalCalender = ({ item, index }) => {
    const isSelected = this.state.selectedItem === item?.Date;
    const [day, month, Date] = item?.Dateslot?.split(" ");

    return (
      <UI.TouchableOpacity
        activeOpacity={1}
        onPress={() => this.handleItemPress(item, index)}
      >
        <UI.Box
          style={[
            styles.dateBox,
            {
              backgroundColor:
                this.state.selectedItem === item?.Date ? "#00C2FF" : "#fff",
            },
          ]}
        >
          <UI.Text
            style={[styles.day, { color: isSelected ? "#fff" : "#4B5154" }]}
          >
            {day}
          </UI.Text>
          <UI.Text
            style={[
              styles.mnthAndDate,
              { color: isSelected ? "#fff" : "#000" },
            ]}
          >
            {month}
          </UI.Text>
          <UI.Text
            style={[
              styles.mnthAndDate,
              { color: isSelected ? "#fff" : "#000" },
            ]}
          >
            {Date}
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
        activeOpacity={0}
        onPress={() => this.setState({ selectedGender: item?.gender })}
      >
        <UI.ConnectedCbBox
          id="optionContainer"
          pageId={pageId}
          style={styles.optionContainer}
        >
          <UI.ConnectedCbBox
            id="radioOuter"
            pageId={pageId}
            style={styles.radioOuter}
          >
            {selectedGender === item?.gender && (
              <UI.ConnectedCbBox
                id="radioInner"
                pageId={pageId}
                style={styles.radioInner}
              />
            )}
          </UI.ConnectedCbBox>
          <UI.ConnectedCbText
            id="gendarLabel"
            pageId={pageId}
            style={styles.gendarLabel}
          >
            {item?.gender}
          </UI.ConnectedCbText>
        </UI.ConnectedCbBox>
      </UI.TouchableOpacity>
    );
  };

  renderTimePeriods = ({ item, index }) => {
    const isLesson = item.type !== "image";
    const isLastCard = index === this.state?.AvailableTimeCat.length - 1;
    const shouldAlignLeft =
      this.state?.AvailableTimeCat.length % 2 !== 0 && isLastCard;
    const isSelected = this.state.selectedTimePeriod === item.TimeCat;

    return (
      <UI.ConnectedCbBox
        id="timePeriodContainer"
        pageId={pageId}
        style={[
          styles.timePeriodContainer,
          shouldAlignLeft && { alignItems: "center" },
        ]}
      >
        <UI.ConnectedCbText
          id="timePeriodTxt"
          pageId={pageId}
          style={styles.timePeriodTxt}
        >
          {item.TimeName}
        </UI.ConnectedCbText>
        <UI.TouchableOpacity
          style={[
            styles.timeSlotsBtn,
            { backgroundColor: isSelected ? "#00c6ff" : "#fff" },
          ]}
          onPress={() => this.handleSelectTimePeriod(item.TimeCat)}
        >
          <UI.Text
            style={[
              styles.timePeriodBtnTxt,
              { color: isSelected ? "#fff" : "#000" },
            ]}
          >
            {item.TimeCat} ({item?.AvailableTimeSlots?.length})
          </UI.Text>
        </UI.TouchableOpacity>
      </UI.ConnectedCbBox>
    );
  };

  renderSlot = (item: any, index: number) => {
    const isDisabled = item.disabled;
    const isSelectedTime = this.state.selectedTime === item.TimeSlot;

    return (
      <UI.TouchableOpacity
        key={index}
        style={[styles.slotBox, isSelectedTime && styles.selectedSlot]}
        disabled={isDisabled}
        onPress={() => this.handleSelectTime(item.TimeSlot, item.disabled)}
      >
        <UI.Text
          style={[
            styles.slotText,
            isSelectedTime && styles.selectedText,
            isDisabled && styles.disabledText,
          ]}
        >
          {item.TimeSlot}
        </UI.Text>
      </UI.TouchableOpacity>
    );
  };

  renderCalenderLoader = () => {
    return (
      <UI.ConnectedCbBox
        id="CbLoader"
        pageId={pageId}
        style={styles.calenderLoader}
      >
        <ActivityIndicator color={"#00c6ff"} size={"small"} />
      </UI.ConnectedCbBox>
    );
  };
  render() {
    const serviceClassName = this?.props?.singleServiceItem?.[0]?.ServiceClass?.find(
      (ServiceClass) => ServiceClass.ServiceClassID === this?.props?.ServiceClassID
    )?.ServiceClassName;
    
    return (
      <UI.Box style={styles.mainContainer}>
        <UI.ConnectedCbHeader
          headerTitle={
            serviceClassName ? serviceClassName : null
          }
          goHome={() => this.navigateToService()}
          goBack={() => this.props.navigation?.goBack()}
        />
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
                {this.state.selectedItem
                  ? moment(this?.state?.selectedItem, "MM-DD-YYYY").format(
                      "MMM-DD"
                    )
                  : null}
              </UI.ConnectedCbText>
            </UI.TouchableOpacity>
          </UI.ConnectedCbBox>

          <UI.FlatList
            ref={this.flatListRef}
            data={this.state.dateRange}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={this.renderHorizontalCalender}
            showsHorizontalScrollIndicator={false}
            // onEndReached={this.loadMoreDates}
            // ListFooterComponent={this.renderCalenderLoader}
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
                  onDateChange={(date: string) => this.onDateChange(date)}
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
                  minDate={this.state.currentDate}
                  maxDate={this.state.sixtyDaysLater}
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
            options={this?.state?.serviceNames}
            customstyle={[styles.serviceBtn]}
            onSelect={(value: string) => this.selectService(value)}
            placeholder={"Select the Service"}
            setAddMemberIndex={this.setAddMemberIndex}
            addMemberIndex={this.state.addMemberIndex}
            selectItemId={0}
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
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              keyExtractor={(item) => `${item.id}_${Math.random()}`}
              horizontal
              renderItem={this.renderGenderSelector}
            />
          </UI.ConnectedCbBox>

          <UI.ConnectedCbSelectDropDown
            options={this.state.ProvidersData}
            customstyle={[styles.dropDownBtn]}
            onSelect={(value: string) => this.selectProvider(value)}
            placeholder={"Select the Provider"}
            setAddMemberIndex={this.setAddMemberIndex}
            addMemberIndex={this.state.addMemberIndex}
            selectItemId={1}
          />

          <UI.FlatList
            data={this.state?.AvailableTimeCat}
            renderItem={this.renderTimePeriods}
            numColumns={2}
            keyExtractor={(_, index) => index.toString()}
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

        {this.state.IsLoading  && (
          <UI.Box style={styles.loaderTrans}>
            <CbLoader />
          </UI.Box>
        )}
      </UI.Box>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.dashboard.loading,
    dashboardResponse: state.dashboard.dashboardResponse,
    errorMessage: state.dashboard.errorMessage,
    singleServiceItem: state.services.singleServiceItem,
    ServiceClassID: state.services.ServiceClassID,
    reservationData: state?.reservation?.reservationData,
  };
};
const mapDispatchToProps = {
  getAppConfiguration,
  getReservationsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationUI);
