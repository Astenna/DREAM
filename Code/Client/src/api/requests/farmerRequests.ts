import {GetFarmerResponse} from '../../model/api/GetFarmer';
import {useAPILoadOnRender} from '../apiHooks';
import {tokenAPI} from '../api';
import {endpoints} from '../../values/endpoints';
import {GetFarmerDetailResponse} from '../../model/api/GetFarmerDetail';

export const farmerRequests = {
  useGetFarmer: (): [(GetFarmerResponse | undefined), (() => void)] =>
    useAPILoadOnRender<GetFarmerResponse>(() =>
      tokenAPI.get<GetFarmerResponse>(endpoints.GET_FARMER)),
  useGetFarmerDetail: (id: number): [(GetFarmerDetailResponse | undefined), (() => void)] =>
    useAPILoadOnRender<GetFarmerDetailResponse>(() =>
      tokenAPI.get<GetFarmerDetailResponse>(endpoints.GET_FARMER + `/${id}/`)),
}