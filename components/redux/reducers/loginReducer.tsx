import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginDetails : [],
    loading:false,
    logintxt:"",
    password:"",
    formData:{},
    isPasswordVisible:false,
    isTooltipVisible:false,
    isModalVisible:false
}
const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    handlePassword(state, action) {
        state.password = action.payload
    },
    setFormFieldData(state, action) {
      const { formId, controlType, controlId, controlValue, isInvalid, errorMessage } = action.payload;
      state.formData = {
        ...state.formData,
        [formId + '_' + controlId]: {
          value: controlValue,
          isInvalid: isInvalid ?? false,
          errorMessage: errorMessage ?? '', 
        },
      };
    },
    
    getFormFieldData(state, action) {
      console.log(action.payload,"---->>>>!111111")
      console.log(state.formData,"---->>>>!222222")
      // if(action.payload){
      //   const {formId, controlId,} = action.payload
      //   return state.formData?.[formId + '_' + controlId] || { value: '', isInvalid: false };
      // }
    },
    toggleFlag(state, action) {
      const key = action.payload;
      if (key in state && typeof state[key] === 'boolean') {
        state[key] = !state[key];
      }
    },
    
    showPassword(state, action) {
      state.isPasswordVisible = !state.isPasswordVisible
    },
    showToolTip(state, action) {
      state.isTooltipVisible = !state.isTooltipVisible
    },
    forgetPassModal(state, action) {
      state.isModalVisible = !state.isModalVisible
    },
  },
})

export const { handlePassword,setFormFieldData,getFormFieldData,showPassword ,showToolTip ,forgetPassModal} = loginSlice.actions
export default loginSlice.reducer

export const getFormFieldDataSelector = (state: any, formId: string, controlId: string) => {
  return state?.[formId + '_' + controlId] || { value: '', isInvalid: false, errorMessage: '' };
};