import * as UI from '@/components/cobalt/importUI';
import useLoginLogic from '@/source/controller/login/login';
import { connect } from 'react-redux';
import { getFormFieldData, setFormFieldData, showPassword } from '@/components/redux/reducers/loginReducer';
import { styles } from '@/source/styles/loginStyle';
import {Image} from "react-native"
import { RootState } from '@/components/redux/store';
const pageId = 'Login';
class loginUI extends useLoginLogic {
  render() {
    const { setFormFieldData, getFormFieldData } = this.props
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
                <UI.ConnectedCbInput labelRequired={false} id='username' formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} labelText="" style={styles.inputs} />
              </UI.Box>
              <UI.TouchableOpacity
                // onPress={handleIconPress}
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
                <UI.ConnectedCbInput labelRequired={false} id='password' isPasswordVisible={this.props.isPasswordVisible}  formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} style={styles.inputs} />
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
                //  onPress={openModal}
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

      </UI.ConnectedCbImageBackground>

    );
  }
}

const mapStateToProps = (state:RootState) => {
  return {
    formData: state.login?.formData,
    isPasswordVisible:state.login?.isPasswordVisible
  }
}
const mapDispatchToProps = {
  setFormFieldData,
  getFormFieldData,
  showPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(loginUI)

