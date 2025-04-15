import * as UI from '@/components/cobalt/importUI';
import { connect } from 'react-redux';
import { RootState } from '@/components/redux/store';
import useDashboardLogic from '@/source/controller/dashboard/dashboard';
import { styles } from '@/source/styles/dashbboard/dashboardStyle';
import { Icon  } from '@/components/ui/icon';
import { BellIcon,CalendarDaysIcon,MailIcon } from '@/components/ui/icon';
import {Image} from "react-native"
import { getDashBoardData } from '@/components/redux/reducers/dashboardReducer';

const pageId = 'Dashboard';
class DashboardUI extends useDashboardLogic {
  render() {
    let pageConfigJson = global.appConfigJsonArray?.find((item: { PageId: string; }) => item.PageId === pageId);
    global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
    return (
      <UI.Box style={styles.mainContainer}>
        <UI.Box style={styles.statusBar} />
        <UI.ImageBackground style={styles.backLogo} source={{ uri: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z29sZnxlbnwwfHwwfHx8MA%3D%3D" }}>
          <UI.TouchableOpacity style={styles.bellIcon}>
            <Icon as={BellIcon} size="xl" color='black' />
          </UI.TouchableOpacity>
          <UI.TouchableOpacity style={styles.profileImgBtn}>
            <UI.Image style={styles.profileImg} source={{ uri: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" }} />
          </UI.TouchableOpacity>
          <UI.Box style={styles.subContainer}>
            <UI.TouchableOpacity>
              <UI.Text style={styles.profileLabel}>Hi, {this.props.dashboardResponse?.FullName}</UI.Text>
              <UI.Text  style={styles.profileTxt}>Profile</UI.Text>
            </UI.TouchableOpacity>
            <UI.Box>
              <UI.Text style={styles.profileLabel}>{this.props.dashboardResponse?.DBoardTime}</UI.Text>
              <UI.Text style={styles.dateTxt}>{this.props.dashboardResponse?.DBoardDate}</UI.Text>
            </UI.Box>
            <UI.Box>
              <UI.Text style={styles.profileLabel}>53</UI.Text>
              <UI.Text style={styles.profileLabel}>Los Angeles</UI.Text>
              <UI.Text style={styles.labelTxt}>Few Clouds</UI.Text>
            </UI.Box>
          </UI.Box>
        </UI.ImageBackground>

        <UI.ScrollView>
        <UI.Box style={styles.middleContainer}>
          <UI.TouchableOpacity style={styles.calenderIcon}>
            <Icon as={CalendarDaysIcon} size="xl" color='#fff' />
          </UI.TouchableOpacity>
          <UI.TouchableOpacity style={styles.viewNewsBtn}>
            <UI.Text style={styles.viewNewsTxt}>View News</UI.Text>
          </UI.TouchableOpacity>
        </UI.Box>

        <UI.Box style={{ paddingHorizontal: 10 }}>
          <UI.Text style={styles.newsTxt}>Club House</UI.Text>
          <UI.Text style={styles.newsTxt}>04/01/2025</UI.Text>
        </UI.Box>

      <UI.FlatList 
        data={this.props.dashboardResponse?.DashboardCategory}
        numColumns={3}
        contentContainerStyle={{marginTop:20}}
        scrollEnabled={false}
        renderItem={({item,index})=> {
          return(
            <UI.TouchableOpacity activeOpacity={0.5}>
              <UI.ImageBackground style={styles.cardImage} source={{ uri: "https://playo.gumlet.io/AGSPORTSCLUB20210702053211176434/AGSPORTSCLUB1641656057769.jpeg" }}>
                <UI.Box style={styles.blackScreen} />
                <Image source={{ uri: item.CategoryImage }} style={styles.icons} />
                <UI.Text style={styles.dashboardLabels}>
                  {item.CategoryName}
                </UI.Text>
              </UI.ImageBackground>
            </UI.TouchableOpacity>
          )
        }}
      />
       
       <UI.TouchableOpacity style={styles.linkBtn}>
          <UI.Text style={styles.linkBtnTxt}>Link to Member Website</UI.Text>
        </UI.TouchableOpacity>
        </UI.ScrollView>

      </UI.Box>
    );
  }
}

const mapStateToProps = (state:RootState) => {
  console.log(state.dashboard.dashboardResponse,"responseeeee---->>>>>Response")
  return {
    loading:state.dashboard.loading,
    dashboardResponse:state.dashboard.dashboardResponse,
    errorMessage:state.dashboard.errorMessage
  }
}
const mapDispatchToProps = {
  getDashBoardData
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardUI)
