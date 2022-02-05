import {ProblemType} from './GetProblemType';

export interface FarmerNote {
  id: number;
  note: string;
  problemTypeName: ProblemType | undefined | null;
  date: string;
  farmerId: number;
  farmer: string;
  policyMakerId: number;
  policyMaker: string;
}

export interface GetFarmerNoteResponse extends Array<FarmerNote> {
}