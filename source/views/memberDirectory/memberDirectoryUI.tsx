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

  render() {
    return (
      <UI.Box style={styles.mainContainer}>
        <UI.Box style={styles.subContainer}>
          {/* <UI.ConnectedCbInput
            labelRequired={false}
            placeholder="Search by Member Last Name"
            placeholderTextColor="#000"
            style={styles.inputs}
          /> */}
          <UI.TouchableOpacity style={styles.bellIcon}>
            <UI.Image source={require("@/assets/images/icons/Search3x.png")} style={styles.iconStyle} />
          </UI.TouchableOpacity>
          <UI.ConnectedCbInput labelRequired={false} style={styles.commentsBox} multiline={true} formId={pageId} placeholder="Search by Member Last Name" placeholderTextColor="#565c5f" />
        </UI.Box>

        <UI.Box style={styles.checkBoxWrapper}>
          <UI.Box style={styles.checkBoxContainer}>
            <Checkbox size="md" isInvalid={false} isDisabled={false} style={styles.checkBox} value={""}>
              <CheckboxIndicator style={styles.checkBoxIndicator}>
                <CheckboxIcon as={CheckIcon} color="#08c3f8" size="md" />
              </CheckboxIndicator>
              <CheckboxLabel style={styles.checkboxLabel}>Add to My Buddy List</CheckboxLabel>
            </Checkbox>
          </UI.Box>
        </UI.Box>

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
        <UI.FlatList
          data={this.props.memberList?.Members}
          renderItem={({item,index}) => {
            return (
              <UI.Box style={styles.memberContainer}>
                <UI.TouchableOpacity style={styles.profileBtn} onPress={this.navigateToReservation}>
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
          }}
        />

      </UI.Box>
    );
  }
}


const mapStateToProps = (state: RootState) => {
  return {
    loading: state.dashboard.loading,
    memberList: state.memberDirectory.memberList,
    errorMessage: state.dashboard.errorMessage
  }
}
const mapDispatchToProps = {
  getMemberList
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberDirectoryUI)