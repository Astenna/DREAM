import {Role} from './Role';

export interface CreateAccountForm {
  name: string,
  surname: string,
  email: string,
  password: string,
  role: Role,
  sensorID?: string,
  waterID?: string,
  address1?: string,
  address2?: string,
  city?: string,
  postalCode?: string,
  mandal?: string,
}