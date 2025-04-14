import * as UI from '@/components/cobalt/importUI';
import { connect } from 'react-redux';
import { forgetPassModal, getFormFieldData, getFormFieldDataSelector, resentFormData, setFormFieldData, showPassword } from '@/components/redux/reducers/loginReducer';
import {Image, Modal} from "react-native"
import { RootState } from '@/components/redux/store';
import useAdvanceLoginLogic from '@/AdvancedSource/controller/login/login';
import { styles } from '@/AdvancedSource/styles/login/loginStyle';
const pageId = 'Login';
class AdvanceLoginUI extends useAdvanceLoginLogic {
  render() {
    const { setFormFieldData, getFormFieldData } = this.props
    const pwdValue = getFormFieldDataSelector(this.props?.formData, pageId, "password");
    const userNameValue = getFormFieldDataSelector(this.props?.formData, pageId, "username");
    let pageConfigJson = global.appConfigJsonArray?.find((item: { PageId: string; }) => item.PageId === pageId);
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
      <UI.ConnectedCbImageBackground id='loginBackground' source={require('@/assets/images/loginapp.png')}>
        <Image source={require('../../../assets/images/Logo1.png')} style={styles.club_logo} resizeMode="cover" />
        <UI.Box style={styles.devDiv}/>

        <UI.ConnectedCbForm formId={pageId}>
          <UI.ConnectedCbVStack id='VStack1'>

            <UI.Box style={styles.subContainer}>
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
                <UI.Image
                  source={require('../../../assets/images/tooltip_icon.png')}
                  resizeMode="contain"
                  style={styles.icon}
                />
              </UI.TouchableOpacity>
            </UI.Box>




            <UI.Box style={styles.bottomContainer}>
              <UI.Box style={{ width: "100%" }}>
                <UI.ConnectedCbInput labelRequired={false} placeholder={"Password"} id='password' isPasswordVisible={this.props.isPasswordVisible}  formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} style={styles.inputs} />
                {this.props?.formData?.[pageId + '_password']?.isInvalid && (
                  <UI.Text style={styles.errorMsgTxt}>
                    {this.props?.formData?.[pageId + '_password']?.errorMessage}
                  </UI.Text>
                )}
              </UI.Box>
              <UI.TouchableOpacity
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
              </UI.TouchableOpacity>
            </UI.Box>

            <UI.Box style={styles.checkBox}>
              <UI.ConnectedCbCheckBox id='rememberme' customStyles={{ CheckboxIndicator: { width: 10, height: 10 }, checkboxLabel: { color: '#fff', marginLeft: 10, fontSize: 16, } }} />
              <UI.Box>
                <UI.TouchableOpacity
                 onPress={this.props.forgetPassModal}
                >
                  <UI.Text style={styles.forgot_passText}>Forgot Password?</UI.Text>
                </UI.TouchableOpacity>
              </UI.Box>
            </UI.Box>


            <UI.ConnectedCbButton id='login' variant='solid' buttonText='Login' onPress={() => this.handleValidation()} customStyles={{ buttonStyle: styles.login, }} />
          </UI.ConnectedCbVStack>
        </UI.ConnectedCbForm>
        <UI.TouchableOpacity>
          <UI.Image source={require('../../../assets/images/finger_print.png')} style={styles.finger_print} />
        </UI.TouchableOpacity>

        <UI.Box>
          <UI.Text style={styles.poweredPolicyText}>Powered by Cobalt Software™</UI.Text>
          <UI.Text style={styles.poweredPolicyText}>Privacy Policy | Terms of Use</UI.Text>
        </UI.Box>

        <Modal
          transparent={true}
          visible={this.props.isModalVisible}
          onRequestClose={this.props.forgetPassModal}
        >
          <UI.Box style={styles.modalOverlay}>
            <UI.Box style={styles.modalContent}>
              <UI.TouchableOpacity onPress={this.props.forgetPassModal} style={styles.cross}>
                <Image source={require('../../../assets/images/icons/Close3x.png')} style={styles.closeIcon} />
              </UI.TouchableOpacity>
              <Image source={require('../../../assets/images/icons/icon_lock.png')} style={styles.lock_img} />
              <UI.Text style={styles.modalTitle}>Forgot Your Password?</UI.Text>
              <UI.Text style={styles.inputLabel}>Enter your username*</UI.Text>
              <UI.ConnectedCbInput labelRequired={false} id='username' formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} labelText="" style={styles.modalInput} />
              <UI.Text style={styles.rememberMeTxt}>
                If you do not remember which username you registered with our system, please contact info@mycobaltsoftware.com
              </UI.Text>
              <UI.TouchableOpacity style={styles.modalButton}
               onPress={this.props.forgetPassModal}
              >
                <UI.Text style={styles.modalButtonText}>Send</UI.Text>
              </UI.TouchableOpacity>
            </UI.Box >
          </UI.Box >
        </Modal>
 
      </UI.ConnectedCbImageBackground>

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

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceLoginUI)

