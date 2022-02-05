import {GetRequestsResponse} from '../../model/api/GetRequest';
import {useAPI, useAPILoadWithParams} from '../apiHooks';
import {tokenAPI} from '../api';
import {endpoints} from '../../values/endpoints';
import {GetRequestDetailResponse} from '../../model/api/GetRequestDetail';
import {AxiosResponse} from 'axios';
import {PostHelpRequestRequest, PostHelpRequestResponse} from '../../model/api/PostHelpRequest';

export const requestRequests = {
  useGetFarmerRequests: (): [(GetRequestsResponse | undefined), ((value: number) => void)] =>
    useAPILoadWithParams<number, GetRequestsResponse>((id: number) =>
      tokenAPI.get<GetRequestsResponse>(endpoints.GET_FARMER_REQUESTS.replace(':id', String(id)))),

  useGetFarmerRequestDetail: (): [(GetRequestDetailResponse | undefined), ((value: number) => void)] =>
    useAPILoadWithParams<number, GetRequestDetailResponse>((id: number) =>
      tokenAPI.get<GetRequestDetailResponse>(endpoints.GET_FARMER_REQUEST_DETAIL.replace(':id', String(id)))),

  usePostProductionData: ():
    (values: PostHelpRequestRequest) => Promise<AxiosResponse<PostHelpRequestResponse>> => {
    const api = useAPI()
    return (values) =>
      api(tokenAPI.post<PostHelpRequestResponse>(endpoints.POST_FARMER_REQUEST, values))
  },

}