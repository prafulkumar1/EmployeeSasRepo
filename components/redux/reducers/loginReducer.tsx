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
      // const loadScreen = store.getState().dashboard.loading
      // console.log(loadScreen,"--->screen")
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
    resentFormData(state,action){
      const { formId, controlType, controlId, controlValue, isInvalid, errorMessage } = action.payload;
      state.formData = {
        [formId + '_' + controlId]: {
          value: "",
          isInvalid: isInvalid ?? false,
          errorMessage: errorMessage ?? '',
        },
      };
    }
  },
})

export const { handlePassword,setFormFieldData,getFormFieldData,showPassword ,showToolTip ,forgetPassModal,resentFormData}:any = loginSlice.actions
export default loginSlice.reducer

export const getFormFieldDataSelector = (state: any, formId: string, controlId: string) => {
  return state?.[formId + '_' + controlId] || { value: '', isInvalid: false, errorMessage: '' };
};