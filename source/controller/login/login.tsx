import { navigateToScreen } from '@/components/constants/Navigations';
import { getFormFieldDataSelector } from '@/components/redux/reducers/loginReducer';
import { Component } from 'react'

const pageId='Login';

interface IState{
  loading:boolean
  isPasswordVisible:boolean
}
interface IProps{
  formData:Object,
  setFormFieldData:({formId, controlType, controlId, controlValue, isInvalid}) => void
  showPassword:() =>void
  getFormFieldData:() => void
  isPasswordVisible:boolean
}
interface SS{}

export default class useLoginLogic extends Component<IProps,IState,SS> {
    constructor(props:IProps){
      super(props)
      this.state ={
        loading:false,
        isPasswordVisible:false
      }
    }
    handleLogin = () => {
    navigateToScreen(this.props,"DashboardUI",true,{})
    };

  //   handleValidation = () => {
  //   console.log(this.props?.formData,"--->props")
  //   const usernameField = getFormFieldDataSelector(this.props?.formData,pageId,'username');
  //   const passwordField = getFormFieldDataSelector(this.props?.formData,pageId,'password');
  //   console.log(usernameField,"--->11111")
  //   console.log(passwordField,"--->22222")
  //   let isValid = true;
  
  //   if (!usernameField.value) {
  //     this.props?.setFormFieldData(pageId, 'input', 'username', usernameField.value, true);
  //     isValid = false;
  //   } else {
  //     this.props?.setFormFieldData(pageId, 'input', 'username', usernameField.value, false);
  //   }
  //   if (!passwordField.value) {
  //     this.props?.setFormFieldData(pageId, 'input', 'password', passwordField.value, true);
  //     isValid = false;
  //   } else {
  //     this.props?.setFormFieldData(pageId, 'input', 'password', passwordField.value, false);
  //   }

  //   console.log(isValid,"--->what")
  //   if(isValid){
  //     this.handleLogin()
  //   }
  // };

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
      this.props?.setFormFieldData({
        formId: pageId,
        controlType: 'input',
        controlId: 'username',
        controlValue: '',
        isInvalid: false,
        errorMessage: '',
      });
  
      this.props?.setFormFieldData({
        formId: pageId,
        controlType: 'input',
        controlId: 'password',
        controlValue: '',
        isInvalid: false,
        errorMessage: '',
      });
      this.handleLogin();
     
    }
  };

  showPassword = () => {
    this.setState({isPasswordVisible:!this.state.isPasswordVisible})
  }
  
}

