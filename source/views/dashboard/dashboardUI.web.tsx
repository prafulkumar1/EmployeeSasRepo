
//import { useLoginLogic } from '@/source/controller/login/login';
import * as UI from '@/components/cobalt/importUI';
import { RootState } from '@/components/redux/store';
import useDashboardLogic from '@/source/controller/dashboard/dashboard';
import { ReactNode } from 'react';
import { connect } from 'react-redux';

const pageId='Dashboard';
class DashboardUI extends useDashboardLogic {
  render() {
    let pageConfigJson = global.appConfigJsonArray.find(item => item?.PageId === pageId);
    global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
    return (
      <UI.View>
        <UI.Text>Dashboard screen</UI.Text>
      </UI.View>
    );
  }
}
const styles = UI.StyleSheet.create({
 
  scrollContent: {
    padding: 20,
  },
 
});

const mapStateToProps = (state:RootState) => {
  return {
    loading:state.dashboard.loading
  }
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardUI)