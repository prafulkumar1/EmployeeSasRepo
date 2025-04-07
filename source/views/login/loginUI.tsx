
// import * as UI from '@/components/cobalt/importUI';
// import {useFormContext } from '@/components/cobalt/event';
// import {useLoginLogic} from '../../controller/login/login';
// import { useSelector } from 'react-redux';


// const pageId='Login';
// export default function LoginScreen(props) {

//  let pageConfigJson = global.appConfigJsonArray.find(item => item.PageId === pageId);

//  global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];

//    const {  handleLogin } = useLoginLogic();
//   // const {getFormFieldData,setFormFieldData}= useSelector();
//   const items= useSelector();
//   console.log(items,"--->items")
//   const departments =[
//     {label:'Dining', value:'dining'},
//     {label:'Golf', value:'golf'},
//     {label:'Tennis', value:'tennis'},
//     {label:'Pool', value:'pool'},
//   ];
//   const genderOptions=[
//     {label:'Male', value:'male'},
//     {label:'FeMale', value:'female'},
//     {label:'Others', value:'others'},
//   ]
  

//   return (
    
//   <UI.cbImageBackground id='loginBackground' source={require('@/assets/images/loginapp.png')}> 
//    <UI.ScrollView contentContainerStyle={styles.scrollContent}>
//   <UI.cbForm formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData}>
//   <UI.cbVStack id='VStack1'>      
//     <UI.cbInput  id='username' />
//      <UI.cbInput  id='password' />
//     <UI.cbCheckBox id='rememberme' customStyles={{  CheckIcon:{color:'white'}, }}/>
//     <UI.cbSelect id="department"/>
//     <UI.cbRadioButton id='gender' />
//     <UI.cbButton id='login' variant='solid' text='signin' onPress={()=>handleLogin(props)}/>
//     <UI.cbButton id='cancel' variant='link'/>
// </UI.cbVStack>
//     </UI.cbForm>
//     </UI.ScrollView>
//     </UI.cbImageBackground>
    
//   );
// }

// const styles = UI.StyleSheet.create({
 
//   scrollContent: {
//     padding: 20,
//     alignSelf:"center",
//     flex:1,
//     justifyContent:"center",
//     width:"100%"
//   },
  
// });

import * as UI from '@/components/cobalt/importUI';
import {useFormContext } from '@/components/cobalt/event';
import { Component } from 'react';
import useLoginLogic from '@/source/controller/login/login';
import { RootState } from '@/components/redux/store';
import { connect } from 'react-redux';
import { getFormFieldData, setFormFieldData } from '@/components/redux/reducers/login';

const pageId='Login';
class loginUI extends useLoginLogic {
  render() {
    let pageConfigJson = global.appConfigJsonArray.find(item => item.PageId === pageId);
    global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
    // const { handleLogin } = useLoginLogic();
    // const {getFormFieldData,setFormFieldData}= useSelector();
    // console.log(items, "--->items")
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
      <UI.cbImageBackground id='loginBackground' source={require('@/assets/images/loginapp.png')}> 
       <UI.ScrollView contentContainerStyle={styles.scrollContent}>
      <UI.cbForm formId={pageId} setFormFieldData={this.props?.setFormFieldData}>
      <UI.cbVStack id='VStack1'>      
        <UI.cbInput  id='username' />
         <UI.cbInput  id='password' />
        <UI.cbCheckBox id='rememberme' customStyles={{  CheckIcon:{color:'white'}, }}/>
        <UI.cbSelect id="department"/>
        <UI.cbRadioButton id='gender' />
        <UI.cbButton id='login' variant='solid' text='signin' />
        <UI.cbButton id='cancel' variant='link'/>
    </UI.cbVStack>
        </UI.cbForm>
        </UI.ScrollView>
        </UI.cbImageBackground>
        
      );
  }
}

const mapStateToProps = (state: RootState) => {
  console.log(state,"--->syayeyeyey")
  return {}
}
const mapDispatchToProps = {
  setFormFieldData,
  getFormFieldData
}

export default connect(mapStateToProps, mapDispatchToProps)(loginUI)

const styles = UI.StyleSheet.create({
 
  scrollContent: {
    padding: 20,
    alignSelf:"center",
    flex:1,
    justifyContent:"center",
    width:"100%"
  },
  
});