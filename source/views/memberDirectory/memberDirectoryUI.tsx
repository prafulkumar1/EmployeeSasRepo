import React from "react";
import * as UI from '@/components/cobalt/importUI';
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox";
import { CheckIcon ,ChevronLeftIcon,ChevronRightIcon} from "@/components/ui/icon";
import useMemberDirectoryLogic from "@/source/controller/memberDirectory/memberDirectory";
import { connect } from "react-redux";
import { RootState } from "@/components/redux/store";
import { styles } from "@/source/styles/memberDirectory/memberDirectoryStyle";
import { Icon  } from '@/components/ui/icon';
import { getMemberList } from "@/components/redux/reducers/memberDirectoryReducer";
import CbLoader from "@/components/cobalt/cobaltLoader";
import { addMembersForReservation, resetLoadedScreen, resetSingleMemberDetails, singleMemberDetails } from "@/components/redux/reducers/addMemberReducer";
import { Modal } from "react-native";
import { guestData } from "@/components/constants/CustomJson";
import { StatusBar } from "expo-status-bar";


const pageId = 'MemberDirectory';
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
        <UI.Text style={[styles.alpabetTxt, activeTab === index && styles.activeTxt]}>{item.id}</UI.Text>
      </UI.TouchableOpacity>
    );
  };
  renderMemberList = ({item,index}) => {
    return (
      <UI.Box style={[styles.memberContainer,{backgroundColor:item?.isMemberSelected?"#e0e0e0":"#fff"}]}>
        <UI.TouchableOpacity style={styles.profileBtn} onPress={() => this.selectedMember(item)}>
          <UI.Box style={styles.profileLogo}>
            <UI.Image source={require("@/assets/images/profile.png")} style={styles.profileIcon}/>
          </UI.Box>
          <UI.Box>
            <UI.Text style={styles.profileName}>{item.MemberName}</UI.Text>
            <UI.Text style={styles.memberAddress}>{item.MemberID}</UI.Text>
          </UI.Box>
        </UI.TouchableOpacity>
        <UI.Box style={styles.horizontalLine} />
      </UI.Box>
    )
  }
  renderLoadMoreBtn = () => {
    const currentValue = this.membersMock[this.state.activeTab]
    if(this.props.memberListPerBatch.length !== 0 && currentValue.id === "All"){
      return(
        <UI.TouchableOpacity style={styles.submitBtn} onPress={this.loadMoreData}>
        <UI.Text style={styles.submitTxt}>Show More</UI.Text>
      </UI.TouchableOpacity>
      )
    }
  }

  renderGuestSelector = ({item,index}) => {
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

  render() {
    const ITEM_HEIGHT = 100
    return (
      <UI.Box style={styles.mainContainer}>
        <UI.ConnectedCbHeader headerTitle={"Members Directory"} />
        <StatusBar hidden={true} />
        <UI.Box style={styles.subContainer}>
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
        </UI.Box>

        {this.props.userType === "Member" ? (
          <UI.Box style={styles.checkBoxWrapper}>
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
          </UI.Box>
        ) : (
          <UI.Box style={styles.container}>
            <UI.FlatList
              data={guestData}
              keyExtractor={(item) => `${item.id}_${Math.random()}`}
              horizontal
              renderItem={this.renderGuestSelector}
              showsHorizontalScrollIndicator={false}
            />
          </UI.Box>
        )}

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
        {this.state.updatedMembersListData?.length > 0 ? (
          <UI.FlatList
            data={this.state?.updatedMembersListData}
            ListFooterComponent={this.renderLoadMoreBtn}
            style={{ opacity: this.props.loading ? 0.5 : 1 }}
            renderItem={this.renderMemberList}
            removeClippedSubviews={true}
            updateCellsBatchingPeriod={100}
            windowSize={21}
            getItemLayout={(_, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
          />
        ) : (
          <UI.Box style={styles.emptyListContainer}>
            <UI.Text style={styles.emptyMealTxt}>No Record Found</UI.Text>
          </UI.Box>
        )}

        <UI.Box style={styles.addMemberBtn}>
          <UI.TouchableOpacity
            style={styles.bottomBtns}
            onPress={this.addMemberForReservation}
          >
            <UI.Text style={styles.submitTxt}>Add</UI.Text>
          </UI.TouchableOpacity>

          <UI.TouchableOpacity
            style={styles.bottomBtns}
            onPress={this.navigateToReservation}
          >
            <UI.Text style={styles.submitTxt}>Cancel</UI.Text>
          </UI.TouchableOpacity>
        </UI.Box>

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
    memberListPerBatch:state.memberDirectory.memberListPerBatch,
    formData: state.login?.formData,
    addMemberList:state.addMember.membersList,
    selectedMembersList:state.addMember.selectedMembersList,
    singleItemDetails:state.addMember.singleMemberDetails,
    userType:state.addMember.userType
  }
}
const mapDispatchToProps = {
  getMemberList,
  resetLoadedScreen,
  singleMemberDetails,
  addMembersForReservation,
  resetSingleMemberDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberDirectoryUI)