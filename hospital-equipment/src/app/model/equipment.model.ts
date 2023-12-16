import { Company } from "./company.model";

export interface Equipment{
    id:number,
    name:string,
    description:string,
    grade:number,
    companies:Company[],
    amount:number
}