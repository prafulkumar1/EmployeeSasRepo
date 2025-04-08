import { navigateToScreen } from '@/components/constants/Navigations';
import { Component } from 'react'

const pageId='AdvanceLoginUI';

export default class useAdvanceLoginLogic extends Component<any,any,any> {
    constructor(props:any){
      super(props)
      this.state ={
        loading:false
      }
    }
    handleLogin = (props:any) => {
    navigateToScreen(props,"DashboardUI",true,{})
    };

    handleValidation = () => {
    // const usernameField = this.props?.getFormFieldData(pageId, 'username');
    // const passwordField = this.props?.getFormFieldData(pageId, 'password');
    const usernameField = this.props?.getFormFieldData({formId:pageId,id:'username'});
    const passwordField = this.props?.getFormFieldData({formId:pageId,id:'password'});
    console.log(usernameField,passwordField,"--->values")
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
  
    return isValid;
  };
  
}

