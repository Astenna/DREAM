import axios, {AxiosInstance} from 'axios';
import {apiConfig} from '../config';
import store from '../store/store';
import {refreshAccessToken} from './tokenStorage';

export const createTokenAPI = (): AxiosInstance => {
  const API = axios.create()
  API.defaults.baseURL = apiConfig.url
  API.defaults.timeout = apiConfig.timeout

  API.interceptors.request.use(
    config => {
      const token = store.getState()?.auth?.tokens?.accessToken
      if (token && config && config?.headers) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config
    },
    error => Promise.reject(error)
  )

  API.interceptors.response.use(
    response => response,
    error => {
      // Error not because of expired token -> propagate error up
      if (error.response.status !== 401 || !store.getState().auth.authenticated) {
        return Promise.reject(error)
      } else {
        // Error due to incorrect token -> try to refresh access token
        return refreshAccessToken()
          // Refresh successful -> resend request
          .then(accessToken => {
            error.config.headers['Authorization'] = 'Bearer ' + accessToken;
            return axios.request(error.config)
          })
          // Refresh failed -> probably token expired -> send logout
          .catch(_ => {
            return Promise.reject('logout')
          })
      }
    }
  )

  return API
}

export const createNoAuthAPI = (): AxiosInstance => {
  const API = axios.create()
  API.defaults.baseURL = apiConfig.url
  API.defaults.timeout = apiConfig.timeout
  return API
}