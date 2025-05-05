import { isPlatformAndroid } from '@/components/constants/Matrices';
import { Dimensions, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  checkBoxWrapper: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
 
  },
  checkBoxContainer: {
    borderWidth: 1,
    borderColor: "#5773A2",
    width: responsiveWidth(60),
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical:10,
    marginVertical: 15,
  },
  guestContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical:15,
  },
  checkboxLabel: {
    color: "#5773A2",
    fontSize: 18,
    fontFamily:"SourceSansPro_SemiBold",
  },
  activeTab: {
    borderBottomWidth: 4,
    borderBottomColor: '#08c3f8',
  },
  tabItem: {
    marginRight: 15,
    padding: 10,
  },
  arrow: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginHorizontal: 10,
    height: 26,
    width: 26,
  },
  arrowText: {
    fontSize: 18,
    color: '#333',
  },
  alpabetTxt:{
    color:"#08c3f8",
    fontSize: 20,
    fontFamily:"SourceSansPro_SemiBold",
  },
  activeTxt:{
    color:"#5A729A",
  },
  subContainer:{ width: '100%', alignItems: 'center',justifyContent:"center",marginTop:20 },
  checkBox:{ flexDirection: "row", },
  checkBoxIndicator:{borderWidth:1,width:20,height:20,borderColor:"#e0e0e0", marginRight:10},
  topBar:{ flexDirection: 'row',justifyContent:"space-between", alignItems: 'center', backgroundColor: '#eee', },
  commentsBox:{
    borderColor:"#cbcbcb", 
    borderRadius: 20,
    borderWidth:1, 
    width: responsiveWidth(94),
    backgroundColor: "#fff",
    color: "#000",
    paddingLeft:responsiveWidth(11),
    fontSize: 20,
    fontFamily:"SourceSansPro_Regular",
    height:responsiveHeight(5.5),
    paddingTop:8
  },
  bellIcon:{width: 25, height: 25,position:"absolute" ,left:responsiveWidth(8),top:isPlatformAndroid()?responsiveHeight(1.3):responsiveHeight(1.6),zIndex:1},
  iconStyle:{ width: 18, height: 18, resizeMode: "contain", tintColor: "#565c5f" },
  profileLogo:{ 
    width: 40, 
    height: 40, 
    borderRadius: 25, 
    justifyContent:"center",
    alignItems:"center",
    marginRight:20,
    backgroundColor:"#cbcbcb" 
  },
  profileIcon:{ width: 20, height: 20, resizeMode: "contain", tintColor: "#fff" },
  profileName:{
    fontSize: 22,
    fontFamily:"SourceSansPro_SemiBold",
    color:"#565c5f"
  },
  memberAddress:{
    fontSize: 18,
    fontFamily:"SourceSansPro_SemiBold",
    color:"#565c5f"
  },
  memberContainer:{ backgroundColor: "#fff", paddingHorizontal: 15 },
  profileBtn:{ flexDirection: "row", alignItems: "center", marginVertical: 25 },
  horizontalLine:{ width: "100%", height: 1.5, backgroundColor: "#e7e7e7" },
  submitBtn:{
    alignSelf:"center",
    width:140,
    height:40,
    borderRadius:60,
    justifyContent:"center",
    alignItems:"center",
    marginTop:40,
    marginBottom:80,
    borderColor:"#5773a2",
    borderWidth:1,
    marginHorizontal:10
  },
  submitTxt:{
    fontFamily:"SourceSansPro_SemiBold",
    fontSize:22,
    color:"#5773a2",
  },
  emptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: responsiveHeight(60),
  },
  emptyMealTxt: {
    fontFamily: "SourceSansPro_Regular",
    alignSelf: "center",
    marginTop: responsiveHeight(3),
    fontSize:18,
    color:"#565c5f"
  },
  loaderTrans:{ position: "absolute", alignSelf: "center", flex: 1, top: responsiveHeight(50),backgroundColor:"red" },
  addMemberBtn:{ flexDirection: "row", backgroundColor: "#e0e0e0", width: "100%", position: "absolute", bottom: responsiveHeight(0),height:responsiveHeight(10),justifyContent:"center",alignItems:"center" },
  bottomBtns:{
    alignSelf:"center",
    width:140,
    height:40,
    borderRadius:60,
    justifyContent:"center",
    alignItems:"center",
    marginTop:40,
    marginBottom:40,
    borderColor:"#5773a2",
    borderWidth:1,
    marginHorizontal:10,
    backgroundColor:"#fff"
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 16,
    height: 16,
    backgroundColor: 'green',
  },
  unchecked: {
    width: 16,
    height: 16,
  },
  checkItem:{flexDirection:"row",alignItems:"center"},
  checkIcon:{ width: 20, height: 20 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessageTxt:{
    color:"#0047AB",
    fontSize:16,
    fontFamily:"SourceSansPro_Regular"
  },
  errorMessageContainer: {
    position:"absolute",
    top:"50%",
    backgroundColor: '#eafaff',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    alignSelf:"center",
    borderWidth:1,
    borderColor:"#0047AB",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft:40
  },
  radioOuter: {
    height: 18,
    width: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#00AEEF",
    margin:4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  radioInner: {
    height: 8,
    width: 8,
    borderRadius: 6,
    backgroundColor: "#00AEEF",
  },

  label: {
    marginLeft: 6,
    fontSize: 18,
    color: "#000",
    fontFamily:"SourceSansPro_SemiBold"
  },
  providerTxt: {
    fontSize: 16,
    fontFamily: "SourceSansPro_SemiBold",
    color: "#666",
    paddingLeft: 10,
  },
  container:{
    marginVertical: 20,
    justifyContent: "flex-start",
  }
});