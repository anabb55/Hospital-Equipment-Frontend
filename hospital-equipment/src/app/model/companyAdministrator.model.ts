import { Address } from "./address.model";
import { Company } from "./company.model";
import { User } from "./user.model";

export interface CompanyAdministrator{
    id: number;
    firstname: String;
    lastname: String;
    username: String;
    password: String;
    email: String;
    occupation: String;
    address: Address;
    phoneNumber: String;
    company: Company | undefined,
    waslogged: boolean
}