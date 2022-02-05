import {FarmerNote} from '../FarmerNote';

export interface GetFarmerSingle {
  id: number,
  farmerNameAndSurname: string,
  currentNote: FarmerNote,
  farmMandalName: string,
  helpRequestsCount: number
}

export interface GetFarmerResponse extends Array<GetFarmerSingle> {
}