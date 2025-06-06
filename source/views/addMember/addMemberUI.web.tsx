import * as UI from "@/components/cobalt/importUI";
import { RootState } from "@/components/redux/store";
import { styles } from "@/source/styles/addMember/addMember.web";
import { connect } from "react-redux";
import { Icon } from "@/components/ui/icon";
import { CloseIcon, AddIcon } from "@/components/ui/icon";
import { Text, Image, Modal, TextInput } from "react-native";
import useAddMemberLogic from "@/source/controller/addMember/addMember";
import {
  setClosememberModel,
  setOpenAddmemberModel,
} from "@/components/redux/reducers/reservationReducer";
import {
  addTbdToMemberList,
  handleSelectedMember,
  removeMembersFromList,
  resetLoadedScreen,
  resetSingleMemberDetails,
  setAddMultiple,
  setChangeToGuest,
  setmembersCount,
  setMembersList,
  setOpenMembersModel,
  setUserType,
} from "@/components/redux/reducers/addMemberReducer";
import { setLoader } from "@/components/redux/reducers/uiSlice";
import CbLoader from "@/components/cobalt/webCobaltLoader";

const pageId = "AddMember";
const addMemberList = [
  { id: 1, memberType: "Member" },
  { id: 2, memberType: "Guest" },
  { id: 3, memberType: "TBD" },
];
class AddMemberUI extends useAddMemberLogic {
  renderAddedMemberList = ({ item, index }) => {  
    return (
      <>
        <UI.ConnectedCbView
          key={index}
          style={[styles.memberFieldWrapper]}
          pageId={pageId}
          id="memberFieldWrapper"
        >
          <UI.ConnectedCbView style={styles.memberInputRow}>
            <UI.Text style={styles.MemberTxt}>{item?.memberName}</UI.Text>
            <UI.ConnectedCbView style={styles.iconcontainer}>
              <UI.TouchableOpacity
                style={[{ width: 30, height: 30 }]}
               onPress={() => this.props.removeMembersFromList(item?.number)}
              >
                <UI.Icon as={CloseIcon} size="sm" color="#ccc" />
              </UI.TouchableOpacity>
              <UI.TouchableOpacity
                ref={(ref) => {
                  if (ref) this.addIconRefs[item.id] = ref;
                }}
                style={[{ width: 30, height: 30 }]}
                onPress={(e) => this.handleAddIconPress(item, e)}
              >
                <UI.Icon as={AddIcon} size="sm" color="#08c3f8" />
              </UI.TouchableOpacity>
            </UI.ConnectedCbView>
          </UI.ConnectedCbView>
        </UI.ConnectedCbView>
      </>
    );
  };

  renderAddMember = ({ item, index }) => {
    return (
      <UI.TouchableOpacity
        onPress={() => this.handleMembersCount(item.id, item.number)}
        key={item.id}
      >
        <UI.View
          style={[
            styles.circleItem,
            { backgroundColor: item.isCountActive ? "#1dc6ff" : "#fff" },
          ]}
        >
          <UI.ConnectedCbText
            style={styles.circleText}
            pageId={pageId}
            id="circleText"
          >
            {item.number}
          </UI.ConnectedCbText>
        </UI.View>
      </UI.TouchableOpacity>
    );
  };

  render() {
    let pageConfigJson = global.appConfigJsonArray.find(
      (item) => item?.PageId === pageId
    );
    global.controlsConfigJson =
      pageConfigJson && pageConfigJson.Controlls
        ? pageConfigJson.Controlls
        : [];

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.OpenAddmemberModel}
        // onRequestClose={this.toggleModal}
      >
        <UI.ConnectedCbView
          style={styles.modalBackground}
          pageId={pageId}
          id="modalBackground"
        >
          <UI.ConnectedCbView style={styles.modalContainer}>
            <UI.ConnectedCbView style={styles.modalTitleContainer}>
              <UI.ConnectedCbText style={styles.modalTitle}>
                Add Member
              </UI.ConnectedCbText>
              <UI.TouchableOpacity
                onPress={() => this.props.setOpenAddmemberModel()}
                style={styles.CloseModel}
              >
                <Icon as={CloseIcon} size="sm" />
              </UI.TouchableOpacity>
            </UI.ConnectedCbView>
            <UI.ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}
            >
              <UI.ConnectedCbView
                style={styles.timerRow}
                pageId={pageId}
                id="timerRow"
              >
                <UI.ConnectedCbView
                  style={styles.timerWrapper}
                  pageId={pageId}
                  id="timerWrapper"
                >
                  <UI.ConnectedCbText
                    style={styles.timerText}
                    pageId={pageId}
                    id="timerText"
                  >
                    {" "}
                    {this.formatTime(this.state.timeLeft)}
                  </UI.ConnectedCbText>
                </UI.ConnectedCbView>
              </UI.ConnectedCbView>

              <UI.ConnectedCbView
                style={styles.playerListRow}
                pageId={pageId}
                id="playerListRow"
              >
                {/* CIRCLE BUTTONS*/}
                <UI.FlatList
                  data={this.state.membersCountList}
                  horizontal
                  renderItem={this.renderAddMember}
                  style={{ flex: 1 }}
                />
                <UI.TouchableOpacity
                  style={styles.addMultipleBtn}
                  onPress={this.toggleMutiplePlayers}
                >
                  <UI.ConnectedCbText
                    style={styles.addMultipleBtnText}
                    pageId={pageId}
                    id="addMultipleBtnText"
                  >
                    Add Multiple Players
                  </UI.ConnectedCbText>
                </UI.TouchableOpacity>
              </UI.ConnectedCbView>
              {this.state.showplayedpopup && (
                <UI.ConnectedCbView
                  style={[styles.MutiplepopupContainer, { zIndex: 1 }]}
                  pageId={pageId}
                  id="MutiplepopupContainer"
                >
                  <UI.Pressable
                    style={[
                      styles.popupButton,
                      {
                        backgroundColor:
                          this?.state?.hover === "Addmember" ? "#000" : "#fff",
                      },
                    ]}
                    onPress={() => {
                      this.handleSetGuest("member");
                      this.props.setUserType("Member");
                    }}
                    onMouseEnter={() => this.setState({ hover: "Addmember" })}
                    onMouseLeave={() => this.setState({ hover: null })}
                  >
                    <UI.Text style={styles.popupButtonText}>Members</UI.Text>
                  </UI.Pressable>
                  <UI.Pressable
                    style={[
                      styles.popupButton,
                      {
                        backgroundColor:
                          this?.state?.hover === "addguest" ? "#000" : "#fff",
                      },
                    ]}
                    onMouseEnter={() => this.setState({ hover: "addguest" })}
                    onMouseLeave={() => this.setState({ hover: null })}
                    onPress={() => {
                      this.handleSetGuest("Guest");
                      this.props.setUserType("Guest");
                    }}
                  >
                    <UI.ConnectedCbText style={styles.popupButtonText}>
                      Guest
                    </UI.ConnectedCbText>
                  </UI.Pressable>
                </UI.ConnectedCbView>
              )}

              <UI.ConnectedCbView
                style={styles.memberSection}
                pageId={pageId}
                id="memberSection"
              >
                <UI.ConnectedCbView
                  style={styles.Pluscontainer}
                  pageId={pageId}
                  id="Pluscontainer"
                >
                  <UI.ConnectedCbText
                    style={styles.sectionNote}
                    pageId={pageId}
                    id="sectionNote"
                  >
                    Please click on{"  "}
                  </UI.ConnectedCbText>
                  <UI.ConnectedCbView
                    style={styles.plusCircle}
                    pageId={pageId}
                    id="plusCircle"
                  >
                    <UI.ConnectedCbText
                      style={styles.plusText}
                      pageId={pageId}
                      id="plusText"
                    >
                      +
                    </UI.ConnectedCbText>
                  </UI.ConnectedCbView>
                  <UI.ConnectedCbText
                    style={styles.sectionNote}
                    pageId={pageId}
                    id="sectionNote"
                  >
                    {"  "}
                    to select Member, Guest or My Buddies
                  </UI.ConnectedCbText>
                </UI.ConnectedCbView>
              </UI.ConnectedCbView>

              {this.props.membersList.length > 0 && (
                <UI.View style={styles.membersWrapper}>
                  <UI.FlatList
                    scrollEnabled={false}
                    data={this.props.membersList}
                    renderItem={this.renderAddedMemberList}
                    numColumns={2}
                    extraData={this.state}
                  />
                </UI.View>
              )}

              <UI.ConnectedCbBox
                style={{ marginTop: 10, padding: 12, zIndex: -1 }}
              >
                <UI.ConnectedCbText
                  style={styles.commentTxt}
                  pageId={pageId}
                  id="commentTxt"
                >
                  Comments
                </UI.ConnectedCbText>

                <UI.ConnectedCbInput
                  id="Comments"
                  style={styles.commentsBox}
                  multiline={true}
                  numberOfLines={4}
                  formId={pageId}
                  onChange={(value) =>
                    this.handlecomment(value)
                  }
                />
              </UI.ConnectedCbBox>
            </UI.ScrollView>
            <UI.ConnectedCbView
              style={styles.SubmitContainer}
              pageId={pageId}
              id="SubmitContainer"
            >
              <UI.TouchableOpacity style={styles.SubmitBtn} onPress={this.handleSubmitReservation}>
                <UI.ConnectedCbText
                  style={styles.submitTxt}
                  pageId={pageId}
                  id="submitTxt"
                >
                  Submit
                </UI.ConnectedCbText>
              </UI.TouchableOpacity>
            </UI.ConnectedCbView>

            <UI.ConnectedCbText style={styles.txt1} pageId={pageId} id="txt1">
              SPA POLICIES
            </UI.ConnectedCbText>
            <UI.ConnectedCbText style={styles.txt2} pageId={pageId} id="txt2">
              Hilcox, Loreson | #13310-00
            </UI.ConnectedCbText>
          </UI.ConnectedCbView>
        </UI.ConnectedCbView>
        <CbLoader visible={this.state.addmemberloading} />

        {this.state.popupVisibleIndex !== null && (
          <UI.ConnectedCbView
            style={[
              styles.popupContainer,
              {
                position: "absolute",
                top: this.state.popupPosition?.top || 0,
                left: this.state.popupPosition?.left || 0,
                zIndex: 999,
              },
            ]}
            pageId={pageId}
            id="popupContainer"
          >
            {addMemberList?.map((memberItem) => (
              <UI.Pressable
                key={memberItem.id}
                style={[
                  styles.popupButton,
                  {
                    backgroundColor:
                      this.state.hover === memberItem.memberType
                        ? "#000"
                        : "#fff",
                  },
                ]}
                onPress={() => this.handleSetGuest(memberItem.memberType)}
                onMouseEnter={() =>
                  this.setState({ hover: memberItem.memberType })
                }
                onMouseLeave={() => this.setState({ hover: null })}
              >
                <UI.ConnectedCbText
                  style={styles.popupButtonText}
                  pageId={pageId}
                  id="popupButtonText"
                >
                  {memberItem.memberType}
                </UI.ConnectedCbText>
              </UI.Pressable>
            ))}
          </UI.ConnectedCbView>
        )}
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.dashboard.loading,
    OpenAddmemberModel: state?.reservation?.OpenAddmemberModel,
    OpenMemberModel: state?.addMember?.OpenMemberModel,
    membersList: state.addMember.membersList,
    selectedMembersList: state.addMember.selectedMembersList,
    membersCount: state.addMember.membersCount,
    ReservationData: state.addMember.ReservationData,
  };
};
const mapDispatchToProps = {
  setOpenAddmemberModel,
  setOpenMembersModel,
  setClosememberModel,
  setChangeToGuest,
  setLoader,
  setMembersList,
  resetLoadedScreen,
  handleSelectedMember,
  removeMembersFromList,
  addTbdToMemberList,
  resetSingleMemberDetails,
  setUserType,
  setAddMultiple,
  setmembersCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberUI);
