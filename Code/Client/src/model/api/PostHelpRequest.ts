import {GetRequestDetailResponse} from './GetRequestDetail';

export interface PostHelpRequestRequest {
  topic: string;
  description: string;
}

export interface PostHelpRequestResponse extends GetRequestDetailResponse {
}