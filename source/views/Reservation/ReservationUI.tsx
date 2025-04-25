import * as UI from "@/components/cobalt/importUI";
import { RootState } from "@/components/redux/store";
import { styles } from "@/source/styles/Reservation/Reservation.web";
import { connect } from "react-redux";
import { Image } from "react-native";
import { getProfitCenterData } from "@/components/redux/reducers/loginReducer";
import BoxComponent from "./BoxComponent";
import CalendarComponent from "./CalendarComponent";
import useReservationLogic from "@/source/controller/Reservation/ReservationLogic";

const pageId = "Reservation";
class ReservationUI extends useReservationLogic {

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

export default connect(mapStateToProps, mapDispatchToProps)(ReservationUI);
