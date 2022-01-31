import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store';
import {AuthState, AuthStateInfo} from './AuthState';
import {View} from '../../model/View';
import {Role} from "../../model/Role";

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
    email: "dummy@dummy.com",
    name: "Bogdan",
    surname: "Z Indii"
  },
  navigation: {
    role: Role.FARMER,
    view: "dashboard"
  },
  tokens: {
    refreshToken: "",
    accessToken: "",
  },
}

export const authSlice = createSlice({
  name: 'user',
  initialState: initialState,
  // Dummy actions, before API is ready TODO
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthState>) => action.payload,
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
    dashboardNavigate: (state, action: PayloadAction<View>) => {
      state.navigation.view = action.payload
    }
  },
})

// selectors
export const selectTokens = (state: RootState) => state.auth.tokens
export const selectAuthenticated = (state: RootState) => state.auth.authenticated
export const selectAuthInfo = (state: RootState) => state.auth.info
export const selectRoleNavigation = (state: RootState) => state.auth.navigation

// Action creators are generated for each case reducer function
export const {
  setAuthState,
  setRefreshToken,
  setAccessToken,
  setLoginInfo,
  logout,
  dashboardNavigate
} = authSlice.actions

export default authSlice.reducer