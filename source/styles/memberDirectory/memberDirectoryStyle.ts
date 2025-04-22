import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop:70
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
    width: "50%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical:10,
    marginVertical: 15,
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
  subContainer:{ width: '100%', alignItems: 'center', backgroundColor: "#f5f5f5",paddingBottom:15 },
  checkBox:{ flexDirection: "row", },
  checkBoxIndicator:{borderWidth:1,width:20,height:20,borderColor:"#e0e0e0", marginRight:10},
  topBar:{ flexDirection: 'row',justifyContent:"space-between", alignItems: 'center', backgroundColor: '#eee', },
  commentsBox:{
    height: 45,
    borderColor:"#cbcbcb", 
    borderRadius: 20,
    paddingTop:10,
    borderWidth:1, 
    width: 400,
    backgroundColor: "#fff",
    color: "#000",
    paddingLeft:42,
    fontSize: 20,
    fontFamily:"SourceSansPro_Regular",
  },
  bellIcon:{width: 25, height: 25,position:"absolute" ,left:40,top:12,zIndex:1},
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
  horizontalLine:{ width: "100%", height: 1.5, backgroundColor: "#e7e7e7" }
});