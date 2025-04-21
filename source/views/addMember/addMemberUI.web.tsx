import * as UI from '@/components/cobalt/importUI';
import { RootState } from '@/components/redux/store';
import { styles } from '@/source/styles/dashbboard/dashboardStyle.web';
import { connect } from 'react-redux';
import {Image} from "react-native"
import useAddMemberLogic from '@/source/controller/addMember/addMember';

const pageId='AddMember';
class AddMemberUI extends useAddMemberLogic {
  render() {
    let pageConfigJson = global.appConfigJsonArray.find(item => item?.PageId === pageId);
    global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
    return (
      <UI.View style={styles.mainContainer}>
        <UI.Text>AddMember For Web</UI.Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberUI)