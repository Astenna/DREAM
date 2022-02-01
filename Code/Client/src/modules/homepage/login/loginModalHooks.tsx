import {useAppDispatch} from '../../../store/hooks';
import {useState} from 'react';
import {authRequests} from '../../../api/requests/authRequests';
import {PostAccountLoginRequest} from '../../../model/api/PostAccountLogin';
import {setAuthState} from '../../../store/auth/authSlice';
import {Role} from '../../../model/Role';

export const useDecryptJWT = (): any =>
  (token: string): any => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

/**
 * Hook for handling login request. Obtains user info and new token pair.
 */
export const useLogin =
  (setModalVisible: (value: boolean) => void):
    [((v: PostAccountLoginRequest) => void), boolean, ((v: boolean) => void)] => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const postLogin = authRequests.usePostLogin()
    const decryptJWT = useDecryptJWT()

    const roleMapping: { [key: string]: Role; } = {
      'PolicyMaker': Role.POLICY_MAKER,
      'Farmer': Role.FARMER,
    }

    const login = (loginRequest: PostAccountLoginRequest) => {
      if (loading) {
        return
      }
      console.log(loginRequest) //TODO: delete this line
      setLoading(true)
      postLogin(loginRequest)
        .then(response => {
          setModalVisible(false)
          const jwtInfo = decryptJWT(response.data.accessToken)
          dispatch(setAuthState({
            authenticated: true,
            info: {
              email: jwtInfo.email,
              name: jwtInfo.name,
              surname: jwtInfo.surname,
            },
            navigation: {
              role: roleMapping[jwtInfo.role as string] as Role,
              view: "dashboard"
            },
            tokens: {
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken === null ? undefined : response.data.refreshToken,
            }
          }))
        })
        .catch(_ => {
        })
        .finally(() => setLoading(false))
    }

    return [login, loading, setLoading]
  }