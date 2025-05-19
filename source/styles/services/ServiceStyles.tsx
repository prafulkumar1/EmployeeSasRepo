import { isPlatformAndroid } from "@/components/constants/Matrices";
import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
  serviceMainContainer: {
    flex: 1,
    backgroundColor: "#fff",
},
tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 4,
    borderBottomColor: "#f9f9f9",
},
activeTab: {
    borderBottomColor: '#08c3f8',
    borderBottomWidth:4,
    paddingHorizontal:12
},
alpabetTxt: {
    fontSize: 18,
    color: "#08c3f8",
},
activeTxt: {
    color: "#08c3f8",
},
serviceCardBox: {
    height: 180,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    width: responsiveWidth(45)
},
serviceCardImg: {
    width: "100%",
    height: "70%",
    backgroundColor: "#5e4c4c",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
},
icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
},
photo: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
},
serviceCardTextBox: {
    height: "30%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
},
serviceName: {
    textAlign: "center",
    fontSize: 15,
    color: "#5e4c4c",
},
cardContainer: { justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: 20 },
topServiceContainer: { marginTop: 10, alignItems: "center" },
serviceTopBar:{ width: '100%', alignItems: 'center' },
serviceTabContainer: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomWidth: 3,
    borderColor: "#eee",
  },
  tabText: {
    color: "#000",
    fontSize: 20,
    fontFamily: "SourceSansPro_Regular",
  },

  tabHeaderBtn: {
    paddingVertical: 10,
    paddingHorizontal:12,
    marginLeft:40
  },
  activeTabText: {
    borderWidth:1,
    marginTop:100
  },
  serviceCards:{ justifyContent: "center" , paddingBottom: responsiveHeight(20)},
  serviceDesc:{
    color: "#5e4c4c",
    fontSize: 16,
    fontFamily: "SourceSansPro_SemiBoldItalic",
  }
});