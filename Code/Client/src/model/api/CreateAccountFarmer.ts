export interface CreateAccountFarmerRequest {
  name: string,
  surname: string,
  email: string,
  password: string,
  farmName?: string,
  farmAddressLine1: string,
  farmAddressLine2: string,
  farmCity: string,
  farmPostalCode: string,
  mandal: string,
  waterIrrigationSystemId: number,
  sensorSystemId: number,
}

export interface CreateAccountFarmerResponse {
  // empty payload
}