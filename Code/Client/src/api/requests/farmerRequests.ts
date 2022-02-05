import {GetFarmerResponse} from '../../model/api/GetFarmer';
import {useAPI, useAPILoadOnRender, useAPILoadWithParams} from '../apiHooks';
import {tokenAPI} from '../api';
import {endpoints} from '../../values/endpoints';
import {GetFarmerDetailResponse} from '../../model/api/GetFarmerDetail';
import {GetProductionDataResponse} from '../../model/api/GetProductionData';
import {GetFarmerNoteResponse} from '../../model/api/GetFarmerNote';
import {GetRequestsResponse} from '../../model/api/GetRequest';
import {AxiosResponse} from 'axios';
import {PostFarmerNoteRequest, PostFarmerNoteResponse} from '../../model/api/PostFarmerNote';

export const farmerRequests = {
  useGetFarmerOnRender: (): [(GetFarmerResponse | undefined), (() => void)] =>
    useAPILoadOnRender<GetFarmerResponse>(() =>
      tokenAPI.get<GetFarmerResponse>(endpoints.GET_FARMER)),

  useGetFarmerDetail: (): [(GetFarmerDetailResponse | undefined), ((value: number) => void)] =>
    useAPILoadWithParams<number, GetFarmerDetailResponse>((id: number) =>
      tokenAPI.get<GetFarmerDetailResponse>(endpoints.GET_FARMER_DETAIL.replace(':id', String(id)))),

  useGetFarmerProductionData: (): [(GetProductionDataResponse | undefined), ((value: number) => void)] =>
    useAPILoadWithParams<number, GetProductionDataResponse>((id: number) =>
      tokenAPI.get<GetProductionDataResponse>(endpoints.GET_PRODUCTION_DATA.replace(':id', String(id)))),

  useGetFarmerNoteHistory: (): [(GetFarmerNoteResponse | undefined), ((value: number) => void)] =>
    useAPILoadWithParams<number, GetFarmerNoteResponse>((id: number) =>
      tokenAPI.get<GetFarmerNoteResponse>(endpoints.GET_FARMER_NOTE.replace(':id', String(id)))),

  useGetFarmerRequests: (): [(GetRequestsResponse | undefined), ((value: number) => void)] =>
    useAPILoadWithParams<number, GetRequestsResponse>((id: number) =>
      tokenAPI.get<GetRequestsResponse>(endpoints.GET_FARMER_REQUESTS.replace(':id', String(id)))),

  usePostFarmerNote: ():
    (values: PostFarmerNoteRequest, id: number) => Promise<AxiosResponse<PostFarmerNoteResponse>> => {
    const api = useAPI()
    return (values, id) =>
      api(tokenAPI.post<PostFarmerNoteResponse>(
        endpoints.POST_FARMER_NOTE.replace(':id', String(id)),
        values
      ))
  }

}