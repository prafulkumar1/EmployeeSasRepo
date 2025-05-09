import { isPlatformAndroid } from "@/components/constants/Matrices";
import { StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
  mainContainer: {
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
},
alpabetTxt: {
    fontSize: 18,
    color: "#08c3f8",
    fontWeight: "bold",
},
activeTxt: {
    color: "#08c3f8",
},
cardBox: {
    height: 180,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    width: responsiveWidth(45)
},
card: {
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
cardTextBox: {
    height: "30%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
},
cardTitle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#5e4c4c",
},
cardContainer: { backgroundColor :'red',justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: 20 },
topServiceContainer: { marginTop: 10, alignItems: "center" },
serviceTopBar:{ width: '100%', alignItems: 'center' }
});