import { RegisteredUser } from "../feature-moduls/model/RegisteredUser";
import { Appointment } from "./appointment.model";
export enum ReservationStatus {
    'CANCELED',
    'TAKEN',
    'EXPIRED',
    'RESERVED',
    'REJECTED' }
export interface Reservation{
    id:number,
    appointment:Appointment,
    reservationStatus:ReservationStatus,
    penaltyPoints:number,
    registeredUserDTO:RegisteredUser

}