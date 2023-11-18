import { Address } from "./Address";

export interface CompanyAdmin {
    email:string,
    name:string,
    password:string,
    firstName:string,
    lastName:string,
    phoneNumber:string,
    occupation:string,
    enabled:boolean,
    adress:Address
  }
  