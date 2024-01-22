import { Time } from "@angular/common";
import { Address } from "./address.model";
import { Appointment } from "./appointment.model";
import { CompanyAdministrator } from "./companyAdministrator.model";
import { Equipment } from "./equipment.model";

export interface Company{
    id:number,
    name:string,
    address : Address,
    description: string,
    grade:number,
    workStartTime:Time,
    workEndTime: Time
}