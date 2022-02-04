import {GetForumThreadDetailResponse} from './GetForumThreadDetail';

export interface PostForumThreadRequest {
  topic: string;
  description: string;
}

export interface PostForumThreadResponse extends GetForumThreadDetailResponse {
}