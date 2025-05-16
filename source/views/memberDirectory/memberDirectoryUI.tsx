import React from "react";
import * as UI from "@/components/cobalt/importUI";
import {
  getFormFieldDataSelector,
  setFormFieldData,
} from "@/components/redux/reducers/memberDirectoryReducer";
import useMemberDirectoryLogic from "@/source/controller/memberDirectory/memberDirectory";
import { connect } from "react-redux";
import { RootState } from "@/components/redux/store";
import { styles } from "@/source/styles/memberDirectory/memberDirectoryStyle";
import { Icon } from "@/components/ui/icon";
import { getMemberList } from "@/components/redux/reducers/memberDirectoryReducer";
import CbLoader from "@/components/cobalt/cobaltLoader";
import {ChevronLeftIcon,ChevronRightIcon} from "@/components/ui/icon";

import {
  addMembersForReservation,
  resetLoadedScreen,
  resetSingleMemberDetails,
  singleMemberDetails,
} from "@/components/redux/reducers/addMemberReducer";
import { KeyboardAvoidingView, Modal, Platform, TextInput } from "react-native";
import { guestData } from "@/components/constants/CustomJson";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { responsiveHeight } from "react-native-responsive-dimensions";
import DateTimePicker from "@react-native-community/datetimepicker";

const pageId = "MemberDirectory";
class MemberDirectoryUI extends useMemberDirectoryLogic {
  renderAlfabet = ({ item, index }: any) => {
    const { activeTab } = this.state;
    return (
      <UI.TouchableOpacity
        style={[styles.tabItem, activeTab === index && styles.activeTab]}
        onPress={() => {
          this.setState({ activeTab: index }, () => this.scrollToTab(index));
        }}
      >
        <UI.Text
          style={[styles.alpabetTxt, activeTab === index && styles.activeTxt]}
        >
          {item.id}
        </UI.Text>
      </UI.TouchableOpacity>
    );
  };
  renderMemberList = ({ item, index }) => {
    return (
      <UI.Box
        style={[
          styles.memberContainer,
          { backgroundColor: item?.isMemberSelected ? "#e0e0e0" : "#fff" },
        ]}
      >
        <UI.TouchableOpacity
          style={styles.profileBtn}
          onPress={() => this.selectedMember(item)}
        >
          <UI.Box style={styles.profileLogo}>
            <UI.Image
              source={require("@/assets/images/profile.png")}
              style={styles.profileIcon}
            />
          </UI.Box>
          <UI.Box>
            <UI.Text style={styles.profileName}>{item.MemberName}</UI.Text>
            <UI.Text style={styles.memberAddress}>{item.MemberID}</UI.Text>
          </UI.Box>
        </UI.TouchableOpacity>
        <UI.Box style={styles.horizontalLine} />
      </UI.Box>
    );
  };
  renderLoadMoreBtn = () => {
    const currentValue = this.membersMock[this.state.activeTab];
    if (
      this.props.memberListPerBatch.length !== 0 &&
      currentValue.id === "All"
    ) {
      return (
        <UI.TouchableOpacity
          style={styles.submitBtn}
          onPress={this.loadMoreData}
        >
          <UI.Text style={styles.submitTxt}>Show More</UI.Text>
        </UI.TouchableOpacity>
      );
    }
  };

  renderGuestSelector = ({ item, index }) => {
    const { selectedGuest } = this.state;
    return (
      <UI.TouchableOpacity
        style={styles.optionContainer}
        onPress={() => this.setState({ selectedGuest: item?.label })}
      >
        <UI.Box style={styles.radioOuter}>
          {selectedGuest === item?.label && (
            <UI.Box style={styles.radioInner} />
          )}
        </UI.Box>
        <UI.Text style={styles.label}>{item.label}</UI.Text>
      </UI.TouchableOpacity>
    );
  };

  showMemberList = () => {
    if (this.state.selectedGuest == "New Guest") {
      return (
        <UI.ConnectedCbBox style={styles.GuestmainContainer}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <UI.ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: responsiveHeight(20),
              }}
            >
              <UI.ConnectedCbBox style={styles.innerContainers}>
                <UI.ConnectedCbInput
                  id="firstName"
                  placeholder="First Name"
                  style={styles.input}
                  formId={pageId}
                  setFormFieldData={setFormFieldData}
                />
                <UI.ConnectedCbInput
                  id="lastName"
                  placeholder="Last Name"
                  style={styles.input}
                  formId={pageId}
                  setFormFieldData={setFormFieldData}
                />
                <UI.ConnectedCbSelectDropDown
                  options={this.servicesOptions}
                  onSelect={this.selectService}
                  openDropDown={() => { }}
                  customstyle={[styles.serviceBtn]}
                  dropdownCustom={{ zIndex: 1 }}
                  placeholder={"Select the Service"}
                  setAddMemberIndex={this.setAddMemberIndex}
                  addMemberIndex={this.state.addMemberIndex}
                  selectItemId={0}
                />
              </UI.ConnectedCbBox>

              <UI.ConnectedCbBox style={styles.gap} />

              <UI.ConnectedCbBox style={styles.innerContainers}>
                <UI.Text style={styles.optionalTitle}>Optional</UI.Text>

                <UI.Text style={styles.Guestlabel}>Gender</UI.Text>
                <UI.ConnectedCbSelectDropDown
                  options={this.genderOptions}
                  onSelect={this.selectGender}
                  openDropDown={() => { }}
                  customstyle={[{ width: "100%" }]}
                  dropdownCustom={{ zIndex: 1 }}
                  placeholder={"Gender"}
                  setAddMemberIndex={this.setAddMemberIndex}
                  addMemberIndex={this.state.addMemberIndex}
                  selectItemId={1}
                />

                <UI.Text style={styles.Guestlabel}>Date of Birth</UI.Text>
                <UI.TouchableOpacity
                  style={styles.dobContainer}
                  onPress={this.handleShowDatePicker}
                  activeOpacity={0.8}
                >
                  <TextInput
                    placeholder="Date of Birth"
                    style={styles.dobInput}
                    value={this.formatDate(this.state.date)}
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

                {this.state.showDatePicker && (
                  <DateTimePicker
                    value={this.state.date || new Date()}
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    onChange={this.onDateChange}
                  />
                )}

                <UI.Text style={styles.Guestlabel}>Cell Phone</UI.Text>
                <UI.ConnectedCbInput
                  placeholder="Cell Phone"
                  id="Phone"
                  style={styles.input}
                  keyboardType="phone-pad"
                  setFormFieldData={setFormFieldData}
                  formId={pageId}
                />

                <UI.Text style={styles.Guestlabel}>Primary Email</UI.Text>
                <UI.ConnectedCbInput
                  placeholder="Primary Email"
                  id="email"
                  style={styles.input}
                  keyboardType="email-address"
                  setFormFieldData={setFormFieldData}
                  formId={pageId}
                />
              </UI.ConnectedCbBox>
            </UI.ScrollView>
          </KeyboardAvoidingView>
        </UI.ConnectedCbBox>
      )
    } else if (this.state.updatedMembersListData?.length > 0) {
      return (
        <UI.FlatList
          data={this.state?.updatedMembersListData}
          ListFooterComponent={this.renderLoadMoreBtn}
          style={{ opacity: this.props.loading ? 0.5 : 1 }}
          renderItem={this.renderMemberList}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={100}
          windowSize={21}
          getItemLayout={(_, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
        />
      )
    } else {
      return (
        <UI.Box style={styles.emptyListContainer}>
          <UI.Text style={styles.emptyMealTxt}>No Record Found</UI.Text>
        </UI.Box>
      )
    }
  }

  render() {
    const { setFormFieldData } = this.props;

    return (
      <UI.Box style={styles.mainContainer}>
        <UI.ConnectedCbHeader
          headerTitle={"Members Directory"}
          goBack={() => this.navigateToReservation()}
          goHome={() => this.navigateToService()}
        />
        <StatusBar hidden={true} />

        {/* Header Component */}
        {this.props.userType === "Member" ? (
          <UI.ConnectedCbBox style={styles.checkBoxWrapper}>
            <UI.TouchableOpacity
              onPress={this.toggleCheckbox}
              style={styles.checkBoxContainer}
            >
              <UI.Box style={styles.checkItem}>
                <UI.TouchableOpacity
                  onPress={this.toggleCheckbox}
                  style={styles.checkbox}
                >
                  {this.state.checked ? (
                    <UI.Image
                      source={require("@/assets/images/Check.png")}
                      style={styles.checkIcon}
                    />
                  ) : (
                    <UI.Image
                      source={require("@/assets/images/uncheck.png")}
                      style={styles.checkIcon}
                    />
                  )}
                </UI.TouchableOpacity>
                <UI.Text style={styles.checkboxLabel}>
                  Add to My Buddy List
                </UI.Text>
              </UI.Box>
            </UI.TouchableOpacity>
          </UI.ConnectedCbBox>
        ) : (
          <UI.ConnectedCbBox style={styles.container}>
            <UI.FlatList
              data={guestData}
              keyExtractor={(item) => `${item.id}_${Math.random()}`}
              horizontal
              renderItem={this.renderGuestSelector}
              showsHorizontalScrollIndicator={false}
            />
          </UI.ConnectedCbBox>
        )}
        
         {/* Disable search bar for new guest */}
        {this.state.selectedGuest !== "New Guest" && (
          <UI.ConnectedCbBox style={styles.subContainer}>
            <UI.TouchableOpacity style={styles.bellIcon}>
              <UI.Image
                source={require("@/assets/images/icons/Search3x.png")}
                style={styles.iconStyle}
              />
            </UI.TouchableOpacity>
            <UI.ConnectedCbInput
              id="Search"
              labelRequired={false}
              style={styles.commentsBox}
              multiline={true}
              formId={pageId}
              placeholder="Search by Member Last Name"
              placeholderTextColor="#565c5f"
            />
          </UI.ConnectedCbBox>
        )}

        {/* Disable Alfabet filter for new guest */}
        {
          this.state.selectedGuest !== "New Guest" &&
          <UI.Box style={styles.topBar}>
            <UI.TouchableOpacity style={styles.arrow} onPress={this.scrollLeft}>
              <Icon as={ChevronLeftIcon} size="xl" color="#1dc6ff" />
            </UI.TouchableOpacity>
            <UI.FlatList
              ref={this.flatListRef}
              data={this.membersMock}
              renderItem={this.renderAlfabet}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              extraData={this.state.activeTab}
            />
            <UI.TouchableOpacity style={styles.arrow} onPress={this.scrollRight}>
              <Icon as={ChevronRightIcon} size="xl" color="#1dc6ff" />
            </UI.TouchableOpacity>
          </UI.Box>
        }
      
        {this.showMemberList()}

        <UI.ConnectedCbBox style={styles.addMemberBtn}>
          <UI.TouchableOpacity
            style={styles.bottomBtns}
            onPress={
              this.state.selectedGuest === "New Guest"
                ? this.addNewGuest
                : this.addMemberForReservation
            }
          >
            <UI.Text style={styles.submitTxt}>Add</UI.Text>
          </UI.TouchableOpacity>

          <UI.TouchableOpacity
            style={styles.bottomBtns}
            onPress={this.navigateToReservation}
          >
            <UI.Text style={styles.submitTxt}>Cancel</UI.Text>
          </UI.TouchableOpacity>
        </UI.ConnectedCbBox>

        {this.props.loading && (
          <UI.Box style={styles.loaderTrans}>
            <CbLoader />
          </UI.Box>
        )}
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
      </UI.Box>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.memberDirectory.loading,
    memberList: state.memberDirectory.memberList,
    errorMessage: state.dashboard.errorMessage,
    memberListPerBatch: state.memberDirectory.memberListPerBatch,
    formData: state.login?.formData,
    addMemberList: state.addMember.membersList,
    selectedMembersList: state.addMember.selectedMembersList,
    singleItemDetails: state.addMember.singleMemberDetails,
    userType: state.addMember.userType,
  };
};
const mapDispatchToProps = {
  getMemberList,
  resetLoadedScreen,
  singleMemberDetails,
  addMembersForReservation,
  resetSingleMemberDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberDirectoryUI);
