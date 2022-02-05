import {RequestAdvice} from './GetRequestDetail';

export interface PostHelpRequestAdviceRequest {
  message: string;
}

export interface PostHelpRequestAdviceResponse extends RequestAdvice {
}