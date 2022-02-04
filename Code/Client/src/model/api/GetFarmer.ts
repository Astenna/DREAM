export interface GetFarmerSingle {
  id: number,
  farmerNameAndSurname: string,
  currentNote: string,
  farmMandalName: string,
  helpRequestsCount: number
}

export interface GetFarmerResponse extends Array<GetFarmerSingle> {
}