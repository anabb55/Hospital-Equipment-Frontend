import { UserCategory } from "../feature-moduls/model/RegisteredUser";
import { Address } from "./address.model";
import { User } from "./user.model";

export interface SystemAdmin extends User{
   
userCategory: UserCategory;
}