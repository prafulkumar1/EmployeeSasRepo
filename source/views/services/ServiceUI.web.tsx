
import * as UI from '@/components/cobalt/importUI';
import { RootState } from '@/components/redux/store';
import { styles } from '@/source/styles/dashbboard/dashboardStyle.web';
import { connect } from 'react-redux';
import ReservationLogic from '@/source/controller/reservation/Reservation';
import ServiceLogic from '@/source/controller/services/Service';

const pageId='Reservation';
class ServiceUI extends ServiceLogic {
  render() {
    let pageConfigJson = global.appConfigJsonArray.find(item => item?.PageId === pageId);
    global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
    return (
      <UI.View style={styles.mainContainer}>
        <UI.Text>Servcie For Web</UI.Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ServiceUI)