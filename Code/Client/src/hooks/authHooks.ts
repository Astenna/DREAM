// noinspection DuplicatedCode

import {useState} from 'react';
import {useAppDispatch} from '../store/hooks';
import {setAuthState} from '../store/auth/authSlice';
import {CreateAccountForm} from '../model/CreateAccountForm';
import {LoginForm} from '../model/LoginForm';
import {Role} from "../model/Role";

/**
 * Hook for handling login request. Obtains user info and new token pair.
 */
export const useLogin =
  (): [((v: LoginForm) => void), boolean, ((v: boolean) => void)] => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)

    const login = (loginForm: LoginForm) => {
      if (loading) {
        return
      }
      console.log(loginForm)
      setLoading(true)
      new Promise(((resolve, reject) => { //TODO replace with real request
        setTimeout(resolve, 800)
      })).then(response => {
        dispatch(setAuthState({
          authenticated: true,
          tokens: {
            accessToken: "",
            refreshToken: "",
          },
          info: {
            email: "dummy@dummy.com", //TODO
            name: "Bogdan",
            surname: "Z Indii"
          },
          navigation: {
            role: Role.FARMER,
            view: "dashboard",
          }
        }))
        setLoading(false)
      })
    }

    return [login, loading, setLoading]
  }

/**
 * Hook for register request. Create account and log in.
 * @returns {[register, boolean]}
 */
export const useCreateAccount =
  (): [((v: CreateAccountForm) => void), boolean, ((v: boolean) => void)] => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)

    const createAccount = (createAccountForm: CreateAccountForm) => {
      if (loading) {
        return
      }
      console.log(createAccountForm)
      setLoading(true)
      new Promise(((resolve, reject) => { //TODO replace with real request
        setTimeout(resolve, 800)
      })).then(response => {
        dispatch(setAuthState({
          authenticated: true,
          tokens: {
            accessToken: "",
            refreshToken: "",
          },
          info: {
            email: "dummy@dummy.com", //TODO
            name: "Bogdan",
            surname: "Z Indii"
          },
          navigation: {
            role: Role.FARMER,
            view: "dashboard",
          }
        }))
        setLoading(false)
      })
    }

    return [createAccount, loading, setLoading]
  }