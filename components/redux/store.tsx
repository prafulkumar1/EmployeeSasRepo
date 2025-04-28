import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import login from  "./reducers/loginReducer"
import dashboard from  "./reducers/dashboardReducer"
import addMember from  "./reducers/addMemberReducer"
import memberDirectory from  "./reducers/memberDirectoryReducer"
import reservation from  "./reducers/reservationReducer"

export const store = configureStore({
  reducer: {
    login,
    dashboard,
    addMember,
    memberDirectory,
    reservation
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;