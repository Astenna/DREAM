import {useNavigate} from 'react-router';
import {useAppDispatch} from '../store/hooks';
import strings from '../values/strings';
import {notification} from 'antd';
import links from '../values/links';
import {logout} from '../store/auth/authSlice';

export const useLogout = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return () => {
    notification['warning']({message: strings.WARNING.LOGOUT})
    navigate(links.ROOT.URL)
    dispatch(logout())
  }
}
