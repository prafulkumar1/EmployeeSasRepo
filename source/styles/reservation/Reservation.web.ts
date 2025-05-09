import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 35,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginTop :10,
  },
  scrollBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    marginBottom: 10,
  },
  title: {
    fontFamily: "SourceSansPro_SemiBold",
    fontSize: 16,
    marginBottom: 8,
  },
  mainRow: {
    alignItems: 'center',
    gap: 12,
  },
  scrollRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dateBox: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBoxSelected: {
    backgroundColor: '#00bfff',
  },
  dayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  textSelected: {
    color: '#fff',
  },
  calendarBox: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#fff",
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginLeft: 8,
    maxWidth: '15%',
    borderRadius: 3,
    marginRight: 40,
  },
  calendarIcon: {
    width: 20, height: 20, borderWidth: 1, paddingHorizontal: 8
  },
  calendarText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#000',
    fontFamily: "SourceSansPro_SemiBold",
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateItem: {
    height: 60,
    width: 100,
    maxHeight: 100,
    marginHorizontal: 4,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  dateText1: {
    fontSize: 14,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedItem: {
    backgroundColor: '#00C2FF',
  },
  calendar: {
    position: "absolute",
    top: 60,
    right: 10,
    width: 250,
    height: 240,
    backgroundColor: "#fff",
    // borderRadius: 10,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 99,
  },
  RadioContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 20,
    zIndex: -1,
  },
  optionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 40,
  },
  radioOuter: {
    height: 26,
    width: 26,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#00AEEF",
  },

  label: {
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  //selector
  selectorcontainer: {
    justifyContent: "center", alignItems: "center"  },
  selectorcustomstyle: {
    width: "40%",
    marginVertical: 10,
    position: 'relative',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    zIndex: 1
  },
  providerText: {
    fontSize: 16, color: '#000', fontFamily: "SourceSansPro_Italic",
  },
  //time
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  slot: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    margin: 5,
    elevation: 2,
  },
  selectedSlot: {
    backgroundColor: "#00c6ff",
  },

  slotText: {
    fontSize: 16,
    color: "#000",
  },
  disabledText: {
    color: "#aaa",
  },
  addMemberBtncontainer: {
    alignItems: "center", marginVertical: 25
  },
  addMemberBtn: {
    borderWidth: 1,
    borderColor: "#00c6ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
  },
  addMemberBtnTxt: {
    color: "#00c6ff",
    fontSize: 20,
    fontFamily: "SourceSansPro_SemiBold",
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  timePeriodContainer: {
    flex: 1,
    paddingBottom: 20,
    paddingRight: 12,
    alignItems: "center",
    flexWrap: 'wrap',
    justifyContent: 'center',
  alignContent:"center",

  },
  timePeriodTxt: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 5,
  },
  timeSlotsBtn: {
    borderWidth: 0.2,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 3,
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginVertical: 10,
  },
  timePeriodBtnTxt: {
    fontSize: 15.5,
    textAlign: "center",
  },
  slotBox: {
    flexDirection: 'row',
    width: "10%",
    margin: 3,
    paddingVertical: 8,
    borderColor: "#fff",
    padding: 10,
    borderRadius: 3,
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  slotTimeContainer: { width: '87%', flexDirection: "row", justifyContent: 'center', alignSelf: 'center', flexWrap: 'wrap', zIndex: -2 },
  //model
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '70%',
    height: '98%',
    backgroundColor: '#fff',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
    paddingBottom: 20,

  },
  scrollViewContent: {
    paddingBottom: 20,
    width: "100%"
  },
  modalTitleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f4f6f8',
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
  },
  CloseModel: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",

  },
  timerRow: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  timerWrapper: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#5773A2',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  timerText: {
    color: '#5773A2',
    fontSize: 20,
    fontWeight: 'bold',
  },
  playerListRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  circleItem: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 30,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  circleText: {
    fontSize: 16,
  },
  addMultipleBtn: {
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#08c3f8',
  },
  addMultipleBtnText: {
    color: '#08c3f8',
    fontWeight: '600',
  },
  memberSection: {
    width: '100%',
    // alignItems: 'center',
    marginTop: 10,

  },
  Pluscontainer: {
    flexDirection: 'row',     
    justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical:10,   
  },
  sectionNote: {
    color: '#000',
    fontFamily: 'SourceSansPro_SemiBold',
    textAlign: 'center',
  },
  plusCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#08c3f8',
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  plusText: {
    color: '#08c3f8',
    fontSize: 18,
    justifyContent :'center',
    alignItems :'center',
    fontWeight: 'bold',
    // marginBottom :5

  },
  memberFieldWrapper: {
    width: '48%',
  // paddingHorizontal: 8,
  paddingVertical: 5,
  alignItems: 'center',
  },
  memberLabel: {
    color: '#000',
    fontFamily: 'SourceSansPro_SemiBold',
    textAlign: 'left',
    width: "60%",

  },
  memberInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    height: 40,
    paddingHorizontal :5,
  },
  iconcontainer: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeBtn: {
    marginTop: 30,
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  comments: {
    width: '100%',
    maxHeight: 100,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  commentsBox: { height: 110, borderColor: "#cbcbcb", borderRadius: 5, padding: 10, borderWidth: 1, zIndex : -1 },
  commentTxt: { fontFamily: "SourceSansPro_SemiBoldItalic", fontSize: 20, color: "#515659", paddingBottom: 12 },
  SubmitContainer:{
     width: "100%", alignItems: "center" 
  },
  SubmitBtn: {
    borderWidth: 2,
    borderColor: "#5773A2",
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 20,
  },
  submitTxt: {
    fontSize: 18,
    fontFamily: "SourceSansPro_SemiBold",
    color: "#5773A2",
  },
  txt1: {
    color: "#08c3f8",
    fontSize: 18,
    fontFamily: "SourceSansPro_SemiBold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  txt2: {
    color: "#666",
    fontFamily: "SourceSansPro_SemiBold",
    fontSize: 18,
    textAlign: "center",
  },
  //MODEL ONE END
  Thankyou: {
    color: "#5773A2",
    fontFamily: "SourceSansPro_SemiBold",
    fontSize: 24,
    textAlign: "center",
  },
  MemberTxt:{
    width: "70%" , paddingHorizontal :8
  },
  //popup
  popupContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    // borderWidth: .5,
    // borderRadius: 8,
    elevation: 3,
    padding: 5,
    width: 100,
    marginHorizontal :30,
    right :-50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  MutiplepopupContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 3,
    padding: 5,
    width: 100,
    marginHorizontal :30,
    top:0,
    right :80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  popupButton: {
    paddingVertical: 5,
  },
  popupButtonText: {
    fontFamily:'SourceSansPro_SemiBold',
    fontSize :16,
    color: '#08c3f8',
    textAlign: 'center',
  },
  modalHeader: {
    alignItems: "center",
    paddingVertical: 20,
  },
  closeIcon: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 10,
    top: 10,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    width: "50%",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    flexGrow: 1,
    minWidth: '35%',
  },
  searchButton: {
    borderWidth: 1,
    borderColor: "#5773A2",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 5,
  },
  clearButton: {
    borderWidth: 1,
    borderColor: "#5773A2",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 5,
  },
  searchClearButtonText: {
    fontSize:18,
    color: "#5773A2",
    fontWeight: '600',
  },
  checkboxButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#5773A2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  checkboxTick: {
    width: 12,
    height: 12,
    backgroundColor: "#5773A2",
  },
  checkboxLabel: {
    color: "#5773A2",
    fontWeight: '600',
  },
  memberList: {
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  memberItem: {
    width: "23%",
    alignItems: 'center',
    margin: '1%',
    marginBottom: 15,
    flexDirection: "row"
  },
  memberIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#ccc",
    marginBottom: 5,
  },
  stretch: { width: 40, height: 40, margin: 8 },
  memberName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: "center",
    color: "#888"
  },
  memberId: {
    fontSize: 12,
    color: "#888",
  },
  addButton: {
    borderWidth: 1,
    borderColor: "#5773A2",
    paddingHorizontal: 30,
    paddingVertical: 6,
    borderRadius: 20,
  },
  addButtonText: {
    // color: "#5773A2",
    fontWeight: '600',
    fontSize: 16,
  },
  
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 40,
    flexWrap: 'wrap'
  },
  pageButton: {
    margin: 5,
  },
  activePageButton: {
    backgroundColor: '#007bff',
  },
  pageText: {
    color: '#333',
  },
  activePageText: {
    color: '#5773A2',
  },

  //HEADER

  headerContainer: {
    height: 50,
    marginBottom: 15,
  },
  headerButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  keyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  keyImage: {
    width: 24,
    height: 24,
    marginRight: 6,
    borderRadius: 12,
  },
  headerText: {
    fontSize: 22,
    fontWeight:'bold'
  },
  underline: {
    height: 2,
    width: '100%',
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  selectedUnderline: {
    backgroundColor: '#00AEEF', // Light blue underline
  },
  valuesContainer: {
    gap: 10,
  },
  box: {
    backgroundColor: '#f2f2f2',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width:300

  },
  boxText: {
    fontSize: 16,
  },
});