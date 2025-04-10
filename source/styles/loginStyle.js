import * as UI from '@/components/cobalt/importUI';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = UI.StyleSheet.create({

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
      top: "16%"
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
      borderBottomWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      color: '#fff',
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
      fontWeight: 450,
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
      fontWeight: '450', width: '100%'
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
    tooltip: {
      position: 'absolute',
      top: -55,
      left: 0,
      backgroundColor: '#fff',
      padding: 5,
      height: 50,
      borderRadius: 5,
      width: '100%',
  },
  tooltipText: {
      color: '#000',
      fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
    width: '95%',
    height: '50%', 
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
},
modalTitle: {
    fontSize: height * 0.02, 
    fontWeight: 'bold',
    marginBottom: 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#B7B7B7',
},
inputLabel: {
  fontSize: 18,
  paddingBottom: 10,
},
modalInput: {
  width: '90%',
  height: 40,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
  marginBottom: 20,
},
modalButton: {
  backgroundColor: '#f9f9f9',
  paddingVertical: 5,
  paddingHorizontal: 30,
  borderRadius: 25,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#3A6D8C',
},
modalButtonText: {
  color: '#3A6D8C',
  fontSize: 16,
  textAlign: 'center',
},
lock_img: {
  width: 30,
  height: 40,
  marginBottom: 15,
},
cross: {
  position: 'absolute',
  top: 20,
  right: 20,
  width: 30,
  height: 30,
},
  });