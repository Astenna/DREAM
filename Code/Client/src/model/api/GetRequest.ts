export interface GetRequestsResponseSingle {
  id: number;
  topic: string;
  description: string;
  createdOn: string;
  isAutomatic: boolean;
  createdBy: string;
  helpResponsesCount: number;
}

export interface GetRequestsResponse extends Array<GetRequestsResponseSingle> {
}