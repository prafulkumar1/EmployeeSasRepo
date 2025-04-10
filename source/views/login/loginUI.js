import * as UI from '@/components/cobalt/importUI';
import useLoginLogic from '@/source/controller/login/login';
import { Animated, Image, StyleSheet, Text, View,Modal } from 'react-native';
import { connect } from 'react-redux';
import { getFormFieldData, setFormFieldData, showPassword,showToolTip,forgetPassModal ,InputField,Input} from '@/components/redux/reducers/loginReducer';
import { CheckboxIndicator } from '@/components/ui/checkbox';
import { styles } from '@/source/styles/loginStyle';
const pageId = 'Login';
class loginUI extends useLoginLogic {
  constructor(props) {
    super(props)
  }
  render() {
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
    ]
    return (
      <UI.ConnectedCbImageBackground id='loginBackground' source={require('@/assets/images/loginapp.png')}>
        <UI.Image source={require('../../../assets/images/Logo1.png')} style={styles.club_logo} resizeMode="cover" />
        <UI.Box style={styles.devDiv}>
          <UI.Text style={styles.devText}>This is a Dev App</UI.Text>
        </UI.Box>

        <UI.ConnectedCbForm formId={pageId} setFormFieldData={setFormFieldData}>
          <UI.ConnectedCbVStack id='VStack1'>

            <UI.Box style={{ flexDirection: "row", marginBottom: 20, }}>
              <UI.Box style={{ width: "100%" }}>
                <UI.ConnectedCbInput labelRequired={false} id='username' formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} labelText="" style={styles.inputs} />
                {this.props?.formData?.[pageId + '_username']?.isInvalid && (
                  <Text style={{ color: 'red', fontSize: 12, marginTop: 2 }}>
                    {this.props?.formData?.[pageId + '_username']?.errorMessage}
                  </Text>
                )}

              </UI.Box>
              <UI.TouchableOpacity
                onPress={this.props.showToolTip}
                style={styles.iconborder}>
                <UI.Image
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
            </UI.Box>




            <UI.Box style={{ flexDirection: "row", marginBottom: 20, }}>
              <UI.Box style={{ width: "100%" }}>
                <UI.ConnectedCbInput labelRequired={false} id='password' isPasswordVisible={this.props.isPasswordVisible} formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} style={styles.inputs} />
                {this.props?.formData?.[pageId + '_password']?.isInvalid && (
                  <Text style={{ color: 'red', fontSize: 12, marginTop: 2 }}>
                    {this.props?.formData?.[pageId + '_password']?.errorMessage}
                  </Text>
                )}

              </UI.Box>
              <UI.TouchableOpacity
                onPress={showPassword}
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

            <UI.Box style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
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
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <UI.TouchableOpacity onPress={this.props.forgetPassModal} style={styles.cross}>
                            <Image source={require('../../../assets/images/cross.png')} style={{ width: 20, height: 20 }} />
                        </UI.TouchableOpacity>
                        {/* <Icon as={CloseIcon} className="text-typography-500 m-2 w-4 h-4" />  */}
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
                        <Text style={{ fontSize: 10, marginBottom: 40, textAlign: 'center' }}>
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

      </UI.ConnectedCbImageBackground>

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

