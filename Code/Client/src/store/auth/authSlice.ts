import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store';
import {AuthState, AuthStateInfo} from './AuthState';

// const initialState: AuthState = {
//   authenticated: false,
//   info: {
//     role: undefined,
//     email: undefined,
//     name: undefined,
//     surname: undefined
//   },
//   tokens: {
//     refreshToken: undefined,
//     accessToken: undefined,
//   }
// }

const initialState: AuthState = {
  authenticated: true,
  info: {
    role: "farmer",
    email: "dummy@dummy.com",
    name: "Bogdan",
    surname: "Z Indii"
  },
  tokens: {
    refreshToken: "",
    accessToken: "",
  }
}

export const authSlice = createSlice({
  name: 'user',
  initialState: initialState,
  // Dummy actions, before API is ready TODO
  reducers: {
    setLoginInfo: (state, action: PayloadAction<AuthStateInfo>) => {
      state.info = action.payload
    },
    logout: (_) => (initialState),
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.tokens.accessToken = action.payload
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.authenticated = true
      state.tokens.refreshToken = action.payload
    },
  },
})

// selectors
export const selectTokens = (state: RootState) => state.auth.tokens
export const selectAuthenticated = (state: RootState) => state.auth.authenticated
export const selectAuthInfo = (state: RootState) => state.auth.info

// Action creators are generated for each case reducer function
export const {setAccessToken, setRefreshToken, setLoginInfo, logout} = authSlice.actions

export default authSlice.reducer