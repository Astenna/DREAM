import {GetForumThreadResponse} from '../../model/api/GetForumThread';
import {useAPI, useAPILoadOnRender, useAPILoadWithParams} from '../apiHooks';
import {tokenAPI} from '../api';
import {endpoints} from '../../values/endpoints';
import {AxiosResponse} from 'axios';
import {PostForumThreadRequest, PostForumThreadResponse} from '../../model/api/PostForumThread';
import {GetForumThreadDetailResponse} from '../../model/api/GetForumThreadDetail';
import {PostForumThreadCommentRequest, PostForumThreadCommentResponse} from '../../model/api/PostForumThreadComment';
import {DeleteForumThreadCommentResponse} from '../../model/api/DeleteForumThreadComment';

export const forumRequests = {
  useGetForum: (): [(GetForumThreadResponse | undefined), (() => void)] =>
    useAPILoadOnRender<GetForumThreadResponse>(() =>
      tokenAPI.get<GetForumThreadResponse>(endpoints.GET_FORUM)),

  usePostForum: ():
    (values: PostForumThreadRequest) => Promise<AxiosResponse<PostForumThreadResponse>> => {
    const api = useAPI()
    return (values) =>
      api(tokenAPI.post<PostForumThreadResponse>(endpoints.POST_FORUM, values))
  },

  useGetFarmerRequestDetail: (): [(GetForumThreadDetailResponse | undefined), ((value: number) => void)] =>
    useAPILoadWithParams<number, GetForumThreadDetailResponse>((id: number) =>
      tokenAPI.get<GetForumThreadDetailResponse>(endpoints.GET_FORUM_DETAIL.replace(':id', String(id)))),

  usePostComment: ():
    (values: PostForumThreadCommentRequest, id: number) => Promise<AxiosResponse<PostForumThreadCommentResponse>> => {
    const api = useAPI()
    return (values, id: number) =>
      api(tokenAPI.post<PostForumThreadCommentResponse>(endpoints.POST_FORUM_THREAD_COMMENT.replace(':id', String(id)), values))
  },

  useDeleteComment: ():
    (id: number) => Promise<AxiosResponse<DeleteForumThreadCommentResponse>> => {
    const api = useAPI()
    return (id) =>
      api(tokenAPI.delete<DeleteForumThreadCommentResponse>(
        endpoints.DELETE_FORUM_COMMENT.replace(':id', String(id))))
  },
}