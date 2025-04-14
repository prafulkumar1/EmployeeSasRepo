import * as UI from '@/components/cobalt/importUI';
import { connect } from 'react-redux';
import { RootState } from '@/components/redux/store';
import useAdvanceDashboardLogic from '@/AdvancedSource/controller/dashboard/dashboard';
import { styles } from '@/AdvancedSource/styles/dashbboard/dashboardStyle';
const pageId = 'AdvanceDashboard';
class AdvanceDashboardUI extends useAdvanceDashboardLogic {
  render() {
    let pageConfigJson = global.appConfigJsonArray?.find((item: { PageId: string; }) => item.PageId === pageId);
    global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
    return (
      <UI.View style={styles.mainContainer}>
        <UI.Text>Advance Dashboard Mobile</UI.Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceDashboardUI)
