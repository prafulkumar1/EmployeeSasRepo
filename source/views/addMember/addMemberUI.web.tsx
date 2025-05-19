import * as UI from "@/components/cobalt/importUI";
import { RootState } from "@/components/redux/store";
import { styles } from "@/source/styles/addMember/addMember.web";
import { connect } from "react-redux";
import { Icon } from "@/components/ui/icon";
import { CloseIcon, AddIcon } from "@/components/ui/icon";
import { Text, Image, Modal } from "react-native";
import useAddMemberLogic from "@/source/controller/addMember/addMember";
import {
  setClosememberModel,
  setOpenAddmemberModel,
} from "@/components/redux/reducers/reservationReducer";
import {
  setChangeToGuest,
  setOpenMembersModel,
} from "@/components/redux/reducers/addMemberReducer";
import { setLoader } from "@/components/redux/reducers/uiSlice";
import CbLoader from "@/components/cobalt/webCobaltLoader";

const pageId = "AddMember";
class AddMemberUI extends useAddMemberLogic {
  renderMemberInputRows = () => {
    const { popupVisibleIndex, selectedCount } = this.state;
    let rows = [];
    for (let i = 0; i < selectedCount; i++) {
      rows.push(
        <UI.ConnectedCbView
          key={i}
          style={[styles.memberFieldWrapper, { position: "relative" }]}
          pageId={pageId}
          id="memberFieldWrapper"
        >
          <UI.ConnectedCbView style={styles.memberInputRow}>
            <UI.Text style={styles.MemberTxt}> Reservation {i + 1}</UI.Text>
            <UI.ConnectedCbView style={styles.iconcontainer}>
              <UI.TouchableOpacity
                style={[{ width: 30, height: 30 }]}
                onPress={(e) => this.handleRemoveMember(i)}
              >
                <UI.Icon as={CloseIcon} size="sm" color="#ccc" />
              </UI.TouchableOpacity>

              <UI.TouchableOpacity
                style={[{ width: 30, height: 30 }]}
                onPress={(e) => this.handleAddIconPress(i, e)}
              >
                <UI.Icon as={AddIcon} size="sm" color="#08c3f8" />
              </UI.TouchableOpacity>
            </UI.ConnectedCbView>
          </UI.ConnectedCbView>

          {popupVisibleIndex === Number(i) && (
            <UI.ConnectedCbView
              style={[styles.popupContainer]}
              pageId={pageId}
              id="popupContainer"
            >
              <UI.Pressable
                style={[
                  styles.popupButton,
                  {
                    backgroundColor:
                      this?.state?.hover === "member" ? "#000" : "#fff",
                  },
                ]}
                onPress={() => this.handleSetGuest("member")}
                onMouseEnter={() => this.setState({ hover: "member" })}
                onMouseLeave={() => this.setState({ hover: null })}
              >
                <UI.ConnectedCbText
                  style={styles.popupButtonText}
                  pageId={pageId}
                  id="popupButtonText"
                >
                  Members
                </UI.ConnectedCbText>
              </UI.Pressable>
              <UI.Pressable
                style={[
                  styles.popupButton,
                  {
                    backgroundColor:
                      this?.state?.hover === "guest" ? "#000" : "#fff",
                  },
                ]}
                onMouseEnter={() => this.setState({ hover: "guest" })}
                onMouseLeave={() => this.setState({ hover: null })}
                onPress={() => this.handleSetGuest("Guest")}
              >
                <UI.ConnectedCbText
                  style={styles.popupButtonText}
                  pageId={pageId}
                  id="popupButtonText"
                >
                  Guest
                </UI.ConnectedCbText>
              </UI.Pressable>
              <UI.Pressable
                style={[
                  styles.popupButton,
                  {
                    backgroundColor:
                      this?.state?.hover === "TBD" ? "#000" : "#fff",
                  },
                ]}
                onMouseEnter={() => this.setState({ hover: "TBD" })}
                onMouseLeave={() => this.setState({ hover: null })}
              >
                <UI.ConnectedCbText
                  style={styles.popupButtonText}
                  pageId={pageId}
                  id="popupButtonText"
                >
                  TBD
                </UI.ConnectedCbText>
              </UI.Pressable>
            </UI.ConnectedCbView>
          )}
        </UI.ConnectedCbView>
      );
    }
    return rows;
  };

  render() {
    let pageConfigJson = global.appConfigJsonArray.find(
      (item) => item?.PageId === pageId
    );
    global.controlsConfigJson =
      pageConfigJson && pageConfigJson.Controlls
        ? pageConfigJson.Controlls
        : [];
    const membersCount = this.state.membersCount;
    const membersCountdata = Array.from({ length: membersCount }, (_, i) => i + 1);

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
                <UI.FlatList
                  data={membersCountdata}
                  horizontal
                  renderItem={({ item }) => (
                    <UI.TouchableOpacity
                      onPress={() => this.handleCirclePress(item)}
                    >
                      <UI.View
                        style={[
                          styles.circleItem,
                          {
                            backgroundColor:
                              this.state.selectedCount === item
                                ? "#08c3f8"
                                : "#fff",
                          },
                        ]}
                      >
                        <UI.ConnectedCbText
                          style={styles.circleText}
                          pageId={pageId}
                          id="circleText"
                        >
                          {item}
                        </UI.ConnectedCbText>
                      </UI.View>
                    </UI.TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.toString()}
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
                    onPress={() => this.handleSetGuest("member")}
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
                    onPress={() => this.handleSetGuest("Guest")}
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
              <UI.ConnectedCbView style={styles.memberCardsContainer}>
                {this.renderMemberInputRows()}
              </UI.ConnectedCbView>

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
                />
              </UI.ConnectedCbBox>
            </UI.ScrollView>
            <UI.ConnectedCbView
              style={styles.SubmitContainer}
              pageId={pageId}
              id="SubmitContainer"
            >
              <UI.TouchableOpacity style={styles.SubmitBtn}>
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
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.dashboard.loading,
    OpenAddmemberModel: state?.reservation?.OpenAddmemberModel,
    OpenMemberModel: state?.addMember?.OpenMemberModel,
  };
};
const mapDispatchToProps = {
  setOpenAddmemberModel,
  setOpenMembersModel,
  setClosememberModel,
  setChangeToGuest,
  setLoader,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberUI);
