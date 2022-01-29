import {configureStore} from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import authReducer from './auth/authSlice'

/**
 * Application store. Contains global data of the application.
 */
const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch