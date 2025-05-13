import * as UI from "@/components/cobalt/importUI";
import { RootState } from "@/components/redux/store";
import { styles } from "@/source/styles/memberDirectory/memberDirectory.web";
import { Icon } from "@/components/ui/icon";
import { connect } from "react-redux";
import { CloseIcon } from "@/components/ui/icon";
import { Text, Modal, Image } from "react-native";
import {Checkbox,CheckboxIcon,CheckboxIndicator,CheckboxLabel} from "@/components/ui/checkbox";
import {CheckIcon,ChevronLeftIcon,ChevronRightIcon,ChevronsLeftIcon,ChevronsRightIcon} from "@/components/ui/icon";
import useMemberDirectoryLogic from "@/source/controller/memberDirectory/memberDirectory";
import { setOpenMembersModel } from "@/components/redux/reducers/addMemberReducer";

const pageId = "MemberDiretory";
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
        <UI.View>
          <Text style={styles.memberName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.memberId}>{item.id}</Text>
        </UI.View>
      </UI.TouchableOpacity>
    );
  };
  renderPagination = () => {
    const { startPage, visiblePageLimit, currentPage, membersPerPage } =
      this.state;
    const totalPages = this.getTotalPages();

    if (totalPages <= 1) return null;

    const visiblePages = Math.min(visiblePageLimit, totalPages - startPage + 1);
    const totalMembers = this.state.members.length;
    const start = (currentPage - 1) * membersPerPage + 1;
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
            style={{ width: 30, height: 30 }}
            onPress={this.handleFirstPage}
          >
            <Icon as={ChevronsLeftIcon} />
          </UI.TouchableOpacity>

          <UI.TouchableOpacity
            style={{ width: 30, height: 30 }}
            onPress={this.handleLeftPress}
          >
            <Icon as={ChevronLeftIcon} />
          </UI.TouchableOpacity>

          {pages}

          <UI.TouchableOpacity
            style={{ width: 30, height: 30 }}
            onPress={this.handleRightPress}
          >
            <Icon as={ChevronRightIcon} />
          </UI.TouchableOpacity>

          <UI.TouchableOpacity
            style={{ width: 30, height: 30 }}
            onPress={this.handleLastPage}
          >
            <Icon as={ChevronsRightIcon} />
          </UI.TouchableOpacity>
        </UI.View>

        <UI.View
          style={{ justifyContent: "center", alignItems: "flex-end", flex: 1 }}
        >
          <Text
            style={{ color: "#888", fontSize: 18 }}
          >{`Displaying ${start} to ${totalMembers}`}</Text>
        </UI.View>
      </UI.View>
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
        visible={this.props.OpenMemberModel}
        // onRequestClose={this.toggleMemberModel}
      >
        <UI.ConnectedCbView style={styles.modalBackground}   pageId={pageId}
              id="modalBackground" >
          <UI.ConnectedCbView style={styles.modalContainer}  pageId={pageId}
              id="modalContainer" >
            <UI.ConnectedCbView style={styles.modalHeader}  pageId={pageId}
              id="modalHeader">
              <UI.ConnectedCbText style={styles.modalTitle}  pageId={pageId}
              id="modalTitle">
                {this.props.ChangeToGuest === "Guest" ? "Add Guest" : "Add Member"}
              </UI.ConnectedCbText>
            </UI.ConnectedCbView>

            <UI.TouchableOpacity
              onPress={() => this.props.setOpenMembersModel()}
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
              <UI.ConnectedCbView style={{ padding: 30, flexDirection: "row" }}>
                <UI.ConnectedCbView style={styles.searchRow}  pageId={pageId}
              id="searchRow">
                  <UI.ConnectedCbInput
                    id="Search"
                    labelRequired={false}
                    style={styles.input}
                    // multiline={true}
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
                    // onPress={this.clear}
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

                {this.props.ChangeToGuest !== "Guest" && <UI.ConnectedCbView
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50%",
                  }}
                  pageId={pageId}
                  id="SubmitContainer">
                  <UI.ConnectedCbView
                    onMouseEnter={() => this.setState({ hover: "checkbox" })}
                    onMouseLeave={() => this.setState({ hover: null })}
                    style={{
                      borderWidth: 1,
                      borderColor: "#5773A2",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 20,
                      backgroundColor:
                        this.state.hover === "checkbox"
                          ? "#000"
                          : "transparent",
                    }}
                    pageId={pageId}
                    id="SubmitContainer">
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
                </UI.ConnectedCbView>}
              </UI.ConnectedCbView>

              <UI.FlatList
                contentContainerStyle={styles.memberList}
                data={this.getCurrentPageData()}
                renderItem={this.renderMemberItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={4}
                scrollEnabled={false}
              />

              {this.renderPagination()}
            </UI.ScrollView>
          </UI.ConnectedCbView>
        </UI.ConnectedCbView>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.dashboard.loading,
    OpenMemberModel: state?.addMember?.OpenMemberModel,
    ChangeToGuest: state?.addMember?.ChangeToGuest,
  };
};
const mapDispatchToProps = {
  setOpenMembersModel,
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberDirectoryUI);
