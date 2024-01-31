import { Address } from "./address.model";
import { Role } from "./userRole.model";

export interface User {
  id: number;
  email: String;
  password: String;
  firstname: String;
  lastname: String;
  username:String;
  phoneNumber: String;
  occupation: String;
  address: Address;
  waslogged:boolean,
  roles:Role[]
}
