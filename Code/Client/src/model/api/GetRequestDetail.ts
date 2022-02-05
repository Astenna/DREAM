export interface RequestResponse {
  id: number;
  message: string;
  createdOn: string;
  helpRequestId: number;
  createdByAgronomist: string | null | undefined;
  createdByFarmer: string | null | undefined
}

export interface GetRequestDetailResponse {
  id: number;
  topic: string;
  description: string;
  createdOn: string;
  isAutomatic: false;
  createdBy: string;
  helpResponses: RequestResponse[]
}
