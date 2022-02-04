import {ProblemType} from './GetProblemType';
import {FarmerNote} from './GetFarmerNote';

export interface PostFarmerNoteRequest {
  note: string; //TODO
  problemType: ProblemType;
}

export interface PostFarmerNoteResponse extends FarmerNote {
}