import { navigateToScreen } from '@/components/constants/Navigations';
import { getFormFieldDataSelector, getProfitCenterData } from '@/components/redux/reducers/loginReducer';
import { postApiCall } from '@/components/utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { Component } from 'react'
import { Dimensions } from 'react-native';
import * as DeviceInfo from 'expo-device';
const { width, height } = Dimensions.get('window');
const pageId='Login';

interface IState{
  loading:boolean
  isPasswordVisible:boolean
  screenWidth:number
  rememberMe: boolean,
}
interface IProps{
  navigation:{navigate:(params:string) => void}
  formData:Object,
  setFormFieldData:({formId, controlType, controlId, controlValue, isInvalid,errorMessage}) => void
  resentFormData:({formId, controlType, controlId, controlValue, isInvalid,errorMessage}) => void
  showPassword:() =>void
  getFormFieldData:() => void
  isPasswordVisible:boolean
  isModalVisible:boolean
  forgetPassModal:()=>void
  getProfitCenterData:() =>void
}
interface SS{}

export default class useLoginLogic extends Component<IProps,IState,SS> {
  dimensionListener: any;
    constructor(props:IProps){
      super(props)
      this.state ={
        isPasswordVisible:false,
        screenWidth: width,
        loading: false,
        rememberMe: false,
      }
    }
    componentDidMount() {
      // this.props.getProfitCenterData()
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
  handleLogin = () => {
    navigateToScreen(this.props, "DashboardUI", true, {})
  };

  handleValidation = () => {
    const usernameField = getFormFieldDataSelector(this.props?.formData, pageId, 'username');
    const passwordField = getFormFieldDataSelector(this.props?.formData, pageId, 'password');
 
    let isValid = true;
 
    const usernameRegex = /^[a-zA-Z0-9]{4,15}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;
 
 
    if (!usernameField.value) {
      this.props?.setFormFieldData({
        formId: pageId,
        controlType: 'input',
        controlId: 'username',
        controlValue: usernameField.value,
        isInvalid: true,
        errorMessage: 'Username is required',
      });
      isValid = false;
    } else if (!usernameRegex.test(usernameField.value)) {
      this.props?.setFormFieldData({
        formId: pageId,
        controlType: 'input',
        controlId: 'username',
        controlValue: usernameField.value,
        isInvalid: true,
        errorMessage: 'Username must be 4-15 alphanumeric characters',
      });
      isValid = false;
    } else {
      this.props?.setFormFieldData({
        formId: pageId,
        controlType: 'input',
        controlId: 'username',
        controlValue: usernameField.value,
        isInvalid: false,
        errorMessage: '',
      });
    }
 
 
    if (!passwordField.value) {
      this.props?.setFormFieldData({
        formId: pageId,
        controlType: 'input',
        controlId: 'password',
        controlValue: passwordField.value,
        isInvalid: true,
        errorMessage: 'Password is required',
      });
      isValid = false;
    } else if (!passwordRegex.test(passwordField.value)) {
      this.props?.setFormFieldData({
        formId: pageId,
        controlType: 'input',
        controlId: 'password',
        controlValue: passwordField.value,
        isInvalid: true,
        errorMessage: 'Password must be at least 8 characters and include a number',
      });
      isValid = false;
    } else {
      this.props?.setFormFieldData({
        formId: pageId,
        controlType: 'input',
        controlId: 'password',
        controlValue: passwordField.value,
        isInvalid: false,
        errorMessage: '',
      });
    }
 
    if (isValid) {
      this.handleAuthLogin(usernameField.value,passwordField.value)
      // this.props?.resentFormData({
      //   formId: pageId,
      //   controlType: 'input',
      //   controlId: 'username',
      //   controlValue: '',
      //   isInvalid: false,
      //   errorMessage: '',
      // });
 
      // this.props?.resentFormData({
      //   formId: pageId,
      //   controlType: 'input',
      //   controlId: 'password',
      //   controlValue: '',
      //   isInvalid: false,
      //   errorMessage: '',
      // });
      // this.handleLogin();
    }
  };
  


  formatDateForAPI(date: string | number | Date) {
    return format(date, "yyyy-MM-dd");
  }

  generateSessionId() {
    const sessionId = Math.random().toString(36).substring(2, 15) +
                      Math.random().toString(36).substring(2, 15);
    return sessionId;
  }

  setApiUrl = async() => {
    await AsyncStorage.setItem("apiURL","https://cobaltportal.mycobaltsoftware.com/MemberAppService.Wrapper.CobaltTest/API/")
  }

  async handleAuthLogin(username:string,password:string) {
    this.setState({ loading: true });

    const date = new Date();
    const formattedDate = this.formatDateForAPI(date);
    const sessionId = this.generateSessionId();

    const ipAddress = '';
    const hostName = '';

    const deviceInfo = [{
      DeviceType: DeviceInfo,
      OSVersion: "", 
      OriginatingIP: ipAddress,
      SessionID: sessionId,
      Browser: DeviceInfo,
      HostName: hostName,
      SourcePortNo: "50503"
    }];

    const payload = {
      MemberID: username,
      ID: null,
      ParentID: null,
      DeviceInfo: deviceInfo,
      IsAdmin: null,
      UserName: username,
      Role: null,
      UserId: null,
      CompanyCode: "00",
      Password: password,
      DeviceID: "",
      ControllerID: "",
      ProviderType: "SQLDB",
      IsForceReset: false,
      Expiration: "11/18/2025"
    };

    try {
       const response = await postApiCall("AUTHENTICATE_USER","AUTHENTICATE_USER",payload)

      const data = response.response;
      console.log('LoginData', data);

      if (data.ResponseCode === "Success") {
        AsyncStorage.setItem('username', username);
        AsyncStorage.setItem('password', password);
        AsyncStorage.setItem('rememberMe', this.state.rememberMe ? 'true' : 'false');
        AsyncStorage.setItem('MemberName', data.MemberNameDisplay);
        this.setApiUrl()
        this.setState({ loading: false });
        navigateToScreen(this.props, "DashboardUI", true, {})
      } else if (data.ResponseCode === "Fail") {
        this.setState({ loading: false });

        if (data.BrokenRules?.Fields?.[0]) {
          alert(data.BrokenRules.Fields[0]);
        } else {
          alert(data.ResponseMessage || "An error occurred. Please try again.");
        }
      } else {
        this.setState({ loading: false });
      }

    } catch (error) {
      this.setState({ loading: false });
      alert("An error occurred, please try again later.");
    } finally {
      this.setState({ loading: false });
    }
  }
  

 
}

