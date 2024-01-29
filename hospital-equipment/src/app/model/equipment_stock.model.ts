import { Company } from "./company.model";
import { Equipment } from "./equipment.model";

export interface EquipmentStock{
    id:number,
    equipment:Equipment,
    companyDTO:Company,
    amount:number
}