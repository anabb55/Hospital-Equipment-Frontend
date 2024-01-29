import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Equipment } from './model/equipment.model';
import { environment } from 'src/env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Appointment } from 'src/app/model/appointment.model';
import { CanceledAppointment } from 'src/app/model/canceledAppointment.model';
import { Reservation } from 'src/app/model/reservation,model';
import { LocationAdress } from 'src/app/model/location.model';


@Injectable({
  providedIn: 'root',
})
export class PositionSimulatorService {
  constructor(private http: HttpClient) {}

  getLocation(id: number): Observable<LocationAdress[]> {
    console.log('ID je' + id);
    return this.http.get<LocationAdress[]>(
      `http://localhost:8081/api/companyAdministrators/createLocationList/${id}`
    );
  }

  sendMessageToExchange(locations: LocationAdress[]): Observable<any> {
    return this.http.post('http://localhost:8082/api/producer/myexchange/spring-boot2', locations);
  }
  


 
}
