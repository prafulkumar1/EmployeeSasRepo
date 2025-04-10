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

    handleValidation = () => {
    const usernameField = getFormFieldDataSelector(this.props?.formData,pageId,'username');
    const passwordField = getFormFieldDataSelector(this.props?.formData,pageId,'password');
    let isValid = true;
  
    if (!usernameField.value) {
      this.props?.setFormFieldData({formId:pageId, controlType:'input', controlId:'username',controlValue: usernameField.value,isInvalid: true});
      isValid = false;
    } else {
      this.props?.setFormFieldData({formId:pageId, controlType:'input', controlId:'username',controlValue: usernameField.value,isInvalid: false});

    }
    if (!passwordField.value) {
      this.props?.setFormFieldData({formId:pageId, controlType:'input', controlId:'password',controlValue: passwordField.value,isInvalid: true});
      isValid = false;
    } else {
      this.props?.setFormFieldData({formId:pageId, controlType:'input', controlId:'password',controlValue: passwordField.value,isInvalid: false});
    }

    if(isValid){
      this.handleLogin()
    }
  };

  showPassword = () => {
    this.setState({isPasswordVisible:!this.state.isPasswordVisible})
  }
  
}

