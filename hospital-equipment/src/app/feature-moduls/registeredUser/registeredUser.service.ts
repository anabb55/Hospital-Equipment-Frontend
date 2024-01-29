import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Equipment } from './model/equipment.model';
import { environment } from 'src/env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { DisplayProfile } from './displayProfile/displayProfile.component';
import { RegisteredUser } from '../model/RegisteredUser';
import { Appointment } from 'src/app/model/appointment.model';
import { CanceledAppointment } from 'src/app/model/canceledAppointment.model';
import { Reservation } from 'src/app/model/reservation,model';


@Injectable({
  providedIn: 'root',
})
export class RegisteredUserService {
  constructor(private http: HttpClient) {}

  getProfile(id: number): Observable<RegisteredUser> {
    console.log('ID je' + id);
    return this.http.get<RegisteredUser>(
      `http://localhost:8081/api/registeredUsers/getById/${id}`
    );
  }


  /* getProfileForUserWithId5(): Observable<RegisteredUser> {

  getReservationsQRForUser(userId: number, status?: string): Observable<any[]> {
    let url = `http://localhost:8081/api/reservation/qrCode/${userId}`;
    if (status) {
      url += `?status=${encodeURIComponent(status)}`; 
    }
    return this.http.get<any[]>(url);
  }

 /* getProfileForUserWithId5(): Observable<RegisteredUser> {

    return this.getProfile(5);
  }*/
  getFutureAppointments(idUser: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `http://localhost:8081/api/appointments/futureAppointment/${idUser}`
    );
  }

  getReservationsQRForUser(userId: number, status?: string): Observable<any[]> {
    let url = `http://localhost:8081/api/reservation/qrCode/${userId}`;
    if (status) {
      url += `?status=${encodeURIComponent(status)}`; 
    }
    return this.http.get<any[]>(url);
  }
  getTotalPrice(idAppointment: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8081/api/reservationEquipment/totalPrice/${idAppointment}`);

  }

  isStatusTaken(id: number): Observable<boolean> {
    console.log("id je" + id);
    return this.http.get<boolean>(`http://localhost:8081/api/reservation/isReservationTaken/${id}`);
  }
  
  
  


  updateProfile(
    profile: RegisteredUser,
    id: number
  ): Observable<RegisteredUser> {
    return this.http.put<RegisteredUser>(
      `http://localhost:8081/api/registeredUsers/update/${id}`,
      profile
    );
  }

  updatePenaltyPoints(
    id: number,
    appointment: Appointment
  ): Observable<RegisteredUser> {
    return this.http.put<RegisteredUser>(
      `http://localhost:8081/api/registeredUsers/updatePenaltyPoints/${id}`,
      appointment
    );
  }

  deleteReservationByAppointment(
    appointmentId: number
  ): Observable<Reservation> {
    return this.http.delete<Reservation>(
      `http://localhost:8081/api/reservation/deleteByAppointmentId/${appointmentId}`
    );
  }
}
