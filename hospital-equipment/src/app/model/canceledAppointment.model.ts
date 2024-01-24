import { Appointment } from './appointment.model';
import { User } from './user.model';

export interface CanceledAppointment {
  id: number;
  appointmentDTO: Appointment;
  userDTO: User;
}
