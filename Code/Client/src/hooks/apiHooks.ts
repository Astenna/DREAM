import {useNavigate} from 'react-router';
import {notification} from 'antd';
import {useAppDispatch} from '../store/hooks';
import {logout} from '../store/auth/authSlice';
import strings from '../values/strings';
import {AxiosError, AxiosResponse} from 'axios';
import links from '../values/links';
import {ApplicationError} from '../model/ApplicationError';

/**
 * Hook for default API error handling.
 */
export const useAPIHandleErrors = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isAxiosError = (error: AxiosError | ApplicationError): error is AxiosError =>
    (error as AxiosError).response !== undefined

  return (error: AxiosError | ApplicationError) => {
    if (isAxiosError(error)) {
      if (error.response?.status === 401 || error?.response?.status === 403) {
        navigate(links.NO_AUTHORIZED_403.URL)
      } else if (error?.response?.status === 404) {
        navigate(links.NOT_FOUND_404.URL)
      } else if (error?.response?.status === 429) {
        notification['error']({message: strings.ERROR.CHILL_FOR_A_MOMENT_429})
      } else if (error?.response?.status === 500) {
        navigate(links.SERVER_ERROR_500.URL)
        console.error(error)
        // } else if (error?.response?.data?.detail) { //TODO
        //   notification['error']({message: error?.response?.data?.detail})
      } else {
        notification['error']({message: error.toString()})
      }
    } else {
      if (error.type === 'logout') {
        notification['warning']({message: error.message})
        dispatch(logout())
        navigate(links.ROOT.URL)
      }
    }
  }
}

/**
 * Hook for wrapping API requests with default error handling.
 */
export const useAPI = () => {
  const handleError = useAPIHandleErrors()

  return <T>(result: Promise<AxiosResponse<T>>) => result
      .then(response => Promise.resolve(response))
      .catch(error => {
          handleError(error)
          return Promise.reject(error)
        }
      )
};