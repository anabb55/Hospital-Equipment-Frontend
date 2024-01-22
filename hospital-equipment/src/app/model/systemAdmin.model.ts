import { UserCategory } from "../feature-moduls/model/RegisteredUser";
import { User } from "./user.model";

export interface SystemAdmin extends User{
    userCategory: UserCategory;
}