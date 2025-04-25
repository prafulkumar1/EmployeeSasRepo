// CalendarComponent.js
import React from "react";
import * as UI from "@/components/cobalt/importUI";
import CalendarPicker from "react-native-calendar-picker";
import { styles } from "@/source/styles/Reservation/Reservation.web";

const CalendarComponent = ({ onDateChange }) => (
  <UI.View style={styles.calendar}>
    <UI.View style={{ transform: [{ scale: 0.85 }], marginTop: -15 }}>
      <CalendarPicker
        onDateChange={onDateChange} // Pass function to handle date change
        selectedDayColor="#002c5f"
        selectedDayTextColor="#fff"
        textStyle={{ color: "#fff" }}
        yearTitleStyle={{ color: "#fff" }}
        previousTitle="<"
        nextTitle=">"
        previousTitleStyle={{ color: "#fff", fontSize: 24 }}
        nextTitleStyle={{ color: "#fff", fontSize: 24 }}
        width={300}
        height={350}
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
        {"18-April-2025"} {/* Dynamic date can be passed as prop */}
      </UI.Text>
    </UI.View>
  </UI.View>
);

export default CalendarComponent;
