import { isPlatformAndroid } from '@/components/constants/Matrices';
import { Dimensions, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
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
    padding: 12,
    borderRadius: 5,
    flexGrow: 1,
    minWidth: '30%',
  },
  searchButton: {
    borderWidth: 1,
    borderColor: "#0b2335",
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
    fontSize: 18,
    color: "#0b2335",
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
  checkboxclick: {
    borderWidth: 1,
    borderColor: "#5773A2",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  checkBoxContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  //Radio
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
    backgroundColor: "#000",
  },

  label: {
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  //new guest
  NewguestContainer: { width: "100%", alignItems: "center" },
  newGuestRow1: {
    flexDirection: 'row',
    justifyContent: "space-between",
    width: "70%",
    paddingVertical: 30,
    borderBottomWidth: 0.5,
    borderBlockColor: "#aaa",
    backgroundColor: '#fff',
    gap: 10
  },
  OptionalContainer: {
    width: '70%',
    zIndex: -1,

  },
  optinalTxt: {
    color: "#6D6D6D",
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
  },
  formContiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,

  },
  formTxt: {
    color: "#6D6D6D",
    fontSize: 16,
    paddingBottom: 10,
  },
  textstyles: {
    color: "#6D6D6D",
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,

  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,

  },
    GenderTxt: {
    color: "#6D6D6D",
    fontSize: 16,
    paddingTop: 10,
  },
  genderoptionsStyles: {
    width: "100%",
    color: "#6D6D6D",
   padding:10
  },
  //Addbutton
  addMemberBtncontainer: {
    alignItems: "center", justifyContent: "center", marginVertical: 25
  },
  addMemberBtn: {
    borderWidth: 1,
    borderColor: "#0b2335",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  addMemberBtnTxt: {
    color: "#0b2335",
    fontSize: 20,
    fontFamily: "SourceSansPro_SemiBold",
  },
  //calnder
  calendar: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 250,
    height: 240,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 99,
  },
  dobContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  dobInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  calendarIcon: {
    paddingLeft: 10,
  },
});