import {PostForumThreadCommentResponse} from './PostForumThreadComment';

export interface GetForumThreadDetailResponse {
  id: number;
  topic: string;
  description: string;
  createdDate: Date;
  createdByFarmer: string;
  comments?: PostForumThreadCommentResponse[];
}