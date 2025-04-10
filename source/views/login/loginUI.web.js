import * as UI from '@/components/cobalt/importUI';
import { useFormContext } from '@/components/cobalt/event';
import { Animated, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Modal, Alert, ActivityIndicator, Platform } from 'react-native';
import { Component } from 'react';
import useLoginLogic from '@/source/controller/login/login';
import { RootState } from '@/components/redux/store';
import { connect } from 'react-redux';
import { getFormFieldData, setFormFieldData, showPassword,showToolTip,forgetPassModal } from '@/components/redux/reducers/loginReducer';

import { Dimensions } from 'react-native';
import { CheckboxIndicator } from '@/components/ui/checkbox';
const { width, height } = Dimensions.get('window');

const pageId = 'Login';
class loginUI extends useLoginLogic {
  constructor(props) {
    super(props)
    const { width, height } = Dimensions.get('window');
    this.state = {
      screenWidth: width,
    };
  }
  componentDidMount() {
    this.dimensionListener = Dimensions.addEventListener('change', this.handleResize);
  }

  componentWillUnmount() {
    if (this.dimensionListener) {
      this.dimensionListener.remove();
    }
  }
  handleResize = ({ window }) => {
    this.setState({ screenWidth: window.width });
  };
  // screenWidth=width
  render() {
    const { screenWidth } = this.state;
    const containerWidth = screenWidth < 600 ? 300 : 600;
    const { setFormFieldData, getFormFieldData,showPassword,showToolTip,forgetPassModal } = this.props
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
      <ImageBackground id='loginBackground' source={require('@/assets/images/login.jpg')} style={{ overflow:"hidden", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" ,paddingTop:"10%"}}>
        {/* <UI.ScrollView contentContainerStyle={styles.scrollContent}> */}
        <Image source={require('../../../assets/images/Logo1.png')} style={styles.club_logo} resizeMode="cover" />
        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
          {/* <View style={styles.devDiv}>
            <UI.Text style={styles.devText}>This is a Dev App</UI.Text>
          </View> */}
         <View style={{width:containerWidth,justifyContent:"center",alignItems:"center"}}>
         <UI.ConnectedCbForm formId={pageId} setFormFieldData={setFormFieldData}>
            {/* <UI.cbVStack id='VStack1'> */}

              <View style={{ flexDirection: "row", marginBottom: 20, width: "100%" }}>
                <UI.Box style={{ width: "100%" }}>
                <UI.ConnectedCbInput labelRequired={false} id='username' formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} labelText="" style={styles.inputs} />
                {this.props?.formData?.[pageId + '_username']?.isInvalid && (
                  <Text style={{ color: 'red', fontSize: 12, marginTop: 2 }}>
                    {this.props?.formData?.[pageId + '_username']?.errorMessage}
                  </Text>
                )}
                </UI.Box>
                <UI.TouchableOpacity
                  onPress={showToolTip}
                  style={styles.iconborder}>
                  <Image
                    source={require('../../../assets/images/tooltip_icon.png')}
                    resizeMode="contain"
                    style={styles.icon}
                  />
                </UI.TouchableOpacity>
                {this.props.isTooltipVisible && (
                            <View style={styles.tooltip}>
                                <Text style={styles.tooltipText}>If using Member ID, use it in the format: 0####-##</Text>
                            </View>
                        )}
              </View>


              <View style={{ flexDirection: "row", marginBottom: 20, width: "100%" }}>
                <UI.Box style={{ width: "100%" }}>
                <UI.ConnectedCbInput labelRequired={false} id='password' isPasswordVisible={this.props.isPasswordVisible} formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} style={styles.inputs} />
                {this.props?.formData?.[pageId + '_password']?.isInvalid && (
                  <Text style={{ color: 'red', fontSize: 12, marginTop: 2 }}>
                    {this.props?.formData?.[pageId + '_password']?.errorMessage}
                  </Text>
                )}
                </UI.Box>
                <TouchableOpacity
                  onPress={showPassword} 
                  style={styles.iconborder}>
                  <Image
                    source={
                      this.props.isPasswordVisible ?
                      require('../../../assets/images/pwd_visible.png')
                      : require('../../../assets/images/pwd_hide.png')
                    }
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>


              <View style={{ flexDirection: "row", width: "100%" }}>
              <UI.ConnectedCbCheckBox id='rememberme' customStyles={{CheckboxIndicator: { width:20,height:20,borderWidth:1,borderColor:"#fff",backgroundColor:"#fff"}, checkboxLabel: { color: '#fff', marginLeft: 10, fontSize: 16, } }} />
                {/* <UI.cbCheckBox
                  id="rememberme"
                  customStyles={{
                    CheckboxIndicator: { width: 20, height: 20, borderWidth: 1, borderColor: "#fff", backgroundColor: "#fff" },
                    checkboxLabel: { color: '#fff', marginLeft: 10, fontSize: 16 },
                  }}
                /> */}

                <UI.TouchableOpacity
                  onPress={forgetPassModal}
                  style={{ justifyContent: "flex-end", width: "50%", }}
                >
                  <UI.Text style={styles.forgot_passText}>Forgot Password?</UI.Text>
                </UI.TouchableOpacity>
              </View>
              <UI.ConnectedCbButton id='login' variant='solid' buttonText='Login' onPress={() => this.handleValidation()} customStyles={{ buttonStyle: styles.login, }} />
            {/* </UI.cbVStack> */}
            </UI.ConnectedCbForm>
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


        <Modal
                transparent={true}
                visible={this.props.isModalVisible}
          onRequestClose={this.props.forgetPassModal}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                {
                  height: screenWidth < 1640 ? '70%' : '50%',
                  width: screenWidth < 780 ? '90%' : "50%",
                },
              ]}
            >

            <UI.TouchableOpacity onPress={this.props.forgetPassModal} style={styles.cross}>
              <Image source={require('../../../assets/images/cross.png')} style={{ width: 20, height: 20 }} />
            </UI.TouchableOpacity>
            { }
                        {/* <Camera color="#0D92F4" size={48} /> */}
                        <Image source={require('../../../assets/images/ModeImg.png')} style={styles.lock_img} />
                        <Text style={styles.modalTitle}>Forgot Your Password?</Text>
                        <Text style={styles.inputLabel}>Enter your username*</Text>
                        <UI.ConnectedCbInput labelRequired={false} id='username' formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} labelText="" style={styles.modalInput} />
                        {/* <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} value={resetpassusername} onChangeText={setResetPassUsername} style={styles.modalInput} >
                            <InputField
                                placeholder='Enter you username' style={{ color: '#000' }}
                            />
                        </Input> */}
                        <Text style={{ fontSize: 16, marginBottom: 40, textAlign: 'center' }}>
                            If you do not remember which username you registered with our system, please contact info@mycobaltsoftware.com
                        </Text>
                        <UI.TouchableOpacity style={styles.modalButton}
                        //  onPress={forgetPassSubmit}
                         >
                            <Text style={styles.modalButtonText}>Send</Text>
                        </UI.TouchableOpacity>
                    </View>
                </View>
            </Modal>

      </ImageBackground>

    );
  }
}

const mapStateToProps = (state) => {
  const formData = state.login.formData || {};
  console.log(JSON.stringify(formData), "--->syayeyeyey");
  return {
    formData: state.login.formData,
    isPasswordVisible:state.login.isPasswordVisible,
    isTooltipVisible:state.login.isTooltipVisible,
    isModalVisible:state.login.isModalVisible
    
  }
}
const mapDispatchToProps = {
  setFormFieldData,
  getFormFieldData,
  showPassword,
  showToolTip,
  forgetPassModal
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
  tooltip: {
    position: 'absolute',
    top: -55,
    right: 0,
    backgroundColor: '#fff',
    padding: 5,
    height: 50,
    borderRadius: 5,
    width: '70%',
    justifyContent:"center"
},
tooltipText: {
    color: '#000',
    fontSize: 16,
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
  
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
    // width: '50%',
    // height: '50%', 
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