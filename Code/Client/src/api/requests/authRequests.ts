import {noAuthAPI, tokenAPI} from '../api';
import {endpoints} from '../../values/endpoints';
import {AxiosResponse} from 'axios';
import {CreateAccountFarmerRequest, CreateAccountFarmerResponse} from '../../model/api/CreateAccountFarmer';
import {useAPI} from '../apiHooks';
import {
  CreateAccountPolicyMakerRequest,
  CreateAccountPolicyMakerResponse
} from '../../model/api/CreateAccountPolicyMaker';
import {PostAccountLoginRequest, PostAccountLoginResponse} from '../../model/api/PostAccountLogin';
import {DeleteAccountRequest, DeleteAccountResponse} from '../../model/api/DeleteAccount';


export const authRequests = {
  refreshToken: (refreshToken: string): Promise<AxiosResponse> => (
    noAuthAPI.post<any>(endpoints.INVALID_REFRESH_TOKEN, {refresh: refreshToken})
  ),

  usePostCreateAccountFarmer: ():
    (values: CreateAccountFarmerRequest) => Promise<AxiosResponse<CreateAccountFarmerResponse>> => {
    const api = useAPI()
    return (values) =>
      api(noAuthAPI.post<CreateAccountFarmerResponse>(endpoints.POST_ACCOUNT_REGISTRATION_FARMER, values))
  },

  usePostCreateAccountPolicyMaker: ():
    (values: CreateAccountPolicyMakerRequest) => Promise<AxiosResponse<CreateAccountPolicyMakerResponse>> => {
    const api = useAPI()
    return (values) =>
      api(noAuthAPI.post<CreateAccountPolicyMakerResponse>(endpoints.POST_ACCOUNT_REGISTRATION_POLICY_MAKER, values))
  },

  usePostLogin: ():
    (values: PostAccountLoginRequest) => Promise<AxiosResponse<PostAccountLoginResponse>> => {
    const api = useAPI()
    return (values) =>
      api(noAuthAPI.post<PostAccountLoginResponse>(endpoints.POST_ACCOUNT_LOGIN, values))
  },

  useDeleteAccount: ():
    (values: DeleteAccountRequest, id: number) => Promise<AxiosResponse<DeleteAccountResponse>> => {
    const api = useAPI()
    return (values, id: number) =>
      api(tokenAPI.delete<DeleteAccountResponse>(
        endpoints.DELETE_ACCOUNT.replace(':id', String(id)),
        {data: values}
      ))
  },
}