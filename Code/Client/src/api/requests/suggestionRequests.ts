import {useAPILoadWithParams} from '../apiHooks';
import {tokenAPI} from '../api';
import {endpoints} from '../../values/endpoints';
import {GetSuggestionResponse} from '../../model/api/GetSuggestion';

export const suggestionRequests = {
  useGetSuggestions: (): [(GetSuggestionResponse | undefined), ((value: number) => void)] =>
    useAPILoadWithParams<number, GetSuggestionResponse>((id: number) =>
      tokenAPI.get<GetSuggestionResponse>(endpoints.GET_SUGGESTIONS.replace(':id', String(id)))),

}
