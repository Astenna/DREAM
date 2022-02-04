export interface GetFarmerDetailResponse {
  id: number;
  farmerNameAndSurname: string;
  farmerEmail: string;
  currentNote: number;
  farmMandalName: string;
  helpRequestsCount: number;
  farmAddressLine1: string;
  farmAddressLine2: string;
  farmCity: string;
  farmPostalCode: string;
}