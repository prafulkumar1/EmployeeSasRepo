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

// const setFormFieldData = (formId, controlType, controlId, controlValue, isInvalid) => {
//   setFormData((prevFormData) => ({
//     ...prevFormData,
//     [formId + '_' + controlId]: {
//       value: controlValue,
//       isInvalid: isInvalid ?? false,
//     },
//   }));
// };

// const getFormFieldData = (formId, controlId) => {
//   return formData[formId + '_' + controlId] || { value: '', isInvalid: false };
// };
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
        console.log(action.payload,"--->>>11111")
        state.formData = {
          ...state.formData,
          [formId + '_' + controlId]: {
            value: controlValue,
            isInvalid: isInvalid ?? false,
          },
        }
    },
    getFormFieldData(state, action) {
      const {formId, controlId} = action.payload
      return state.formData[formId + '_' + controlId] || { value: '', isInvalid: false };
    }
  }
})

export const { handlePassword,setFormFieldData,getFormFieldData } = loginSlice.actions
export default loginSlice.reducer