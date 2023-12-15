import { Time } from "@angular/common";
import { Company } from "./company.model";
export enum AppointmentStatus {
'PREDEFINED',
'EXTRAORDINARY',
'TAKEN'  }

export interface Appointment{
    "id":   number,
    "date": Date,
    "duration": number,
    "startTime": Time,
    "company": Company,
    "appointmentStatus": AppointmentStatus,
    "administratorId": number
}