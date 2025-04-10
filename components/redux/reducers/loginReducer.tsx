import { createSlice } from '@reduxjs/toolkit'
import { store } from '../store'

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
      const loadScreen = store.getState().dashboard.loading
      console.log(loadScreen,"--->screen")
    },
    showPassword(state, action) {
      state.isPasswordVisible = !state.isPasswordVisible
    },
  },
})

export const { handlePassword,setFormFieldData,getFormFieldData,showPassword, }:any = loginSlice.actions
export default loginSlice.reducer

export const getFormFieldDataSelector = (state:any, formId:string, controlId:string) => {
  return state?.[formId + '_' + controlId] || { value: '', isInvalid: false };
};