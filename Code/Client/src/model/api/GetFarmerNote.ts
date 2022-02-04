import {ProblemType} from './GetProblemType';

export interface FarmerNote { //TODO
  id: number;
  note: string;
  problemTypeName: ProblemType | undefined | null;
  date: Date;
  farmerId: number;
  farmer: string;
  policyMakerId: number;
  policyMaker: string;
}

export interface GetFarmerNoteResponse extends Array<FarmerNote> {
}