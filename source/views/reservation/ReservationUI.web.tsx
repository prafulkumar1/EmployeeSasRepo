import * as UI from "@/components/cobalt/importUI";
import { RootState } from "@/components/redux/store";
import { styles } from "@/source/styles/reservation/Reservation.web";
import { connect } from "react-redux";
import { Image, View, Text, TouchableOpacity, Modal } from "react-native";
import { Icon } from "@/components/ui/icon";
import { CloseIcon, AddIcon } from "@/components/ui/icon";
import BoxComponent from "./BoxComponent";
import CalendarComponent from "./CalendarComponent";
import useReservationLogic from "@/source/controller/reservation/Reservation";
import { setAdddropDownIndex } from "@/components/redux/reducers/reservationReducer";
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

const pageId = "Reservation";
class ReservationUI extends useReservationLogic {
  renderItem = ({ item, index }) => {
    const [day, month, year] = item.split("-");

    return (
      <UI.TouchableOpacity
        key={index}
        onPress={() => this.handleItemPress(item, index)}
      >
        <UI.View
          style={[
            styles.dateItem,
            {
              backgroundColor:
                this.state.selectedItem === item ? "#00C2FF" : "#fff",
            },
          ]}
        >
          <UI.Text style={styles.dateText}>{day}</UI.Text>
          <UI.Text style={styles.dateText}>{month}</UI.Text>
        </UI.View>
      </UI.TouchableOpacity>
    );
  };

  //Radio render
  renderGenderSelector = () => {
    const { selectedGender } = this.state;
    return (
      <UI.View style={styles.RadioContainer}>
        {["Male", "Female", "Any"].map((gender) => (
          <TouchableOpacity
            key={gender}
            style={styles.optionContainer}
            onPress={() => this.setState({ selectedGender: gender })}
          >
            <UI.View style={styles.radioOuter}>
              {selectedGender === gender && (
                <UI.View style={styles.radioInner} />
              )}
            </UI.View>
            <Text style={styles.label}>{gender}</Text>
          </TouchableOpacity>
        ))}
      </UI.View>
    );
  };

  //timerender
  renderSlot = (item: any, index: number) => {
    const isDisabled = item.disabled;
    const isSelectedTime = this.state.selectedTime === item.label;

    return (
      <UI.TouchableOpacity
        key={index}
        style={[styles.slotBox, isSelectedTime && styles.selectedSlot]}
        disabled={isDisabled}
        onPress={() => this.handleSelectTime(item.label, item.disabled)}
      >
        <Text
          style={[
            styles.slotText,
            isSelectedTime && styles.selectedText,
            isDisabled && styles.disabledText,
          ]}
        >
          {item.label}
        </Text>
      </UI.TouchableOpacity>
    );
  };

  //timeperiods
  renderTimePeriods = ({ item, index }) => {
    const isLastCard = index === this.timeData.length - 1;
    const shouldAlignLeft = this.timeData.length % 2 !== 0 && isLastCard;
    const isSelected = this.state.selectedTimePeriod === item.id;

    return (
      <UI.View
        style={[
          styles.timePeriodContainer,
          shouldAlignLeft && { alignItems: "center" },
        ]}
      >
        <UI.Text style={styles.timePeriodTxt}>{item.label}</UI.Text>
        <UI.TouchableOpacity
          style={[
            styles.timeSlotsBtn,
            { backgroundColor: isSelected ? "#00c6ff" : "#fff" },
          ]}
          onPress={() => this.handleSelectTimePeriod(item.id)}
        >
          <Text
            style={[
              styles.timePeriodBtnTxt,
              { color: isSelected ? "#fff" : "#000" },
            ]}
          >
            {item.time}
          </Text>
        </UI.TouchableOpacity>
      </UI.View>
    );
  };
  renderMemberInputRows = () => {
    const { popupVisibleIndex, popupPosition, selectedCount } = this.state;
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
            <UI.View style={[styles.popupContainer,]}>
              <UI.Pressable
                style={[
                  styles.popupButton,
                  {
                    backgroundColor:
                      this?.state?.hover === "member" ? "#000" : "#fff",
                  },
                ]}
                onPress={this.toggleMemberModel}
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
                onPress={this.toggleGuestModel}
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
              { fontSize: this.state.screenWidth <= 780 ? 12 : 18 },
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
          >{`Displaying ${start} to ${end}`}</Text>
        </UI.View>
      </UI.View>
    );
  };

  render() {
    this.dummydata;
    this.state.currentIndex;
    let pageConfigJson = global.appConfigJsonArray.find(
      (item) => item?.PageId === pageId
    );
    global.controlsConfigJson =
      pageConfigJson && pageConfigJson.Controlls
        ? pageConfigJson.Controlls
        : [];
    return (
      <UI.ScrollView style={[styles.mainContainer]}>
        {/* <UI.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.headerContainer}
        >
          {Object.entries(this.HeaderData).map(([key]) => (
            <UI.TouchableOpacity
              key={key}
              style={styles.headerButton}
              onPress={() => this.setState({ selectedKey: key })}
            >
              <UI.View style={styles.keyContent}>
                 <Image source={{ uri: image }} style={styles.keyImage} /> 
                <Text style={styles.headerText}>{key}</Text>
              </UI.View>
              <UI.View
                style={[
                  styles.underline,
                  this.state.selectedKey === key && styles.selectedUnderline,
                ]}
              />
            </UI.TouchableOpacity>
          ))}
        </UI.ScrollView> */}
        {/* <UI.FlatList
          data={this?.HeaderData[this?.state?.selectedKey]?.values}
          keyExtractor={(item, index) => item + index}
          // numColumns={2}
          horizontal={true}
          contentContainerStyle={styles.valuesContainer}
          renderItem={({ item }) => (
            <UI.View style={styles.box}>
              <Text style={styles.boxText}>{item}</Text>
            </UI.View>
          )}
        /> */}

        <UI.Box style={styles.container}>
          <BoxComponent
            title={this.state.selectedKey}
            onPressCalendar={this.toggleCalendar}
            date={this.state.selectedItem}
          />
          <UI.View style={styles.row}>
            <UI.TouchableOpacity
              onPress={this.handlePrevious}
              style={{ paddingHorizontal: 20 }}
              disabled={this.state.currentIndex === 0}
            >
              <Image
                source={require("@/assets/images/icons/Back-Right-arrow.png")}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </UI.TouchableOpacity>
            <UI.FlatList
              ref={this.flatListRef}
              horizontal
              data={this.state.dateRange}
              renderItem={this.renderItem}
              keyExtractor={(_, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
            <UI.TouchableOpacity
              onPress={this.handleNext}
              style={{ paddingHorizontal: 20 }}
              disabled={
                this.state.currentIndex === this.state.dateRange.length - 1
              }
            >
              <Image
                source={require("@/assets/images/icons/Back-Right-arrow.png")}
              />
            </UI.TouchableOpacity>
          </UI.View>
        </UI.Box>
        <UI.View style={[styles.selectorcontainer]}>
          <UI.ConnectedCbSelectDropDown
            options={this.servicesOptions}
            customstyle={styles.selectorcustomstyle}
            placeholder={"Select the service"}
          />

          {this.renderGenderSelector()}
          <UI.View style={{ marginVertical: 10 }}>
            <UI.Text style={styles.providerText}>
              Please select provider
            </UI.Text>
          </UI.View>
        </UI.View>
        <UI.View style={[styles.selectorcontainer, { zIndex: -1 }]}>
          <UI.ConnectedCbSelectDropDown
            options={this.providersdummyData}
            customstyle={styles.selectorcustomstyle}
            onSelect={(values: any) => console.log(values, "--->>>")} // Pass the handleSelect method to the dropdown
            placeholder={"Select the Provider"}
          />
        </UI.View>

        <UI.View style={[{ width: "100%", zIndex: -2 }]}>
          <UI.ConnectedCbFlatList
            flatlistData={this.timeData}
            children={this.renderTimePeriods}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "flex-start" }}
          />
        </UI.View>

        <UI.View style={styles.slotTimeContainer}>
          {this.getCurrentTimeSlots().map(this.renderSlot)}
        </UI.View>

        <UI.View style={styles.addMemberBtncontainer}>
          <UI.TouchableOpacity
            style={styles.addMemberBtn}
            onPress={this.toggleModal}
          >
            <UI.Text style={styles.addMemberBtnTxt}> Add Member</UI.Text>
          </UI.TouchableOpacity>
        </UI.View>

                <UI.ConnectedCbBox
                  id="addMemberContainer"
                  pageId={pageId}
                  style={styles.addMemberBtncontainer}
                >
        <UI.Text style={styles.addMemberBtnTxt}> Add Member</UI.Text>

                </UI.ConnectedCbBox>

        {this.state.showCalendar && (
          <CalendarComponent
            onDateChange={this.onDateChange}
            currentDate={this.state.currentDate}
            sixtyDaysLater={this.state.sixtyDaysLater}
          />
        )}
        {/*MODEL TO ADD THE MEMBER*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={this.toggleModal}
        >
          <UI.View style={styles.modalBackground}>
            <UI.View style={styles.modalContainer}>
              <UI.View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Add Member</Text>
                <TouchableOpacity
                  onPress={this.toggleModal}
                  style={styles.CloseModel}
                >
                  <Icon as={CloseIcon} size="sm" />
                </TouchableOpacity>
              </UI.View>
              <UI.ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
              >
                <UI.View style={styles.timerRow}>
                  <UI.View style={styles.timerWrapper}>
                    <UI.Text style={styles.timerText}>
                      {" "}
                      {this.formatTime(this.state.secondsLeft)}
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
                            this?.state?.hover === "Addmember"
                              ? "#000"
                              : "#fff",
                        },
                      ]}
                      onPress={this.toggleMemberModel}
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
                      onPress={this.toggleGuestModel}
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
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    paddingHorizontal :20
                  }}
                >
                  {this.renderMemberInputRows()}
                </UI.View>

                <UI.Box style={{ marginTop: 10, padding: 12 }}>
                  <UI.Box style={{ padding: 5 }}>
                    <UI.Text style={styles.commentTxt}>Comments</UI.Text>
                  </UI.Box>

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
        {/*Model for the  directory*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showMemberModal}
          onRequestClose={this.toggleMemberModel}
        >
          <UI.View style={styles.modalBackground}>
            <UI.View style={styles.modalContainer}>
              <UI.View style={styles.modalHeader}>
                <UI.Text style={styles.modalTitle}>Add Member</UI.Text>
              </UI.View>

              <UI.TouchableOpacity
                onPress={this.toggleMemberModel}
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
                <UI.View style={{ padding: 30, flexDirection: "row" }}>
                  <UI.View style={styles.searchRow}>
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
                  </UI.View>

                  <UI.View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50%",
                    }}
                  >
                    <UI.View
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
                    </UI.View>
                  </UI.View>
                </UI.View>

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
            </UI.View>
          </UI.View>
        </Modal>
        {/*Model for the  Guest*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showGuestModal}
          onRequestClose={this.toggleGuestModel}
        >
          <UI.View style={styles.modalBackground}>
            <UI.View style={styles.modalContainer}>
              <UI.View style={styles.modalHeader}>
                <UI.Text style={styles.modalTitle}>Add Guest</UI.Text>
              </UI.View>

              <UI.ScrollView>
                <UI.View style={{ padding: 30, flexDirection: "row" }}>
                  <UI.View style={styles.searchRow}>
                    <UI.ConnectedCbInput
                      id="Search"
                      labelRequired={false}
                      style={styles.input}
                      // multiline={true}
                      formId={pageId}
                      placeholder="Search Guest Name"
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
                  </UI.View>
                </UI.View>

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
            </UI.View>
          </UI.View>
        </Modal>

        {/*MODEL FOR THE TIME OUT*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showSecondModal}
          onRequestClose={this.toggleSecondModal}
        >
          <UI.View style={styles.modalBackground}>
            <UI.View
              style={[
                styles.modalContainer,
                {
                  height: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Image source={require("@/assets/images/icons/tennis.jpg")} />
              <Text style={[styles.txt2, { marginVertical: 10 }]}>
                our Time has expired, you are no longer holding this
                reservation. Please return to the reservation screen and try
                again.
              </Text>
              <UI.View style={styles.SubmitContainer}>
                <UI.Pressable
                  style={[
                    styles.SubmitBtn,
                    {
                      backgroundColor:
                        this.state.hover === "ok" ? "#000" : "transparent",
                    },
                  ]}
                  onPress={this.toggleSecondModal}
                  onMouseEnter={() => this.setState({ hover: "ok" })}
                  onMouseLeave={() => this.setState({ hover: null })}
                >
                  <Text
                    style={[
                      styles.submitTxt,
                      {
                        color: this.state.hover === "ok" ? "#fff" : " #5773A2,",
                      },
                    ]}
                  >
                    Ok
                  </Text>
                </UI.Pressable>
              </UI.View>
            </UI.View>
          </UI.View>
        </Modal>
        {/*MODEL FOR THE THANK  YOU */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showThankModal}
          onRequestClose={this.toggleThankModal}
        >
          <UI.View style={styles.modalBackground}>
            <UI.View
              style={[
                styles.modalContainer,
                {
                  height: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <UI.TouchableOpacity
                onPress={this.toggleThankModal}
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

              <Image source={require("@/assets/images/icons/tennis.jpg")} />
              <Text style={[styles.Thankyou, { marginVertical: 10 }]}>
                Thank you
              </Text>
              <Text style={[styles.txt2, { marginVertical: 10 }]}>
                Your couple massage service is Reservation has beeen confirmed
                for Tuesday, june 24, 2025
              </Text>
            </UI.View>
          </UI.View>
        </Modal>
      </UI.ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    dropDownIndex: state?.reservation?.dropDownIndex,
  };
};
const mapDispatchToProps = {
  setAdddropDownIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationUI);
