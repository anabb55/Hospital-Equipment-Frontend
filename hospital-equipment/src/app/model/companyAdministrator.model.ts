import { Address } from "./address.model";
import { Company } from "./company.model";
import { User } from "./user.model";

export interface CompanyAdministrator{
    id: number;
    email: String;
    password: String;
    firstName: String;
    lastName: String;
    userName: String;
    phoneNumber: String;
    occupation: String;
    address: Address;
    company: Company | undefined,
    waslogged: boolean
}