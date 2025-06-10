import * as UI from "@/components/cobalt/importUI";
import { connect } from "react-redux";
import { RootState } from "@/components/redux/store";
import { Icon } from "@/components/ui/icon";
import { CloseIcon, AddIcon } from "@/components/ui/icon";
import { Image, Modal } from "react-native";
import useAddMemberLogic from "@/source/controller/addMember/addMember";
import { styles } from "@/source/styles/addMember/addMember";
import MemberDirectoryUI from "../memberDirectory/memberDirectoryUI";
import {
  addTbdToMemberList,
  handleSelectedMember,
  removeMembersFromList,
  resetLoadedScreen,
  resetSingleMemberDetails,
  setmembersCount,
  setMembersList,
  setReservationData,
  setSaveAppointmentMessage,
  setUserType,
} from "@/components/redux/reducers/addMemberReducer";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { setClosememberModel } from "@/components/redux/reducers/reservationReducer";

const pageId = "AddMember";
const addMemberList = [
  { id: 1, memberType: "Member" },
  { id: 2, memberType: "Guest" },
  { id: 3, memberType: "TBD" },
];
class AddMemberUI extends useAddMemberLogic {
  renderAddedMemberList = ({ item, index }) => {
    return (
      <UI.Box style={styles.addedMemberList}>
        <UI.Text
          style={[
            styles.memberName,
            { color: item.isMemberSelected ? "#1dc6ff" : "#565c5f" },
          ]}
        >{`${item.memberName}`}</UI.Text>
        <UI.Box style={styles.addOrRemoveBtn}>
          <UI.TouchableOpacity
            style={styles.memberActionIcons}
              onPress={() => this.props.removeMembersFromList(item?.number)}
          >
            <Icon as={CloseIcon} size="xl" color="#b1b1b1" />
          </UI.TouchableOpacity>
          <UI.TouchableOpacity
            style={styles.addIcon}
            onPress={() => this.toggleModal(item)}
          >
            <Icon as={AddIcon} size="xl" color="#1dc6ff" />
          </UI.TouchableOpacity>
        </UI.Box>
      </UI.Box>
    );
  };
  renderUserTypeList = ({ item }) => {
    return (
      <UI.TouchableOpacity
        onPress={() => this.navigateToMember(item.memberType)}
        style={styles.modalBtn}
      >
        <UI.Text style={styles.modalBtnTxt}>{item?.memberType}</UI.Text>
      </UI.TouchableOpacity>
    );
  };

  renderSuccessModal = () => {
    return (
      <LinearGradient
        colors={["#0052A5", "#00B2E3"]}
        style={styles.thankyouContainer}
      >
        <UI.TouchableOpacity
          style={styles.modalSuccess}
          onPress={() => this.handleNavToReservation()}
        >
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
           {this.props.SaveAppointmentMessage}
          </UI.Text>
          {/* <UI.Text style={styles.subtitle}>
            {moment()?.format("dddd, MMM D")}
          </UI.Text> */}
        </UI.Box>
      </LinearGradient>
    );
  };
  renderAddMember = ({ item, index }) => {
    return (
      <UI.TouchableOpacity
        onPress={() => this.handleMembersCount(item.id, item.number)}
        style={[
          styles.memberCountBtn,
          { backgroundColor: item.isCountActive ? "#1dc6ff" : "#fff" },
        ]}
        key={item.id}
      >
        <UI.Text
          style={[
            styles.memberCountTxt,
            { color: item.isCountActive ? "#fff" : "#2a4e7d" },
          ]}
        >
          {item.number}
        </UI.Text>
      </UI.TouchableOpacity>
    );
  };
  render() {
    const { service, RequestedDate, RequestedTime } = this.props.route.params;
    if (!this.props.isScreenLoaded) {
      return (
        <UI.ConnectedCbBox id="Addmembermaincontainer" pageId={pageId}   style={styles.mainContainer}>
          <UI.ConnectedCbImageBackground id="AddmemberBGImage" pageId={pageId}  style={styles.backLogo} source={{ uri: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z29sZnxlbnwwfHwwfHx8MA%3D%3D" }}>
            <UI.ConnectedCbBox id="AddmemberOverlay" pageId={pageId} style={styles.overLay} />
            <UI.ConnectedCbBox id="AddmemberHeadercontainer" pageId={pageId} style={styles.headerContainer}>
              <UI.ConnectedCbBox id="AddmemberHIconcontainer" pageId={pageId} style={styles.HeaderIconcontainer} >
                <UI.TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                      <UI.ConnectedCbImage id="AddmemberHIconBack" pageId={pageId}  style={styles.iconStyle}
                      imageJsx={ <UI.Image alt="image" source={require("@/assets/images/icons/Back.png")} style={styles.iconStyle}/>} />
                </UI.TouchableOpacity>
              </UI.ConnectedCbBox>
               <UI.ConnectedCbBox id="AddmemberHIconcontainer" pageId={pageId} style={styles.HeaderIconcontainer}>
                <UI.TouchableOpacity  onPress={()=>this.navigateToService()}>             
                    <UI.ConnectedCbImage id="AddmemberHIconHome" pageId={pageId} style={styles.iconStyle} 
                   imageJsx={ <UI.Image alt="image" source={require("@/assets/images/icons/Home3x.png")} style={styles.iconStyle}/>}/>             
                </UI.TouchableOpacity>
            </UI.ConnectedCbBox>
            </UI.ConnectedCbBox>
            <UI.ConnectedCbBox id="Addmembersubcontainer" pageId={pageId} style={styles.subContainer}>
              <UI.TouchableOpacity>
                <UI.ConnectedCbText id="AddmemberServicelabel" pageId={pageId} style={styles.profileLabel}>Service</UI.ConnectedCbText>
                <UI.ConnectedCbText id="AddmemberProfiletext" pageId={pageId} style={styles.profileTxt}>Deep Cleaning</UI.ConnectedCbText>
              </UI.TouchableOpacity>
              <UI.Box>
                <UI.ConnectedCbText id="AddmemberDatelabel" pageId={pageId}  style={styles.profileLabel}>Requested Date</UI.ConnectedCbText>
                <UI.ConnectedCbText id="AddmemberProfiletext" pageId={pageId} style={styles.profileTxt}>04/17/2025</UI.ConnectedCbText>
              </UI.Box>
              <UI.Box>
                <UI.ConnectedCbText id="AddmemberTimelabel" pageId={pageId} style={styles.profileLabel}>Request Time</UI.ConnectedCbText>
                <UI.ConnectedCbText id="AddmemberProfiletext" pageId={pageId} style={styles.profileTxt}>8:30 PM</UI.ConnectedCbText>
              </UI.Box>
            </UI.ConnectedCbBox>
          </UI.ConnectedCbImageBackground>
  
          <UI.ScrollView style={styles.memberContainer}>
  
            <UI.TouchableOpacity >
              <UI.ConnectedCbBox id="AddmemberTimeContainer" pageId={pageId} style={styles.timeContainer}>
                <UI.ConnectedCbText id="AddmemberTimetext" pageId={pageId} style={styles.timeTxt}>{this.formatTime(this.state.timeLeft)}</UI.ConnectedCbText>
              </UI.ConnectedCbBox>
            </UI.TouchableOpacity>
  
            <UI.ConnectedCbBox id="AddmemberCountContainer" pageId={pageId} style={styles.addMemberContainer}>
              <UI.ConnectedCbText id="Addmembertext" pageId={pageId}  style={styles.addMemberTxt}>Add Members</UI.ConnectedCbText>
              <UI.FlatList
                data={this.state.membersCountList}
                horizontal
                style={{ minHeight: 40, maxHeight: 60 }}
                renderItem={this.renderAddMember}
              />
              <UI.ConnectedCbText id="AddMessagetext" pageId={pageId} style={styles.addMessageTxt}>Please click on "+" to select Members,Guests or My Buddies</UI.ConnectedCbText>
            </UI.ConnectedCbBox>
            
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
            )}

            <UI.Box style={{ marginTop: 20 }}>
              <UI.Text style={styles.commentTxt}>Comments</UI.Text>
              <UI.ConnectedCbInput
                id="Comments"
                style={styles.commentsBox}
                multiline={true}
                numberOfLines={4}
                formId={pageId}
                onChange={(value: string) => this.handlecomment(value)}
              />
            </UI.Box>

            <UI.TouchableOpacity
              style={styles.submitBtn}
              onPress={() => this.handleSubmitReservation()}
            >
              <UI.Text style={styles.submitTxt}>Submit</UI.Text>
            </UI.TouchableOpacity>
          </UI.ScrollView>

          <Modal
            transparent={true}
            visible={this.state.isModalVisible}
            animationType="slide"
            onRequestClose={() => this.toggleModal("")}
          >
            <UI.Pressable
              style={styles.modalOverlay}
              onPress={() => this.toggleModal("")}
            />
            <UI.Pressable style={styles.modalContent}>
              <UI.FlatList
                scrollEnabled={false}
                style={{ width: "100%" }}
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
            <UI.Pressable
              style={styles.modalOverlay}
              onPress={this.resetTimeOutModal}
            />
            <UI.Pressable style={styles.timeOutModal}>
              <Image
                source={require("@/assets/images/icons/dining3x.png")}
                style={styles.timeOutIcon}
              />
              <UI.Text style={styles.timeOutTxt}>
                Your Time has expired, you are no longer holding this
                reservation. Please return to the reservation screen and try
                again
              </UI.Text>
              <UI.TouchableOpacity
                style={styles.timeOutBtn}
                onPress={this.resetTimeOutModal}
              >
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
            onRequestClose={() => this.setState({ errorMessagePopup: false })}
          >
            <UI.Pressable
              style={styles.modalOverlay}
              onPress={() => this.setState({ errorMessagePopup: false })}
            />
            <UI.Box style={styles.errorMessageContainer}>
              <UI.Text style={styles.errorMessageTxt}>
                {this.state.errorMessageTxt}
              </UI.Text>
            </UI.Box>
          </Modal> 
  
        </UI.ConnectedCbBox>
      );
    } else {
      return <MemberDirectoryUI props={this.props} />;
    }
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isScreenLoaded: state.addMember.isScreenLoaded,
    membersList: state.addMember.membersList,
    selectedMembersList: state.addMember.selectedMembersList,
    membersCount: state.addMember.membersCount,
    SaveAppointmentMessage: state.addMember.SaveAppointmentMessage,
    ReservationData: state.addMember.ReservationData,
  };
};
const mapDispatchToProps = {
  resetLoadedScreen,
  handleSelectedMember,
  setMembersList,
  removeMembersFromList,
  addTbdToMemberList,
  resetSingleMemberDetails,
  setUserType,
  setmembersCount,
  setClosememberModel,
  setSaveAppointmentMessage,
  setReservationData
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberUI);
