import {createNoAuthAPI} from '../api';
import {endpoints} from '../../values/endpoints';
import {AxiosResponse} from 'axios';

const unauthorizedApi = createNoAuthAPI()

export const authRequests = {
  refreshToken: (refreshToken: string): Promise<AxiosResponse<{aaa: string}>> => (
    unauthorizedApi.post<any>(endpoints.REFRESH_TOKEN, {refresh: refreshToken})
  ) //TODO: precise type
}