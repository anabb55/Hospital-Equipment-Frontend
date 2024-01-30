import { Address } from "./address.model";
import { Company } from "./company.model";
import { User } from "./user.model";

export interface CompanyAdministrator extends User{
    company: Company | undefined,
   
}