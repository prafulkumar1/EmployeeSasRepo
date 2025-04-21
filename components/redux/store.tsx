import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import login from  "./reducers/loginReducer"
import dashboard from  "./reducers/dashboardReducer"
import addMember from  "./reducers/addMemberReducer"
export const store = configureStore({
  reducer: {
    login,
    dashboard,
    addMember
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;