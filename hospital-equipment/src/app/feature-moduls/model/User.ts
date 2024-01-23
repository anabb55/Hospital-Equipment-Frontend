import { Address } from './Adress.model';

export interface User {
  id?: number;
  email: String;
  password: String;
  firstname: String;
  lastname: String;
  username: String;
  phoneNumber: String;
  occupation: String;
  address: Address;
  waslogged: boolean
}
