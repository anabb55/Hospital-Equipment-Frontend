import { Address } from "src/app/model/address.model";

export interface CompanyAdmin {
  
    email:string,
    name:string,
    password:string,
    firstName:string,
    lastName:string,
    phoneNumber:string,
    occupation:string,
    enabled:boolean,
    address:Address,
    
  }
  