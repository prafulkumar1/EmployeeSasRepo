// BoxComponent.tsx
import React from "react";
import { styles } from "@/source/styles/reservation/Reservation.web";
import * as UI from "@/components/cobalt/importUI";
import { Icon } from "@/components/ui/icon";
import {CalendarDaysIcon,} from "@/components/ui/icon";

const BoxComponent = ({ title, onPressCalendar, date }) => (
    <UI.View style={styles.scrollBox}>
      <UI.Text style={styles.title}>{title}</UI.Text>
      <UI.TouchableOpacity
        style={[styles.calendarBox]}
        onPress={onPressCalendar}
      >
        <UI.Box style={styles.calendarIcon}>
          <Icon as={CalendarDaysIcon} size="md" color="#00c6ff" />
        </UI.Box>
        <UI.Text style={styles.calendarText}>{date}</UI.Text>
      </UI.TouchableOpacity>
    </UI.View>
);

export default BoxComponent;
