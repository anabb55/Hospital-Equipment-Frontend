import { Company } from "./company.model";

export interface Equipment{
    id:number,
    name:string,
    description:string,
    type:string,
    grade:number,
    companies:Company[],

}