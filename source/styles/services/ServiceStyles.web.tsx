import { isPlatformAndroid } from "@/components/constants/Matrices";
import { StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottomWidth: 3,
    borderColor: "#eee",
    marginHorizontal: 20,
  },
  tab: {
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  tabText: {
    color: "#000",
    fontSize: 20,
    fontFamily: "SourceSansPro_Regular",
  },
  activeTab: {
    top: 2,
    borderBottomWidth: 3,
    borderBottomColor: "#08c3f8",
  },
  activeTabText: {
    color: "#08c3f8",
    fontFamily: "SourceSansPro_SemiBold",
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    width: "25%",
    height: 200,
    margin: "1%",
    padding: 15,
    borderRadius: 5,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
    backgroundColor: "#fff",
    alignItems: "center", 
  },
  icon: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontFamily: "SourceSansPro_SemiBold",
    marginBottom: 5,
   textAlign: "left"
  },
  description: {
    fontSize: 12,
    color: "#555",
   textAlign: "left",
    fontFamily: "SourceSansPro_Regular",
  },
  TextContainer: {
   width :"100%",
   paddingVertical:20,
   alignItems:"flex-start",
   textAlign:"left"
  },
});
