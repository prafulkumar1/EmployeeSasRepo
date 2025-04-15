
//import { useLoginLogic } from '@/source/controller/login/login';
import * as UI from '@/components/cobalt/importUI';
import { RootState } from '@/components/redux/store';
import useDashboardLogic from '@/source/controller/dashboard/dashboard';
import { styles } from '@/source/styles/dashbboard/dashboardStyle.web';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import {Image} from "react-native"

const pageId='Dashboard';
class DashboardUI extends useDashboardLogic {
  render() {
    let pageConfigJson = global.appConfigJsonArray.find(item => item?.PageId === pageId);
    global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
    return (
      <UI.View style={styles.mainContainer}>
        <UI.Text>Dashboard For Web</UI.Text>
           <Image source={{ uri: "https://cobaltportal.mycobaltsoftware.com:4430/codesync.test/assets/images/svg/Dashboard_CalendarofEvents.svg" }} style={styles.icons} />
      </UI.View>
    );
  }
}

const mapStateToProps = (state:RootState) => {
  return {
    loading:state.dashboard.loading
  }
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardUI)