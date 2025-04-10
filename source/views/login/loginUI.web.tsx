import * as UI from '@/components/cobalt/importUI';
import { Image, View, TouchableOpacity, ImageBackground } from 'react-native';
import useLoginLogic from '@/source/controller/login/login';
import { connect } from 'react-redux';
import { getFormFieldData, setFormFieldData, showPassword } from '@/components/redux/reducers/loginReducer';

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
      <ImageBackground id='loginBackground' source={require('@/assets/images/login.jpg')} style={styles.mainImageLogo}>
        <Image source={require('../../../assets/images/Logo1.png')} style={styles.webLogo} resizeMode="cover" />
        <View style={styles.subWebContainer}>
         <View style={styles.topBox}>
          <UI.ConnectedCbForm formId={pageId}>
              <View style={styles.inputContainer}>
                <UI.Box style={{ width: "100%" }}>
                  <UI.ConnectedCbInput labelRequired={false} id='username' formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} labelText="" style={styles.inputs} />
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
 
 
              <View style={styles.pwdContainer}>
                <UI.Box style={{ width: "100%" }}>
                  <UI.ConnectedCbInput labelRequired={false} id='password' isPasswordVisible={this.props?.isPasswordVisible} formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} style={styles.inputs} />
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
                  // onPress={openModal}
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
 
      </ImageBackground>
 
    );
  }
}

const mapStateToProps = (state:RootState) => {
 return {
   formData :state.login?.formData,
   isPasswordVisible:state.login?.isPasswordVisible
 }
}
const mapDispatchToProps = {
  setFormFieldData,
  getFormFieldData,
  showPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(loginUI)
