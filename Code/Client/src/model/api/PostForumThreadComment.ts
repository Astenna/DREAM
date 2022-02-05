export interface PostForumThreadCommentRequest {
  content: string;
}

export interface PostForumThreadCommentResponse {
  id: number;
  content: string;
  createdDate: Date;
  createdByFarmer: string;
  createdByFarmerId: number;
}