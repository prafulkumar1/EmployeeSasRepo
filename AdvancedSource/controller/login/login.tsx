import { navigateToScreen } from '@/components/constants/Navigations';
import { getFormFieldDataSelector } from '@/components/redux/reducers/loginReducer';
import { Component } from 'react'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const pageId='Login';

interface IState{
  loading:boolean
  isPasswordVisible:boolean
  screenWidth:number
}
interface IProps{
  formData:Object,
  setFormFieldData:({formId, controlType, controlId, controlValue, isInvalid,errorMessage}) => void
  resentFormData:({formId, controlType, controlId, controlValue, isInvalid,errorMessage}) => void
  showPassword:() =>void
  getFormFieldData:() => void
  isPasswordVisible:boolean
  isModalVisible:boolean
  forgetPassModal:()=>void
}
interface SS{}

export default class useAdvanceLoginLogic extends Component<IProps,IState,SS> {
  dimensionListener: any;
    constructor(props:IProps){
      super(props)
      this.state ={
        loading:false,
        isPasswordVisible:false,
        screenWidth: width,
      }
    }
    componentDidMount() {
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
    navigateToScreen(this.props, "AdvanceDashboard", true, {})
  };

  handleValidation = () => {
    const usernameField = getFormFieldDataSelector(this.props?.formData, pageId, 'username');
    const passwordField = getFormFieldDataSelector(this.props?.formData, pageId, 'password');
 
    let isValid = true;
 
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
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
        errorMessage: 'Username must be 4-20 alphanumeric characters',
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
      this.props?.resentFormData({
        formId: pageId,
        controlType: 'input',
        controlId: 'username',
        controlValue: '',
        isInvalid: false,
        errorMessage: '',
      });
 
      this.props?.resentFormData({
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
 
}

