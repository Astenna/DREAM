export interface RequestResponse {
  id: number;
  message: string;
  createdOn: string;
  helpRequestId: number;
  createdByAgronomist: boolean | null;
  createdByFarmer: string
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
