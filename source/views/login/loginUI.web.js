import * as UI from '@/components/cobalt/importUI';
import { useFormContext } from '@/components/cobalt/event';
import { Animated, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Modal, Alert, ActivityIndicator, Platform } from 'react-native';
import { Component } from 'react';
import useLoginLogic from '@/source/controller/login/login';
import { RootState } from '@/components/redux/store';
import { connect } from 'react-redux';
import { getFormFieldData, setFormFieldData } from '@/components/redux/reducers/loginReducer';

import { Dimensions } from 'react-native';
import { CheckboxIndicator } from '@/components/ui/checkbox';
const { width, height } = Dimensions.get('window');

const pageId = 'Login';
class loginUI extends useLoginLogic {
  constructor(props) {
    super(props)
  }
  screenWidth=width
  render() {
    const { setFormFieldData, getFormFieldData } = this.props
    let pageConfigJson = global.appConfigJsonArray.find(item => item.PageId === pageId);
    global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
    const departments = [
      { label: 'Dining', value: 'dining' },
      { label: 'Golf', value: 'golf' },
      { label: 'Tennis', value: 'tennis' },
      { label: 'Pool', value: 'pool' },
    ];
    const genderOptions = [
      { label: 'Male', value: 'male' },
      { label: 'FeMale', value: 'female' },
      { label: 'Others', value: 'others' },
      console.log(width,"AAAAAAAAAAAA")
    ]
    return (
      <ImageBackground id='loginBackground' source={require('@/assets/images/login.jpg')} style={{ overflow:"hidden", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
        {/* <UI.ScrollView contentContainerStyle={styles.scrollContent}> */}
        <Image source={require('../../../assets/images/Logo1.png')} style={styles.club_logo} resizeMode="cover" />
        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
          {/* <View style={styles.devDiv}>
            <UI.Text style={styles.devText}>This is a Dev App</UI.Text>
          </View> */}
         <View style={{width:600,justifyContent:"center",alignItems:"center"}}>
          <UI.cbForm formId={pageId} setFormFieldData={setFormFieldData}>
            {/* <UI.cbVStack id='VStack1'> */}
              {/* <View style={{ width: "100%",justifyContent:"center",alignItems:"center",}}> */}
              <View style={{ flexDirection: "row", marginBottom: 20, width: "100%" }}>
                <UI.Box style={{ width: "100%" }}>
                  <UI.cbInput labelRequired={false} id='username' formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} labelText="" style={styles.inputs} />
                </UI.Box>
                <UI.TouchableOpacity
                  // onPress={handleIconPress}
                  style={styles.iconborder}>
                  <Image
                    source={require('../../../assets/images/tooltip_icon.png')}
                    resizeMode="contain"
                    style={styles.icon}
                  />
                </UI.TouchableOpacity>
              </View>


              <View style={{ flexDirection: "row", marginBottom: 20, width: "100%" }}>
                <UI.Box style={{ width: "100%" }}>
                  <UI.cbInput labelRequired={false} id='password' formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} style={styles.inputs} />
                </UI.Box>
                <TouchableOpacity
                  // onPress={() => setIsPasswordVisible(!isPasswordVisible)} 
                  style={styles.iconborder}>
                  <Image
                    source={
                      // isPasswordVisible ?
                      require('../../../assets/images/Show_pass.png')
                      // : require('../../../assets/images/Hide_pass.png')
                    }
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>


              <View style={{ flexDirection: "row", width: "100%" }}>
                <UI.cbCheckBox
                  id="rememberme"
                  customStyles={{
                    CheckboxIndicator: { width: 20, height: 20, borderWidth: 1, borderColor: "#fff", backgroundColor: "#fff" },
                    checkboxLabel: { color: '#fff', marginLeft: 10, fontSize: 16 },
                  }}
                />

                <UI.TouchableOpacity
                  // onPress={openModal}
                  style={{ justifyContent: "flex-end", width: "50%", backgroundColor: "RED" }}
                >
                  <UI.Text style={styles.forgot_passText}>Forgot Password?</UI.Text>
                </UI.TouchableOpacity>
              </View>
              <UI.cbButton id='login' variant='solid' buttonText='Login' onPress={() => this.handleValidation()} customStyles={{ buttonStyle: styles.login, }} />
              {/* </View> */}
            {/* </UI.cbVStack> */}
          </UI.cbForm>
          </View>
          {/* <UI.TouchableOpacity>
          <Image source={require('../../../assets/images/finger_print.png')} style={styles.finger_print} />
        </UI.TouchableOpacity> */}

          <View >
            <UI.Text style={styles.poweredPolicyText}>Powered by Cobalt Software™</UI.Text>
            <UI.Text style={styles.poweredPolicyText}>Privacy Policy | Terms of Use</UI.Text>
          </View>
        </View>

        {/* </UI.ScrollView> */}
      </ImageBackground>

    );
  }
}

const mapStateToProps = (state) => {
  // console.log(JSON.stringify(state.login.formData),"--->syayeyeyey")
  return {}
}
const mapDispatchToProps = {
  setFormFieldData,
  getFormFieldData
}

export default connect(mapStateToProps, mapDispatchToProps)(loginUI)

const styles = UI.StyleSheet.create({

  scrollContent: {
    padding: 20,
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%"
  },
  club_logo: {
    justifyContent: 'center', alignItems: 'center',
    // height: height * 0.07, 
    // width: width * 0.5,    
    height: 60,
    width: 210,
    position: 'absolute',
    top: width * 0.05,
    // top: "16%"
  },
  devDiv: {
    // marginTop: height * 0.4,
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
    // borderRadius: 5,
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
    textAlign: "right",
  },
  login: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    marginTop: 30,
    borderRadius: 25,
    color: '#0D92F4',
    textAlign: 'center',
    marginHorizontal: "auto",
    width: '30%',
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
    fontSize: height * 0.018,  // Adjust font size based on screen height
    margin: 5,
  },
});