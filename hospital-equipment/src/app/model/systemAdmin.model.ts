import { UserCategory } from "../feature-moduls/model/RegisteredUser";
import { Address } from "./address.model";
import { User } from "./user.model";

export interface SystemAdmin{
    id: number;
  email: String;
  password: String;
  firstname: String;
  lastname: String;
  username:String;
  phoneNumber: String;
  occupation: String;
  address: Address;
userCategory: UserCategory;
}