import store from '../store/store';
import {setAccessToken, setRefreshToken} from '../store/auth/authSlice';
import {authRequests} from './requests/authRequests';

/**
 * Send request to refresh token, and update Redux store accordingly.
 * @returns {Promise<string>} Promise with request response
 */
export const refreshAccessToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const refreshToken = store.getState().auth.tokens.refreshToken
    if (refreshToken) {
      authRequests.refreshToken(refreshToken)
        .then(response => {
          store.dispatch(setAccessToken(response.data.access))
          store.dispatch(setRefreshToken(response.data.refresh))
          resolve(response.data.access)
        })
        .catch(error => {
          reject(error)
        })
    } else {
      reject()
    }
  })
}