
import * as UI from '@/components/cobalt/importUI';
import { connect } from 'react-redux';
import { getFormFieldData, setFormFieldData } from '@/components/redux/reducers/loginReducer';
import useAdvanceLoginLogic from '@/AdvancedSource/controller/login/login';

const pageId='AdvanceLogin';
class AdvanceLoginUI extends useAdvanceLoginLogic {
  constructor(props){
    super(props)
  }
  render() {
    const {setFormFieldData,getFormFieldData} = this.props
    let pageConfigJson = global.appConfigJsonArray.find(item => item.PageId === pageId);
    global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
    return (
      <UI.cbImageBackground id='loginBackground' source={require('@/assets/images/loginapp.png')}> 
       <UI.ScrollView contentContainerStyle={styles.scrollContent}>
      <UI.cbForm formId={pageId} setFormFieldData={setFormFieldData}>
      <UI.cbVStack id='VStack1'>      
        <UI.cbInput  id='username' formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} labelText=""/>
         <UI.cbInput  id='password' formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData} labelText=""/>
        <UI.cbCheckBox id='rememberme' customStyles={{  CheckIcon:{color:'white'}, }}/>
        <UI.cbSelect id="department"/>
        <UI.cbRadioButton id='gender' />
        <UI.cbButton id='login' variant='solid' text='signin' onPress = {() => this.handleValidation()}/>
        <UI.cbButton id='cancel' variant='link'/>
    </UI.cbVStack>
        </UI.cbForm>
        </UI.ScrollView>
        </UI.cbImageBackground>
        
      );
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = {
  setFormFieldData,
  getFormFieldData
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceLoginUI)

const styles = UI.StyleSheet.create({
 
  scrollContent: {
    padding: 20,
    alignSelf:"center",
    flex:1,
    justifyContent:"center",
    width:"100%"
  },
  
});