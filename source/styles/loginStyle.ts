import { Dimensions,StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    scrollContent: {
      padding: 20,
      alignSelf: "center",
      flex: 1,
      justifyContent: "center",
      width: "100%"
    },
    club_logo: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      width: 210,
      position: 'absolute',
      top: "16%",
    },
    devDiv: {
      marginTop: height * 0.4,
      marginBottom: 20,
    },
    devText: {
      fontSize: height * 0.025,
      color: '#fff',
      fontWeight: '500',
    },
    inputs: {
      borderBottomWidth: 1,
      color: "#fff",
      height: 40,
      width: '100%',
      borderColor: '#fff',
      borderRadius: 5,
      marginBottom: 15,
      fontSize: 16,
      backgroundColor: 'transparent',
      paddingHorizontal: 5
    },
    iconborder: {
      position: 'absolute',
      right: 0,
      top: 10,
    },
    icon: {
      width: 25,
      height: 25,
      marginLeft: 10,
      resizeMode: "contain"
    },
    remText: {
      color: '#fff',
      marginLeft: 10,
      fontSize: 16,
    },
    forgot_passText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: "400",
    },
    forgot_passText_web: {
      color: '#fff',
      fontSize: 16,
      fontWeight: "400",
      textAlign:"right"
    },
    login: {
      backgroundColor: '#fff',
      paddingVertical: 5,
      marginTop: 30,
      borderRadius: 25,
      color: '#0D92F4',
      textAlign: 'center',
      marginHorizontal: "auto",
      width: '70%',
      marginBottom: 10,
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center"
    },
  
    login_text: {
      color: '#0D92F4', fontSize: 16,
      fontWeight: "400", width: '100%'
    },
    finger_print: {
      marginTop: 20,
      marginBottom: 10,
      width: 50,
      height: 50,
    },
    poweredPolicyText: {
      textAlign: 'center',
      color: 'white',
      fontSize: height * 0.018,
      margin: 5,
    },
    subContainer:{ flexDirection: "row", marginBottom: 20, },
    bottomContainer:{ flexDirection: "row", marginBottom: 20, },
    checkBox:{ flexDirection: "row", justifyContent: "space-between", width: "100%" },
    webLogo:{
        height: 60,
        width: 210,
        position: 'absolute',
        top: width * 0.05,
      },
    mainImageLogo:{ overflow:"hidden", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" },
    subWebContainer:{ width: "100%", justifyContent: "center", alignItems: "center" },
    topBox:{width:600,justifyContent:"center",alignItems:"center"},
    inputContainer:{ flexDirection: "row", marginBottom: 20, width: "100%" },
    pwdContainer:{ flexDirection: "row", marginBottom: 20, width: "100%" },
    checkBoxWeb:{ flexDirection: "row", width: "100%" },
    forgotPwdWeb:{ justifyContent: "flex-end", width: "76%", },
    rememberMe:{ width: 20, height: 20, borderWidth: 1, borderColor: "#fff", backgroundColor: "#fff" },
    labelCheckBox:{ color: '#fff', marginLeft: 10, fontSize: 16 }
  });