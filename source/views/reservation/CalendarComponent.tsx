// CalendarComponent.js
import React from "react";
import * as UI from "@/components/cobalt/importUI";
import CalendarPicker from "react-native-calendar-picker";
import { styles } from "@/source/styles/reservation/Reservation.web";

const CalendarComponent = ({ onDateChange, currentDate, sixtyDaysLater }) => (
  <UI.View style={styles.calendar}>
    <UI.View style={{ transform: [{ scale: 0.85 }], marginTop: -15 }}>
      <CalendarPicker
        onDateChange={onDateChange} // Pass function to handle date change
        selectedDayColor="#002c5f"
        selectedDayTextColor="#000"
        textStyle={{ color: "#000" }}
        yearTitleStyle={{ color: "#000" }}
        previousTitle="<"
        nextTitle=">"
        previousTitleStyle={{ color: "#000", fontSize: 24 }}
        nextTitleStyle={{ color: "#000", fontSize: 24 }}
        width={300}
        height={350}
        minDate={currentDate}
        maxDate={sixtyDaysLater}
      />
      <UI.Text
        style={{
          marginTop: 10,
          textAlign: "center",
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {currentDate}
      </UI.Text>
    </UI.View>
  </UI.View>
);

export default CalendarComponent;
