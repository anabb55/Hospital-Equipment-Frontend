import { Time } from "@angular/common";
import { Company } from "./company.model";
import { CompanyAdministrator } from "./companyAdministrator.model";
export enum AppointmentStatus {
'PREDEFINED',
'EXTRAORDINARY',
'TAKEN'  }

export interface Appointment{
    "id":   number,
    "date": Date,
    "endTime": Time,
    "startTime": Time,
    "appointmentStatus": AppointmentStatus,
    "administrator": CompanyAdministrator
}