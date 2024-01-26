import { User } from "../feature-moduls/model/User";
import { Appointment } from "./appointment.model";
export enum ReservationStatus {
    'CANCELED',
    'TAKEN',
    'EXPIRED',
    'RESERVED',
    'REJECTED' }
export interface Reservation{
    id:number,
    appointmentDTO:Appointment,
    reservationStatus:ReservationStatus,
    penaltyPoints:number,
    registeredUserDTO:User
}