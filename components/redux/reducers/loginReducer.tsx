import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginDetails : [],
    loading:false,
    logintxt:"",
    password:"",
    formData:{},
    isPasswordVisible:false
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
        state.formData = {
          ...state.formData,
          [formId + '_' + controlId]: {
            value: controlValue,
            isInvalid: isInvalid ?? false,
          },
        }
    },
    getFormFieldData(state, action) {
      // if(action.payload){
      //   const {formId, controlId,} = action.payload
      //   return state.formData?.[formId + '_' + controlId] || { value: '', isInvalid: false };
      // }
    },
    showPassword(state, action) {
      state.isPasswordVisible = !state.isPasswordVisible
    },
  },
})

export const { handlePassword,setFormFieldData,getFormFieldData,showPassword }:any = loginSlice.actions
export default loginSlice.reducer

export const getFormFieldDataSelector = (state:any, formId:string, controlId:string) => {
  return state?.[formId + '_' + controlId] || { value: '', isInvalid: false };
};