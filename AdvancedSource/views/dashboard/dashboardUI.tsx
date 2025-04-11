import * as UI from '@/components/cobalt/importUI';
import { connect } from 'react-redux';
import { RootState } from '@/components/redux/store';
import { styles } from '@/source/styles/dashboardStyle';
import useAdvanceDashboardLogic from '@/AdvancedSource/controller/dashboard/dashboard';
const pageId = 'AdvanceDashboard';
class AdvanceDashboardUI extends useAdvanceDashboardLogic {
  render() {
    let pageConfigJson = global.appConfigJsonArray?.find((item: { PageId: string; }) => item.PageId === pageId);
    global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
    return (
      <UI.View style={styles.mainContainer}>
        <UI.Text>AdvanceDashboardUI</UI.Text>
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
