export interface GetFarmerSingle {
  id: number,
  farmerNameAndSurname: string,
  currentNote: number,
  farmMandalName: string,
  helpRequestsCount: number
}

export interface GetFarmerResponse extends Array<GetFarmerSingle> {
}