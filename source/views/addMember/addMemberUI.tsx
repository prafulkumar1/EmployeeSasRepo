import * as UI from '@/components/cobalt/importUI';
import { connect } from 'react-redux';
import { RootState } from '@/components/redux/store';
import { Icon  } from '@/components/ui/icon';
import {CloseIcon,AddIcon} from '@/components/ui/icon';
import { Image,Modal} from "react-native"
import useAddMemberLogic from '@/source/controller/addMember/addMember';
import { styles } from '@/source/styles/addMember/addMember';
import MemberDirectoryUI from '../memberDirectory/memberDirectoryUI';
import { addTbdToMemberList, handleSelectedMember, removeMembersFromList, resetLoadedScreen, resetSingleMemberDetails, setMembersList, setUserType } from '@/components/redux/reducers/addMemberReducer';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

const pageId = 'AddMember';
const addMemberList = [{id:1,memberType:"Member"},{id:2,memberType:"Guest"},{id:3,memberType:"TBD"}]
class AddMemberUI extends useAddMemberLogic {
  renderAddedMemberList = ({ item, index }) => {
    return (
      <UI.Box style={styles.addedMemberList}>
        <UI.Text style={[styles.memberName,{color:item.isMemberSelected ? "#1dc6ff" : "#565c5f"}]}>{`${item.memberName}`}</UI.Text>
        <UI.Box style={styles.addOrRemoveBtn}>
          <UI.TouchableOpacity style={styles.memberActionIcons} onPress={() => this.props.removeMembersFromList(item.id)}>
            <Icon as={CloseIcon} size="xl" color='#b1b1b1' />
          </UI.TouchableOpacity>
          <UI.TouchableOpacity style={styles.addIcon} onPress={() => this.toggleModal(item.id)}>
            <Icon as={AddIcon} size="xl" color='#1dc6ff' />
          </UI.TouchableOpacity>
        </UI.Box>
      </UI.Box>
    )
  }
  renderUserTypeList = ({ item }) => {
    return (
        <UI.TouchableOpacity onPress={() => this.navigateToMember(item.memberType)} style={styles.modalBtn}>
          <UI.Text style={styles.modalBtnTxt}>{item.memberType}</UI.Text>
        </UI.TouchableOpacity>
    )
  }

  renderSuccessModal = () => {
    return (
      <LinearGradient
        colors={["#0052A5", "#00B2E3"]}
        style={styles.thankyouContainer}
      >
        <UI.TouchableOpacity style={styles.modalSuccess} onPress={() => this.handleNavToReservation()}>
          <Image
            alt="image"
            source={require("@/assets/images/icons/Home.png")}
            style={styles.HomeIcon}
          />
        </UI.TouchableOpacity>
        <Image
          source={require("@/assets/images/login-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Image
          source={require("@/assets/images/login-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <UI.Box style={styles.card}>
          <UI.Text style={styles.title}>THANK YOU</UI.Text>
          <UI.Text style={styles.subtitle}>
            Your Reservation has been Confirmed for
          </UI.Text>
          <UI.Text style={styles.subtitle}>
            {moment()?.format("dddd, MMM D")}
          </UI.Text>
        </UI.Box>
      </LinearGradient>
    )
  }
  renderAddMember = ({ item, index }) => {
    return (
      <UI.TouchableOpacity onPress={() => this.handleMembersCount(item.id,item.number)} style={[styles.memberCountBtn,{backgroundColor:item.isCountActive?"#1dc6ff":"#fff"}]}>
        <UI.Text style={[styles.memberCountTxt,{color:item.isCountActive?"#fff":"#2a4e7d"}]}>{item.number}</UI.Text>
      </UI.TouchableOpacity>
    )
  }
  render() {
    if(!this.props.isScreenLoaded){
      return (
        <UI.Box style={styles.mainContainer}>
          <UI.ImageBackground style={styles.backLogo} source={{ uri: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z29sZnxlbnwwfHwwfHx8MA%3D%3D" }}>
            <UI.Box style={styles.overLay} />
            <UI.Box style={styles.headerContainer}>
            <UI.TouchableOpacity style={styles.backIon} onPress={()=>this.props.navigation.goBack()}>
              <Image source={require("@/assets/images/icons/Back.png")} style={styles.iconStyle} />
            </UI.TouchableOpacity>
            <UI.TouchableOpacity style={styles.bellIcon} onPress={()=>this.navigateToService()}>
              <Image source={require("@/assets/images/icons/Home3x.png")} style={styles.iconStyle} />
            </UI.TouchableOpacity>
            </UI.Box>
            <UI.Box style={styles.subContainer}>
              <UI.TouchableOpacity>
                <UI.Text style={styles.profileTxt}>Service</UI.Text>
                <UI.Text style={styles.profileLabel}>Deep Cleaning</UI.Text>
              </UI.TouchableOpacity>
              <UI.Box>
                <UI.Text style={styles.profileTxt}>Requested Date</UI.Text>
                <UI.Text style={styles.profileLabel}>04/17/2025</UI.Text>
              </UI.Box>
              <UI.Box>
                <UI.Text style={styles.profileTxt}>Request Time</UI.Text>
                <UI.Text style={styles.profileLabel}>8:30 PM</UI.Text>
              </UI.Box>
            </UI.Box>
          </UI.ImageBackground>
  
          <UI.ScrollView style={styles.memberContainer}>
  
            <UI.TouchableOpacity style={styles.timeContainer}>
              <UI.Text style={styles.timeTxt}>{this.formatTime(this.state.timeLeft)}</UI.Text>
            </UI.TouchableOpacity>
  
            <UI.Box style={styles.addMemberContainer}>
              <UI.Text style={styles.addMemberTxt}>Add Members</UI.Text>
              <UI.FlatList
                data={this.state.membersCountList}
                horizontal
                style={{ minHeight: 40, maxHeight: 60 }}
                renderItem={this.renderAddMember}
              />
              <UI.Text style={styles.addMessageTxt}>Please click on "+" to select Members,Guests or My Buddies</UI.Text>
            </UI.Box>
            
            {
              this.props.membersList.length > 0 &&
              <UI.Box>
                <UI.Text style={styles.labelMember}>Members</UI.Text>
                <UI.FlatList
                  scrollEnabled={false}
                  data={this.props.membersList}
                  renderItem={this.renderAddedMemberList}
                />
              </UI.Box>
            } 
  
            <UI.Box style={{ marginTop: 20 }}>
              <UI.Text style={styles.commentTxt}>Comments</UI.Text>
              <UI.ConnectedCbInput id="Comments" style={styles.commentsBox} multiline={true} numberOfLines={4} formId={pageId} />
            </UI.Box>
  
            <UI.TouchableOpacity style={styles.submitBtn} onPress={() => this.handleSubmitReservation()}>
              <UI.Text style={styles.submitTxt}>Submit</UI.Text>
            </UI.TouchableOpacity>
          </UI.ScrollView>
  
          <Modal
            transparent={true}
            visible={this.state.isModalVisible}
            animationType="slide"
            onRequestClose={() => this.toggleModal("")}
          >
            <UI.Pressable style={styles.modalOverlay} onPress={() => this.toggleModal("")} />
            <UI.Pressable style={styles.modalContent}>
            <UI.FlatList
              scrollEnabled={false}
              style={{width:"100%"}}
              data={addMemberList}
              renderItem={this.renderUserTypeList}
              showsVerticalScrollIndicator={false}
            />
            </UI.Pressable>
          </Modal>
  
          <Modal
            transparent={true}
            visible={this.state.isTimeOutModal}
            animationType="slide"
            onRequestClose={this.resetTimeOutModal}
          >
            <UI.Pressable style={styles.modalOverlay} onPress={this.resetTimeOutModal} />
            <UI.Pressable style={styles.timeOutModal}>
              <Image source={require("@/assets/images/icons/dining3x.png")} style={styles.timeOutIcon} />
              <UI.Text style={styles.timeOutTxt}>Your Time has expired, you are no longer holding this reservation. Please return to the reservation screen and try again</UI.Text>
              <UI.TouchableOpacity style={styles.timeOutBtn} onPress={this.resetTimeOutModal}>
                <UI.Text style={styles.okTxt}>Ok</UI.Text>
              </UI.TouchableOpacity>
            </UI.Pressable>
          </Modal>

          <Modal
            transparent={true}
            visible={this.state.isSuccessModalOpen}
            animationType="fade"
            onRequestClose={this.resetTimeOutModal}
          >
              {this.renderSuccessModal()}
          </Modal>

          {/* <UI.ConnectedCbErrorMessagePopup 
            transparent={true} 
            visible={this.state.errorMessagePopup}
            onRequestClose={this.resetTimeOutModal}
            errorMessage={this.state.errorMessageTxt}
          />  */}

          <Modal
            transparent={true}
            visible={this.state.errorMessagePopup}
            animationType="fade"
            onRequestClose={() => this.setState({errorMessagePopup:false})}
          >
            <UI.Pressable style={styles.modalOverlay} onPress={() => this.setState({errorMessagePopup:false})} />
            <UI.Box style={styles.errorMessageContainer}>
            <UI.Text style={styles.errorMessageTxt}>{this.state.errorMessageTxt}</UI.Text>
            </UI.Box>
          </Modal> 
  
        </UI.Box>
      );
    }else{
      return (
        <MemberDirectoryUI />
      )
    }
  }
}

const mapStateToProps = (state:RootState) => {
  return {
    isScreenLoaded:state.addMember.isScreenLoaded,
    selectedId:state.addMember.selectedId,
    membersList:state.addMember.membersList,
    selectedMembersList:state.addMember.selectedMembersList,
  }
}
const mapDispatchToProps = {
  resetLoadedScreen,
  handleSelectedMember,
  setMembersList,
  removeMembersFromList,
  addTbdToMemberList,
  resetSingleMemberDetails,
  setUserType
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberUI)
