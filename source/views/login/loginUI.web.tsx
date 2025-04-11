import * as UI from '@/components/cobalt/importUI';
import { Image, View, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import useLoginLogic from '@/source/controller/login/login';
import { connect } from 'react-redux';
import { forgetPassModal, getFormFieldData, getFormFieldDataSelector, resentFormData, setFormFieldData, showPassword } from '@/components/redux/reducers/loginReducer';

import { Dimensions } from 'react-native';
import { RootState } from '@/components/redux/store';
import { styles } from '@/source/styles/loginStyle';
const { width, height } = Dimensions.get('window');

const pageId = 'Login';
class loginUI extends useLoginLogic {
  constructor(props:any) {
    super(props)
  }
  screenWidth=width
  render() {
    const { setFormFieldData, getFormFieldData } = this.props
        const pwdValue = getFormFieldDataSelector(this.props?.formData, pageId, "password");
        const userNameValue = getFormFieldDataSelector(this.props?.formData, pageId, "username");
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
    ]
    return (
      <ImageBackground id='loginBackground' source={require('@/assets/images/login.jpg')} style={styles.mainImageLogo}>
        <Image source={require('../../../assets/images/Logo1.png')} style={styles.webLogo} resizeMode="cover" />
        <View style={styles.subWebContainer}>
         <View style={styles.topBox}>
          <UI.ConnectedCbForm formId={pageId}>
              <View style={styles.inputContainer}>
                <UI.Box style={{ width: "100%" }}>
                  <UI.ConnectedCbInput placeholder={"User Name/Member ID"} labelRequired={false} id='username' formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} labelText="" style={styles.inputs} />
                  {this.props?.formData?.[pageId + '_username']?.isInvalid && (
                    <UI.Text style={styles.errorMsgTxt}>
                      {this.props?.formData?.[pageId + '_username']?.errorMessage}
                    </UI.Text>
                  )}
                </UI.Box>
                <UI.TouchableOpacity
                  style={styles.iconborder}>
                  <Image
                    source={require('../../../assets/images/tooltip_icon.png')}
                    resizeMode="contain"
                    style={styles.icon}
                  />
                </UI.TouchableOpacity>
              </View>
 
 
              <View style={styles.pwdContainer}>
                <UI.Box style={{ width: "100%" }}>
                  <UI.ConnectedCbInput labelRequired={false} placeholder={"Password"} id='password' isPasswordVisible={this.props.isPasswordVisible} formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} style={styles.inputs} />
                  {this.props?.formData?.[pageId + '_password']?.isInvalid && (
                    <UI.Text style={styles.errorMsgTxt}>
                      {this.props?.formData?.[pageId + '_password']?.errorMessage}
                    </UI.Text>
                  )}
                </UI.Box>
                <TouchableOpacity
                  onPress={this.props?.showPassword}
                  style={styles.iconborder}>
                  <UI.Image
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
 
 
              <View style={styles.checkBoxWeb}>
                <UI.ConnectedCbCheckBox
                  id="rememberme"
                  customStyles={{
                    CheckboxIndicator: styles.rememberMe,
                    checkboxLabel: styles.labelCheckBox,
                  }}
                />
 
                <UI.TouchableOpacity
                  onPress={this.props.forgetPassModal}
                  style={styles.forgotPwdWeb}
                >
                  <UI.Text style={styles.forgot_passText_web}>Forgot Password?</UI.Text>
                </UI.TouchableOpacity>
              </View>
              <UI.ConnectedCbButton id='login' variant='solid' buttonText='Login' onPress={() => this.handleValidation()} customStyles={{ buttonStyle: styles.login, }} />
          </UI.ConnectedCbForm>
          </View>
 
          <View >
            <UI.Text style={styles.poweredPolicyText}>Powered by Cobalt Software™</UI.Text>
            <UI.Text style={styles.poweredPolicyText}>Privacy Policy | Terms of Use</UI.Text>
          </View>
        </View>

        <Modal
          transparent={true}
          visible={this.props.isModalVisible}
          onRequestClose={this.props.forgetPassModal}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContentWeb,
                {
                  height: this.state.screenWidth < 1640 ? '70%' : '50%',
                  width: this.state.screenWidth < 780 ? '90%' : "50%",
                },
              ]}
            >
              <UI.TouchableOpacity onPress={this.props.forgetPassModal} style={styles.cross}>
                <Image source={require('../../../assets/images/icons/Close3x.png')} style={styles.closeIcon} />
              </UI.TouchableOpacity>
              { }
              <Image source={require('../../../assets/images/icons/icon_lock.png')} style={styles.lock_img} />
              <UI.Text style={styles.modalTitle}>Forgot Your Password?</UI.Text>
              <UI.Text style={styles.inputLabel}>Enter your username*</UI.Text>
              <UI.ConnectedCbInput labelRequired={false} id='username' formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} labelText="" style={styles.modalInput} />

              <UI.Text style={styles.rememberMeTxtWeb}>
                If you do not remember which username you registered with our system, please contact info@mycobaltsoftware.com
              </UI.Text>
              <UI.TouchableOpacity style={styles.modalButton}
                onPress={this.props.forgetPassModal}
              >
                <UI.Text style={styles.modalButtonText}>Send</UI.Text>
              </UI.TouchableOpacity>
            </View>
          </View>
        </Modal>
 
      </ImageBackground>
 
    );
  }
}

const mapStateToProps = (state:RootState) => {
 return {
  formData: state.login?.formData,
  isPasswordVisible:state.login?.isPasswordVisible,
  isModalVisible:state.login.isModalVisible,
 }
}
const mapDispatchToProps = {
  setFormFieldData,
  getFormFieldData,
  showPassword,
  forgetPassModal,
  resentFormData
}

export default connect(mapStateToProps, mapDispatchToProps)(loginUI)
