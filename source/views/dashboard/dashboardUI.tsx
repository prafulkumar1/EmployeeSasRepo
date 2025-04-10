import * as UI from '@/components/cobalt/importUI';
import { connect } from 'react-redux';
import { RootState } from '@/components/redux/store';
import useDashboardLogic from '@/source/controller/dashboard/dashboard';
import { styles } from '@/source/styles/dashboardStyle';
const pageId = 'Dashboard';
class DashboardUI extends useDashboardLogic {
  render() {
    let pageConfigJson = global.appConfigJsonArray?.find((item: { PageId: string; }) => item.PageId === pageId);
    global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
    return (
      <UI.View style={styles.mainContainer}>
        <UI.Text>Dashboard</UI.Text>
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
