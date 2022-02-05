import {FarmerNote} from '../FarmerNote';

export interface GetFarmerDetailResponse {
  id: number;
  farmerNameAndSurname: string;
  farmerEmail: string;
  currentNote: FarmerNote;
  farmMandalName: string;
  helpRequestsCount: number;
  farmAddressLine1: string;
  farmAddressLine2: string;
  farmCity: string;
  farmPostalCode: string;
}