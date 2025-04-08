import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import login from  "./reducers/loginReducer"

export const store = configureStore({
  reducer: {
    login: login,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;