import {Role} from '../../model/Role';

export interface AuthStateInfo {
  role?: Role,
  email?: string,
  name?: string,
  surname?: string
}

export interface AuthState {
  authenticated: boolean,
  info: AuthStateInfo,
  tokens: {
    refreshToken?: string,
    accessToken?: string,
  }
}