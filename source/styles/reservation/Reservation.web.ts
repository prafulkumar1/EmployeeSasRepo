import { Dimensions, StyleSheet } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
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
    marginTop: 10,
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
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
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
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 99,
  },
  calendarDate: {

    marginTop: 10,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
    justifyContent: "center", alignItems: "center"
  },
  selectorcustomstyle: {
    width: "40%",
    marginVertical: 10,
    position: 'relative',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    zIndex: 1,

  },
  providerText: {
    fontSize: 16, color: '#000', fontFamily: "SourceSansPro_Italic",
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
    alignContent: "center",

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
  SubmitContainer: {
    width: "100%", alignItems: "center"
  },
  //MODEL ONE END
  Thankyou: {
    color: "#5773A2",
    fontFamily: "SourceSansPro_SemiBold",
    fontSize: 24,
    textAlign: "center",
  },
  MemberTxt: {
    width: "70%", paddingHorizontal: 8
  },
});