import * as UI from "@/components/cobalt/importUI";
import { RootState } from "@/components/redux/store";
import { styles } from "@/source/styles/memberDirectory/memberDirectory.web";
import { Icon } from "@/components/ui/icon";
import { connect } from "react-redux";
import { CloseIcon } from "@/components/ui/icon";
import { Text, Modal, Image, TextInput } from "react-native";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "@/components/ui/icon";
import useMemberDirectoryLogic from "@/source/controller/memberDirectory/memberDirectory";
import {
  addMembersForReservation,
  resetLoadedScreen,
  resetSingleMemberDetails,
  setAddMultiple,
  setMembersList,
  setOpenMembersModel,
  setselectedMembersList,
  singleMemberDetails,
} from "@/components/redux/reducers/addMemberReducer";
import CalendarPicker from "react-native-calendar-picker";
import { Ionicons } from "@expo/vector-icons";
import {getExistingGuestList, getMemberList, resetMemberListPerBatch,} from "@/components/redux/reducers/memberDirectoryReducer";
import CbLoader from "@/components/cobalt/webCobaltLoader";
import { setFormFieldData } from "@/components/redux/reducers/loginReducer";
import { guestData } from "@/components/constants/CustomJson";

const pageId = "MemberDirectory";
class MemberDirectoryUI extends useMemberDirectoryLogic {
  renderMemberItem = ({ item }: { item: any }) => {
    return (
      <UI.TouchableOpacity
        style={[
          styles.memberItem,
          { backgroundColor: item.isMemberSelected ? "#e0e0e0" : "#fff" },
        ]}
        onPress={() => this.selectedMember(item)}
      >
        <UI.View>
          <Image
            style={styles.stretch}
            source={require("@/assets/images/profile.png")}
          />
        </UI.View>
        <UI.ConnectedCbView>
          <Text style={styles.memberName} numberOfLines={2}>
            {item?.DisplayName}
          </Text>
          <Text style={styles.memberId}>{item?.MemberID}</Text>
        </UI.ConnectedCbView>
      </UI.TouchableOpacity>
    );
  };
  renderPagination = () => {
    const { startPage, visiblePageLimit, currentPage, membersPerPage } =
      this.state;
    const totalPages = this.getTotalPages();

    if (totalPages <= 1) return null;

    const visiblePages = Math.min(visiblePageLimit, totalPages - startPage + 1);
    const totalMembers = this.props.totalCount;
    const start = (currentPage - 1) * membersPerPage + 1;
    // const end = Math.min(start + membersPerPage - 1, totalMembers);
    const end = Math.min(start + membersPerPage - 1, totalMembers);

    const pages = [];
    for (let i = 0; i < visiblePages; i++) {
      const pageNum = startPage + i;
      const isActive = currentPage === pageNum;
      pages.push(
        <UI.TouchableOpacity
          key={i}
          onPress={() => this.handlePageChange(pageNum)}
          style={[
            styles.pageButton,
            // { paddingHorizontal: this.state.screenWidth <= 780 ? 5 : 10 },
          ]}
        >
          <Text
            style={[
              styles.pageText,
              { fontSize: 18 },
              isActive && styles.activePageText,
            ]}
          >
            {pageNum}
          </Text>
        </UI.TouchableOpacity>
      );
    }

    return (
      <UI.View style={styles.paginationContainer}>
        <UI.View
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <UI.TouchableOpacity
            //  disabled={currentPage === 1}
            style={{ width: 30, height: 30 }}
            onPress={this.handleFirstPage}
          >
            <Icon as={ChevronsLeftIcon} />
          </UI.TouchableOpacity>

          <UI.TouchableOpacity
            // disabled={currentPage === 1}
            style={{ width: 30, height: 30 }}
            onPress={this.handleLeftPress}
          >
            <Icon as={ChevronLeftIcon} />
          </UI.TouchableOpacity>

          {pages}

          <UI.TouchableOpacity
            // disabled={currentPage === totalPages}
            style={{ width: 30, height: 30 }}
            onPress={this.handleRightPress}
          >
            <Icon as={ChevronRightIcon} />
          </UI.TouchableOpacity>

          <UI.TouchableOpacity
            // disabled={currentPage === totalPages}
            style={{ width: 30, height: 30 }}
            onPress={this.handleLastPage}
          >
            <Icon as={ChevronsRightIcon} />
          </UI.TouchableOpacity>
        </UI.View>

        <UI.View
          style={{ justifyContent: "center", alignItems: "flex-end", flex: 1 }}
        >
          <Text style={{ color: "#888", fontSize: 18 }}>
            {`Displaying ${start} to ${totalMembers}`}
            {/* {`Displaying ${start} to ${end} of ${totalMembers}`} */}
          </Text>
        </UI.View>
      </UI.View>
    );
  };
  renderGuestSelector = () => {
    const { selectedGuest } = this.state;
    return (
      <UI.ConnectedCbView
        style={styles.RadioContainer}
        pageId={pageId}
        id="RadioContainer"
      >
        {guestData.map((value, i) => (
          <UI.TouchableOpacity
            key={i}
            style={styles.optionContainer}
            onPress={() => this.setState({ selectedGuest: value?.label })}
          >
            <UI.ConnectedCbView
              style={styles.radioOuter}
              pageId={pageId}
              id="radioOuter"
            >
              {selectedGuest === value?.label && (
                <UI.ConnectedCbView
                  style={styles.radioInner}
                  pageId={pageId}
                  id="radioInner"
                />
              )}
            </UI.ConnectedCbView>
            <UI.ConnectedCbText style={styles.label} pageId={pageId} id="label">
              {value?.label}
            </UI.ConnectedCbText>
          </UI.TouchableOpacity>
        ))}
      </UI.ConnectedCbView>
    );
  };
  renderSelectedCircles = () => {
    return (
      <UI.ConnectedCbView style={styles.circleRow}>
        {this.state.selectedMembers.map((item, index) => (
          <UI.ConnectedCbView key={index} style={styles.circleContainer}>
            <Image
              source={
                item && item?.ProfilePic
                  ? { uri: item?.ProfilePic } // This assumes ProfilePic is a valid URL string
                  : require("@/assets/images/login.jpg")
              }
              style={styles.circleImage}
            />
            {item && (
              <UI.TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.removeSelectedMember(item, index)}
              >
                <UI.ConnectedCbText style={styles.cancelText}>
                  ×
                </UI.ConnectedCbText>
              </UI.TouchableOpacity>
            )}
          </UI.ConnectedCbView>
        ))}
      </UI.ConnectedCbView>
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
    const { setFormFieldData } = this.props;
    const UpdatedMemberAndGuestData = this.getCurrentPageData(); 

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.OpenMemberModel}
        // onRequestClose={this.toggleMemberModel}
      >
        <UI.ConnectedCbView
          style={styles.modalBackground}
          pageId={pageId}
          id="modalBackground"
        >
          <UI.ConnectedCbView
            style={styles.modalContainer}
            pageId={pageId}
            id="modalContainer"
          >
            <UI.ConnectedCbView
              style={styles.modalHeader}
              pageId={pageId}
              id="modalHeader"
            >
              <UI.ConnectedCbText
                style={styles.modalTitle}
                pageId={pageId}
                e
                id="modalTitle"
              >
                {this.props.ChangeToGuest === "Guest"
                  ? "Add Guest"
                  : "Add Member"}
              </UI.ConnectedCbText>
            </UI.ConnectedCbView>

            <UI.TouchableOpacity
              onPress={this.handleMemberDirtory}
              style={styles.closeIcon}
              onMouseEnter={() => this.setState({ hover: "close" })}
              onMouseLeave={() => this.setState({ hover: null })}
            >
              <Icon
                as={CloseIcon}
                size="sm"
                style={{
                  color: this.state.hover === "close" ? "#000" : "#fff",
                }}
              />
            </UI.TouchableOpacity>

            <UI.ScrollView>
              {this.props.ChangeToGuest === "Guest" && (
                <UI.ConnectedCbView
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  {this.renderGuestSelector()}
                </UI.ConnectedCbView>
              )}
              {this.state.selectedGuest === "Existing Guest" ? (
                <>
                  <UI.ConnectedCbView
                    style={{ padding: 30, flexDirection: "row" }}
                  >
                    <UI.ConnectedCbView
                      style={styles.searchRow}
                      pageId={pageId}
                      id="searchRow"
                    >
                      <UI.ConnectedCbInput
                        id="Search2"
                        labelRequired={false}
                        style={styles.input}
                        formId={pageId}
                        placeholder="Search by Member Last Name"
                        placeholderTextColor="#565c5f"
                        
                      />

                      <UI.TouchableOpacity
                        style={[
                          styles.searchButton,
                          this.state.hover === "search" && {
                            backgroundColor: "black",
                            borderColor: "#000",
                          },
                        ]}
                        onMouseEnter={() => this.setState({ hover: "search" })}
                        onMouseLeave={() => this.setState({ hover: null })}
                        onPress={this.handleSearchMemberByChar}
                      >
                        <Text
                          style={[
                            styles.searchClearButtonText,
                            this.state.hover === "search" && { color: "white" },
                          ]}
                        >
                          Search
                        </Text>
                      </UI.TouchableOpacity>
                      
                      <UI.TouchableOpacity
                        style={[
                          styles.clearButton,
                          this.state.hover === "clear" && {
                            backgroundColor: "black",
                            borderColor: "#000",
                          },
                        ]}
                        onMouseEnter={() => this.setState({ hover: "clear" })}
                        onMouseLeave={() => this.setState({ hover: null })}
                        onPress={this.handleClear}
                      >
                        <Text
                          style={[
                            styles.searchClearButtonText,
                            this.state.hover === "clear" && { color: "white" },
                          ]}
                        >
                          Clear
                        </Text>
                      </UI.TouchableOpacity>
                    </UI.ConnectedCbView>

                    {this.props.ChangeToGuest !== "Guest" && (
                      <UI.ConnectedCbView
                        style={styles.checkBoxContainer}
                        pageId={pageId}
                        id="checkBoxContainer"
                      >
                        <UI.ConnectedCbView
                          onMouseEnter={() =>
                            this.setState({ hover: "checkbox" })
                          }
                          onMouseLeave={() => this.setState({ hover: null })}
                          style={[
                            styles.checkboxclick,
                            {
                              backgroundColor:
                                this.state.hover === "checkbox"
                                  ? "#000"
                                  : "transparent",
                            },
                          ]}
                          pageId={pageId}
                          id="checkboxclick"
                        >
                          <UI.TouchableOpacity
                            onPress={this.handleCheckBox}
                            activeOpacity={1}
                          >
                            <Checkbox
                              size="md"
                              isInvalid={false}
                              isDisabled={false}
                              style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              value=""
                            >
                              <CheckboxIndicator
                                style={{
                                  borderWidth: 1,
                                  width: 25,
                                  height: 25,
                                  borderRadius: 5,
                                  // borderColor: "#e0e0e0",
                                  marginRight: 10,
                                  backgroundColor: "#000",
                                }}
                              >
                                <CheckboxIcon as={CheckIcon} stroke="#fff" />
                              </CheckboxIndicator>
                              <CheckboxLabel
                                style={[
                                  styles.checkboxLabel,
                                  {
                                    color:
                                      this.state.hover === "checkbox"
                                        ? "#fff"
                                        : "#5773A2",
                                  },
                                ]}
                              >
                                Add to My Buddy List
                              </CheckboxLabel>
                            </Checkbox>
                          </UI.TouchableOpacity>
                        </UI.ConnectedCbView>
                      </UI.ConnectedCbView>
                    )}
                  </UI.ConnectedCbView>
                  {/* 1. Selected Circles */}
                  {this.props.AddMultiple && this.renderSelectedCircles()}

                  {UpdatedMemberAndGuestData && UpdatedMemberAndGuestData.length > 0 ? (
                    <UI.FlatList
                      contentContainerStyle={styles.memberList}
                      data={UpdatedMemberAndGuestData}
                      renderItem={this.renderMemberItem}
                      keyExtractor={(item, index) => index.toString()}
                      numColumns={4}
                      scrollEnabled={false}
                    />
                  ) : (
                    <UI.Box style={styles.emptyListContainer}>
                      <UI.Text style={styles.emptyMealTxt}>
                        No Record Found
                      </UI.Text>
                    </UI.Box>
                  )}
                  {this.renderPagination()}
                </>
              ) : (
                <UI.ConnectedCbView
                  style={{ width: "100%", alignItems: "center" }}
                >
                  <UI.ConnectedCbView style={[styles.newGuestRow1]}>
                    <UI.ConnectedCbInput
                      id="firstName"
                      placeholder="First Name"
                      style={styles.input}
                      pageId={pageId}
                      onChange={(value) =>
                        this.handleInputChange("firstName", value)
                      }
                    />
                    <UI.ConnectedCbInput
                      id="lastName"
                      placeholder="Last Name"
                      style={styles.input}
                      pageId={pageId}
                      // formId={pageId}
                      onChange={(value) =>
                        this.handleInputChange("lastName", value)
                      }
                    />
                    <UI.ConnectedCbSelectDropDown
                      options={this.servicesOptions}
                      customstyle={{
                        color: "#6D6D6D",
                        width: this.state.screenWidth <= 780 ? "100%" : "30%",
                      }}
                      dropdownCustom={{ zIndex: 1, padding: 10 }}
                      onSelect={this.selectService}
                    />
                  </UI.ConnectedCbView>

                  <UI.ConnectedCbView
                    style={{
                      width: this.state.screenWidth <= 1024 ? "90%" : "70%",
                      zIndex: -1,
                    }}
                  >
                    <UI.ConnectedCbText style={styles.optinalTxt}>
                      Optional
                    </UI.ConnectedCbText>

                    <UI.ConnectedCbView
                      style={{
                        flexDirection:
                          this.state.screenWidth <= 780 ? "column" : "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 50,
                      }}
                    >
                      {/* Cell Phone */}
                      <UI.ConnectedCbView
                        style={{
                          width: this.state.screenWidth <= 780 ? "100%" : "45%",
                        }}
                      >
                        <UI.ConnectedCbText style={styles.formTxt}>
                          Cell Phone
                        </UI.ConnectedCbText>
                        <UI.ConnectedCbInput
                          placeholder="Cell Phone"
                          id="Phone"
                          style={styles.input}
                          keyboardType="phone-pad"
                          onChange={(value) =>
                            this.handleInputChange("Phone", value)
                          }
                          pageId={pageId}
                        />
                      </UI.ConnectedCbView>

                      {/* Primary Email */}
                      <UI.ConnectedCbView
                        style={{
                          width: this.state.screenWidth <= 780 ? "100%" : "45%",
                        }}
                      >
                        <UI.ConnectedCbText style={styles.formTxt}>
                          Primary Email
                        </UI.ConnectedCbText>
                        <UI.ConnectedCbInput
                          placeholder="Primary Email"
                          id="email"
                          style={styles.input}
                          keyboardType="email-address"
                          onChange={(value) =>
                            this.handleInputChange("email", value)
                          }
                          pageId={pageId}
                        />
                      </UI.ConnectedCbView>
                    </UI.ConnectedCbView>
                    <UI.ConnectedCbView style={styles.genderContainer}>
                      <UI.ConnectedCbView
                        style={{
                          width: this.state.screenWidth <= 780 ? "100%" : "45%",
                        }}
                      >
                        <UI.ConnectedCbText style={styles.GenderTxt}>
                          Gender
                        </UI.ConnectedCbText>
                        <UI.ConnectedCbSelectDropDown
                          options={this.genderOptions}
                          customstyle={styles.genderoptionsStyles}
                          dropdownCustom={{ zIndex: 1 }}
                          onSelect={this.selectGender}
                          placeholder={"Gender"}
                        />
                      </UI.ConnectedCbView>

                      {this.state.Opencalender && (
                        <UI.ConnectedCbView style={styles.calendar}>
                          <UI.ConnectedCbView
                            style={{
                              transform: [{ scale: 0.85 }],
                              marginTop: -15,
                            }}
                          >
                            <CalendarPicker
                              onDateChange={this.onWebDateChange}
                              selectedDayColor="#002c5f"
                              selectedDayTextColor="#000"
                              textStyle={{ color: "#000" }}
                              yearTitleStyle={{ color: "#000" }}
                              previousTitle="<"
                              nextTitle=">"
                              previousTitleStyle={{
                                color: "#000",
                                fontSize: 24,
                              }}
                              nextTitleStyle={{ color: "#000", fontSize: 24 }}
                              width={300}
                              height={350}
                              //  minDate={currentDate}
                              maxDate={new Date()}
                            />
                          </UI.ConnectedCbView>
                        </UI.ConnectedCbView>
                      )}
                      <UI.ConnectedCbView
                        style={{
                          width: this.state.screenWidth <= 780 ? "100%" : "45%",
                        }}
                      >
                        <UI.ConnectedCbText style={styles.textstyles}>
                          DOB
                        </UI.ConnectedCbText>
                        <UI.TouchableOpacity
                          style={styles.dobContainer}
                          onPress={this.toggleCalendar}
                          activeOpacity={0.8}
                        >
                          <TextInput
                            placeholder="Date of Birth"
                            style={styles.dobInput}
                            value={this.formatDate(this.state.selectedDate)}
                            editable={false}
                            pointerEvents="none"
                          />
                          <Ionicons
                            name="calendar-outline"
                            size={20}
                            color="#999"
                            style={styles.calendarIcon}
                          />
                        </UI.TouchableOpacity>
                      </UI.ConnectedCbView>
                    </UI.ConnectedCbView>
                  </UI.ConnectedCbView>
                </UI.ConnectedCbView>
              )}
              <UI.ConnectedCbView
                style={[styles.addMemberBtncontainer, { ZIndex: -1 }]}
              >
                <UI.TouchableOpacity
                  style={styles.addMemberBtn}
                  onPress={
                    this.state.selectedGuest === "New Guest"
                      ? this.addNewGuest
                      : this.addMemberForReservation
                  }
                >
                  <UI.ConnectedCbText style={[styles.addMemberBtnTxt]}>
                    {" "}
                    Add
                  </UI.ConnectedCbText>
                </UI.TouchableOpacity>
              </UI.ConnectedCbView>
            </UI.ScrollView>
          </UI.ConnectedCbView>
        </UI.ConnectedCbView>
        <CbLoader visible={this.props.memberDirectoryloading} />

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
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  
  
  return {
    memberDirectoryloading: state.memberDirectory.loading,
    loading: state.dashboard.loading,
    OpenMemberModel: state?.addMember?.OpenMemberModel,
    ChangeToGuest: state?.addMember?.ChangeToGuest,
    memberList: state.memberDirectory.memberList,
    getExistingGuestList: state.memberDirectory.memberList,
    errorMessage: state.dashboard.errorMessage,
    memberListPerBatch: state.memberDirectory.memberListPerBatch,
    GuestListPerBatch: state.memberDirectory.GuestListPerBatch,
    totalCount: state.memberDirectory.totalCount,
    addMemberList: state.addMember.membersList,
    selectedMembersList: state.addMember.selectedMembersList,
    singleItemDetails: state.addMember.singleMemberDetails,
    userType: state.addMember.userType,
    AddMultiple: state.addMember.AddMultiple,
    membersCount: state.addMember.membersCount,
    formData: state.login?.formData,
  };
};
const mapDispatchToProps = {
  setOpenMembersModel,
  getMemberList,
  resetLoadedScreen,
  singleMemberDetails,
  addMembersForReservation,
  resetSingleMemberDetails,
  setFormFieldData,
  resetMemberListPerBatch,
  getExistingGuestList,
  setAddMultiple,
  setselectedMembersList,
  setMembersList,
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberDirectoryUI);
