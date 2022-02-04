import {GetForumThreadDetailResponse} from './GetForumThreadDetail';

export interface GetForumThreadSingle extends GetForumThreadDetailResponse {
  id: number;
  topic: string;
  description: string;
  createdDate: Date;
  createdByFarmer: string;
  commentsCount: number;
}

export interface GetForumThreadResponse extends Array<GetForumThreadSingle> {
}