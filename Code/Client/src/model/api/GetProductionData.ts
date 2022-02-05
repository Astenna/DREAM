import {ProductionType} from './GetProductionDataProductionTypes';

export interface GetFarmProductionDataSingle {
  id: number,
  amount: number,
  date: string,
  productionType: ProductionType
}

export interface GetProductionDataResponse extends Array<GetFarmProductionDataSingle> {
}