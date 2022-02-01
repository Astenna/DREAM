import {noAuthAPI} from '../api';
import {endpoints} from '../../values/endpoints';
import {GetMandalsResponse, GetMandalsResponseItem} from '../../model/api/GetMandals';
import {useAPILocalStringSearch} from '../apiHooks';


export const mandal = {
  useGetMandals: (): [GetMandalsResponse, (searchString: string) => void] =>
    useAPILocalStringSearch<GetMandalsResponseItem>(
      () => noAuthAPI.get<GetMandalsResponse>(endpoints.GET_MANDALS)),
}