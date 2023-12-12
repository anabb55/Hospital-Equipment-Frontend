import { Company } from "src/app/model/company.model";
import { Equipment } from "src/app/model/equipment.model";


export interface EquipmentStock{
    equipment: Equipment,
    company: Company,
    amount:number
}