import { createSlice } from '@reduxjs/toolkit'

// interface InitialState {
//     loginDetails : {
//         login:string,
//         password:string
//     }[],
//     loading:boolean,
//     logintxt:string,
//     password:string
// }

const initialState = {
    loginDetails : [],
    loading:false,
    logintxt:"",
    password:"",
    formData:{},
}
const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    handlePassword(state, action) {
        state.password = action.payload
    },
    setFormFieldData(state, action) {
        const {formId, controlType, controlId, controlValue, isInvalid} = action.payload
        console.log(action.payload,"--->setFormFieldData")
        state.formData = {
          ...state.formData,
          [formId + '_' + controlId]: {
            value: controlValue,
            isInvalid: isInvalid ?? false,
          },
        }
    },
    getFormFieldData(state, action) {
      if(action.payload){
        const {formId, controlId,} = action.payload
        console.log(state.formData,"---->formdataaaa111111111")
        return state.formData?.[formId + '_' + controlId] || { value: '', isInvalid: false };
        // state.formData = state.formData[formId + '_' + controlId] || { value: '', isInvalid: false };
      }
    }
  }
})

export const { handlePassword,setFormFieldData,getFormFieldData } = loginSlice.actions
export default loginSlice.reducer