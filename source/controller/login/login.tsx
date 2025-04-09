import { navigateToScreen } from '@/components/constants/Navigations';
import { getFormFieldDataSelector } from '@/components/redux/reducers/loginReducer';
import { Component } from 'react'

const pageId='Login';

export default class useLoginLogic extends Component<any,any,any> {
    constructor(props:any){
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
    console.log(this.props?.formData,"--->props")
    const usernameField = getFormFieldDataSelector(this.props?.formData,pageId,'username');
    const passwordField = getFormFieldDataSelector(this.props?.formData,pageId,'password');
    console.log(usernameField,"--->11111")
    console.log(passwordField,"--->22222")
    let isValid = true;
  
    if (!usernameField.value) {
      this.props?.setFormFieldData(pageId, 'input', 'username', usernameField.value, true);
      isValid = false;
    } else {
      this.props?.setFormFieldData(pageId, 'input', 'username', usernameField.value, false);
    }
    if (!passwordField.value) {
      this.props?.setFormFieldData(pageId, 'input', 'password', passwordField.value, true);
      isValid = false;
    } else {
      this.props?.setFormFieldData(pageId, 'input', 'password', passwordField.value, false);
    }

    console.log(isValid,"--->what")
    if(isValid){
      this.handleLogin()
    }
  };

  showPassword = () => {
    this.setState({isPasswordVisible:!this.state.isPasswordVisible})
  }
  
}

