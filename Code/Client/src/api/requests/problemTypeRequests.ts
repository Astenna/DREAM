import {useAPILoadOnRender} from '../apiHooks';
import {tokenAPI} from '../api';
import {endpoints} from '../../values/endpoints';
import {GetProblemTypeResponse} from '../../model/api/GetProblemType';

export const problemTypeRequests = {
  useGetProblemTypesOnRender: (): [(GetProblemTypeResponse | undefined), (() => void)] =>
    useAPILoadOnRender<GetProblemTypeResponse>(() =>
      tokenAPI.get<GetProblemTypeResponse>(endpoints.GET_PROBLEM_TYPE))
}