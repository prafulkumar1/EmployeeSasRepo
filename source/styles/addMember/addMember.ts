import { Dimensions,StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor:"#fff",
    },
    subContainer:{paddingHorizontal:10,paddingVertical:10,position:"absolute",bottom:0,flexDirection:"row",justifyContent:"space-between",width:"100%"},
    profileLabel:{
      fontFamily:"SourceSansPro_Bold",
      fontSize:18,
      color:"#fff"
    },
    profileTxt:{
      fontFamily:"SourceSansPro_Regular",
      fontSize:14,
      color:"#fff"
    },
    dateTxt:{
      fontFamily:"SourceSansPro_SemiBold",
      fontSize:14,
      color:"#fff"
    },
    labelTxt:{
      fontFamily:"SourceSansPro_SemiBold",
      fontSize:14,
      color:"#fff"
    },
    statusBar:{ backgroundColor: "#0047AB", width: "100%", height: 30 },
    backLogo:{ height: 280, width: "100%",position: "relative",},
    bellIcon:{width: 25, height: 25 },
    profileImgBtn:{ position:"absolute",bottom:75,marginLeft:10,width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: "#fff", marginVertical: 15 },
    profileImg:{ width: "100%", height: "100%", borderRadius: 35 },
    viewNewsBtn:{
      borderWidth:1,
      borderRadius:20,
      width:140,
      height:40,
      borderColor:"#0047AB",
      justifyContent:"center",
      alignItems:"center",
    },
    viewNewsTxt:{
      fontFamily:"SourceSansPro_Regular",
      fontSize:20,
      color:"#000"
    },
    newsTxt:{
      fontFamily:"SourceSansPro_Bold",
      fontSize:20,
      color:"#2A4E7D"
    },
    dashboardLabels:{
      fontFamily:"SourceSansPro_Bold",
      fontSize:22,
      color:"#fff",
      textAlign:"center"
    },
    middleContainer:{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 40, paddingRight:15,paddingLeft:5},
    calenderIcon:{ width: 30, height: 30 },
    cardImage:{ width: 148.5, height: 150, justifyContent: "center", alignItems: "center",borderWidth:1,borderColor:"#fff" },
    blackScreen:{ width: "100%", height: "100%", position: "absolute", opacity: 0.3, backgroundColor: "#000" },
    linkBtn:{width:"100%",backgroundColor:"#7BD9F6",padding:8,justifyContent:"center",alignItems:"center",marginVertical:15},
    linkBtnTxt:{
      fontFamily:"SourceSansPro_Regular",
      fontSize:18,
      color:"#fff",
    },
    icons:{ width: 40, height: 40 },
    backIon:{ width: 25, height: 25 },
    memberActionIcons:{ width: 28, height: 28 },
    addIcon:{ width: 28, height: 28},
    commentsBox:{height: 110,borderColor:"#cbcbcb", borderRadius: 5,paddingTop:10,borderWidth:1},
    submitBtn:{
      alignSelf:"center",
      width:160,
      height:40,
      borderRadius:60,
      justifyContent:"center",
      alignItems:"center",
      marginTop:40,
      backgroundColor:"#5773a2"
    },
    submitTxt:{
      fontFamily:"SourceSansPro_SemiBold",
      fontSize:20,
      color:"#fff",
    },
    memberContainer:{ padding: 10 },
    timeContainer:{ borderRadius: 5, borderWidth: 1.5, justifyContent: "center", alignSelf: "center", alignItems: "center", paddingVertical: 5, width: 150, marginVertical: 25, borderColor: "#2a4e7d" },
    timeTxt:{ fontFamily: "SourceSansPro_Bold", fontSize: 26, color: "#2a4e7d" },
    addMemberContainer:{ alignSelf: "center", justifyContent: "center", alignItems: "center" },
    addMemberTxt:{ fontFamily: "SourceSansPro_Regular", fontSize: 18, color: "#565c5f" },
    memberCountBtn:{ marginHorizontal:5,borderWidth: 1, width: 50, height: 50, borderRadius: 25, padding: 6, justifyContent: "center", alignItems: "center", borderColor: "#2a4e7d", marginTop: 10 },
    memberCountTxt:{ fontFamily: "SourceSansPro_Regular", fontSize: 26 },
    addMessageTxt:{ fontFamily: "SourceSansPro_Italic", fontSize: 14, marginTop: 20, marginBottom: 20, color: "#565c5f" },
    labelMember:{ fontFamily: "SourceSansPro_SemiBold", fontSize: 20, color: "#000" },
    addedMemberList:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderWidth:1,paddingVertical:15,borderRadius:8,paddingLeft:25,paddingRight:20,marginTop:20,borderColor:"#cbcbcb",backgroundColor:"#fff"},
    memberName:{fontSize:20,fontFamily:"SourceSansPro_Regular"},
    addOrRemoveBtn:{flexDirection:"row",alignItems:"center",width:70,justifyContent:"space-between"},
    commentTxt:{ fontFamily: "SourceSansPro_SemiBoldItalic", fontSize: 20, color: "#515659",marginBottom:12 },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '100%',
      position:"absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      height:240
    },
    modalBtn:{backgroundColor: '#f2f2f2', width: "100%", marginBottom: 10 ,paddingVertical:5},
    modalBtnTxt:{textAlign: 'center', paddingVertical: 10, fontSize: 18, color: '#666', fontFamily: "SourceSansPro_SemiBold" },
    headerContainer:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:30,marginHorizontal:15},
    iconStyle:{ width: 20, height: 20, resizeMode: "contain", tintColor: "#fff" },
    overLay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      zIndex: 1,
    },
    timeOutModal: {
      width: '95%',
      position:"absolute",
      top:"40%",
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 30,
      alignItems: 'center',
      margin:10
    },
    timeOutTxt:{
      fontFamily:"SourceSansPro_SemiBold",
      fontSize:18,
      color:"#000",
      textAlign:"center"
    },
    timeOutBtn:{
      alignSelf:"center",
      width:"80%",
      height:40,
      borderRadius:60,
      justifyContent:"center",
      alignItems:"center",
      marginTop:40,
      backgroundColor:"#5773a2"
    },
    okTxt:{
      fontFamily:"SourceSansPro_SemiBold",
      fontSize:18,
      color:"#fff",
      textAlign:"center"
    },
    timeOutIcon:{width:50,height:50,resizeMode:"contain",marginBottom:20}
  });