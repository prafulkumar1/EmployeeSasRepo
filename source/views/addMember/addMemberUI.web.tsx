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

const pageId = "AddMember";
class AddMemberUI extends useAddMemberLogic {
  renderMemberInputRows = () => {
    const { popupVisibleIndex, selectedCount } = this.state;
    let rows = [];
    for (let i = 0; i < selectedCount; i++) {
      rows.push(
        <UI.View
          key={i}
          style={[styles.memberFieldWrapper, { position: "relative" }]}
        >
          <UI.View style={styles.memberInputRow}>
            <UI.Text style={styles.MemberTxt}> Reservation {i + 1}</UI.Text>
            <UI.View style={styles.iconcontainer}>
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
            </UI.View>
          </UI.View>

          {popupVisibleIndex === Number(i) && (
            <UI.View style={[styles.popupContainer]}>
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
                <UI.Text style={styles.popupButtonText}>Members</UI.Text>
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
                <UI.Text style={styles.popupButtonText}>Guest</UI.Text>
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
                <UI.Text style={styles.popupButtonText}>TBD</UI.Text>
              </UI.Pressable>
            </UI.View>
          )}
        </UI.View>
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
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.OpenAddmemberModel}
        // onRequestClose={this.toggleModal}
      >
        <UI.View style={styles.modalBackground}>
          <UI.View style={styles.modalContainer}>
            <UI.View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>Add Member</Text>
              <UI.TouchableOpacity
                onPress={() => this.props.setOpenAddmemberModel()}
                style={styles.CloseModel}
              >
                <Icon as={CloseIcon} size="sm" />
              </UI.TouchableOpacity>
            </UI.View>
            <UI.ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}
            >
              <UI.View style={styles.timerRow}>
                <UI.View style={styles.timerWrapper}>
                  <UI.Text style={styles.timerText}>
                    {" "}
                    {this.formatTime(this.state.timeLeft)}
                  </UI.Text>
                </UI.View>
              </UI.View>

              <UI.View style={styles.playerListRow}>
                <UI.FlatList
                  data={[1, 2, 3, 4]}
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
                        <UI.Text style={styles.circleText}>{item}</UI.Text>
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
                  <UI.Text style={styles.addMultipleBtnText}>
                    Add Multiple Players
                  </UI.Text>
                </UI.TouchableOpacity>
              </UI.View>
              {this.state.showplayedpopup && (
                <UI.View style={[styles.MutiplepopupContainer]}>
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
                    <UI.Text style={styles.popupButtonText}>Guest</UI.Text>
                  </UI.Pressable>
                </UI.View>
              )}

              <UI.View style={styles.memberSection}>
                <UI.View style={styles.Pluscontainer}>
                  <UI.Text style={styles.sectionNote}>
                    Please click on{"  "}
                  </UI.Text>
                  <UI.View style={styles.plusCircle}>
                    <UI.Text style={styles.plusText}>+</UI.Text>
                  </UI.View>
                  <UI.Text style={styles.sectionNote}>
                    {"  "}
                    to select Member, Guest or My Buddies
                  </UI.Text>
                </UI.View>
              </UI.View>
              <UI.View
                style={styles.memberCardsContainer}
              >
                {this.renderMemberInputRows()}
              </UI.View>

              <UI.Box style={{ marginTop: 10, padding: 12 }}>
                  <UI.Text style={styles.commentTxt}>Comments</UI.Text>

                <UI.ConnectedCbInput
                  id="Comments"
                  style={styles.commentsBox}
                  multiline={true}
                  numberOfLines={4}
                  formId={pageId}
                />
              </UI.Box>
            </UI.ScrollView>
            <UI.View style={styles.SubmitContainer}>
              <UI.TouchableOpacity style={styles.SubmitBtn}>
                <UI.Text style={styles.submitTxt}>Submit</UI.Text>
              </UI.TouchableOpacity>
            </UI.View>

            <UI.Text style={styles.txt1}>SPA POLICIES</UI.Text>
            <UI.Text style={styles.txt2}>Hilcox, Loreson | #13310-00</UI.Text>
          </UI.View>
        </UI.View>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberUI);
