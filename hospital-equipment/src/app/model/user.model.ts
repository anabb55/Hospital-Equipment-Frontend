import { Address } from "./address.model";

export interface User {
  id?: number;
  email: String;
  password: String;
  firstName: String;
  lastName: String;
  phoneNumber: String;
  occupation: String;
  address: Address;
}
