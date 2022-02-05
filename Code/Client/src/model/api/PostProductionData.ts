import {ProductionType} from './GetProductionDataProductionTypes';
import {GetFarmProductionDataSingle} from './GetProductionData';

export interface PostProductionDataRequest {
  amount: number,
  date: string,
  productionType: ProductionType
}

export interface PostProductionDataResponse extends GetFarmProductionDataSingle {
}