import {Role} from '../../model/Role';
import {View} from '../../model/View';

export interface AuthStateInfo {
  email?: string,
  name?: string,
  surname?: string
}

export interface AuthStateNavigation {
  role?: Role,
  view?: View
}

export interface AuthState {
  authenticated: boolean,
  info: AuthStateInfo,
  navigation: AuthStateNavigation,
  tokens: {
    refreshToken?: string,
    accessToken?: string,
  }
}