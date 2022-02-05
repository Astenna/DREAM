import {ProblemType} from './GetProblemType';
import {FarmerNote} from './GetFarmerNote';

export interface PostFarmerNoteRequest {
  note: FarmerNote;
  problemTypeName: ProblemType;
}

export interface PostFarmerNoteResponse extends FarmerNote {
}