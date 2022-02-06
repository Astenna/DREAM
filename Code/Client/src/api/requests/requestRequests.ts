import {GetRequestsResponse} from '../../model/api/GetRequest';
import {useAPI, useAPILoadWithParams} from '../apiHooks';
import {tokenAPI} from '../api';
import {endpoints} from '../../values/endpoints';
import {GetRequestDetailResponse} from '../../model/api/GetRequestDetail';
import {AxiosResponse} from 'axios';
import {PostHelpRequestRequest, PostHelpRequestResponse} from '../../model/api/PostHelpRequest';
import {PostHelpRequestAdviceRequest, PostHelpRequestAdviceResponse} from '../../model/api/PostHelpRequestAdvice';

export const requestRequests = {
  useGetFarmerRequests: (): [(GetRequestsResponse | undefined), ((value: number) => void)] =>
    useAPILoadWithParams<number, GetRequestsResponse>((id: number) =>
      tokenAPI.get<GetRequestsResponse>(endpoints.GET_FARMER_REQUESTS.replace(':id', String(id)))),

  useGetRequestsProvideHelp: (): [(GetRequestsResponse | undefined), ((value: number) => void)] =>
    useAPILoadWithParams<number, GetRequestsResponse>((id: number) =>
      tokenAPI.get<GetRequestsResponse>(endpoints.GET_REQUESTS_PROVIDE_HELP.replace(':id', String(id)))),

  useGetFarmerRequestDetail: (): [(GetRequestDetailResponse | undefined), ((value: number) => void)] =>
    useAPILoadWithParams<number, GetRequestDetailResponse>((id: number) =>
      tokenAPI.get<GetRequestDetailResponse>(endpoints.GET_FARMER_REQUEST_DETAIL.replace(':id', String(id)))),

  usePostHelpRequest: ():
    (values: PostHelpRequestRequest) => Promise<AxiosResponse<PostHelpRequestResponse>> => {
    const api = useAPI()
    return (values) =>
      api(tokenAPI.post<PostHelpRequestResponse>(endpoints.POST_FARMER_REQUEST, values))
  },

  usePostRequestAdvice: ():
    (values: PostHelpRequestAdviceRequest, id: number) => Promise<AxiosResponse<PostHelpRequestAdviceResponse>> => {
    const api = useAPI()
    return (values, id: number) =>
      api(tokenAPI.post<PostHelpRequestAdviceResponse>(endpoints.POST_REQUEST_ADVICE.replace(':id', String(id)), values))
  },

  useDeleteAdvice: ():
    (id: number) => Promise<AxiosResponse> => {
    const api = useAPI()
    return (id) =>
      api(tokenAPI.delete(
        endpoints.DELETE_ADVICE.replace(':id', String(id))))
  },

  useDeleteRequest: ():
    (id: number) => Promise<AxiosResponse> => {
    const api = useAPI()
    return (id) =>
      api(tokenAPI.delete(
        endpoints.DELETE_REQUEST.replace(':id', String(id))))
  },

}