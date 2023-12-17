import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/env/environment.model';
import { Company } from 'src/app/model/company.model';
import { CompanyAdmin } from '../../model/companyAdmin.model';
import { CompanyAdministrator } from 'src/app/model/companyAdministrator.model';
import { Equipment } from 'src/app/model/equipment.model';

import { Appointment } from 'src/app/model/appointment.model';
import { Reservation } from 'src/app/model/reservation,model';

import { EquipmentStock } from '../../model/equipmentStock.model';

import { ReservationEquipmentStock } from 'src/app/model/reservation_equipment_stock.model';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class CompanyServiceService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(environment.apiHost + 'companyProfile/');
  }

  getCompanyByAdmin(id: number): Observable<Company[]> {
    return this.http.get<Company[]>(
      environment.apiHost + 'companyProfile/byAdmin/' + id
    );
  }

  updateCompany(company: Company): Observable<Company> {
    console.log('Poslata u servis', company);
    return this.http.put<Company>(
      environment.apiHost + 'companyProfile/update/' + company.id,
      company
    );
  }

  getAdministratorById(id: number): Observable<CompanyAdministrator> {
    return this.http.get<CompanyAdministrator>(
      environment.apiHost + 'companyAdministrators/getById/' + id
    );
  }

  updateCompanyAdmin(
    companyAdmin: CompanyAdministrator
  ): Observable<CompanyAdministrator> {
    return this.http.put<CompanyAdministrator>(
      environment.apiHost + 'companyAdministrators/update/' + companyAdmin.id,
      companyAdmin
    );
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(
      environment.apiHost + 'companyProfile/getById/' + id
    );
  }

  getEquipmentByCompanyId(companyId: number): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(
      `${environment.apiHost}companyProfile/company/${companyId}/equipment`
    );
  }

  searchCompanies(name: string, city: string): Observable<Company[]> {
    const params = new HttpParams().set('name', name).set('city', city);

    return this.http.get<Company[]>(
      environment.apiHost + 'companyProfile/search',
      { params }
    );
  }

  searchEquipmentByName(
    name: string,
    companyId: number
  ): Observable<Equipment[]> {
    const url = `${environment.apiHost}companyProfile/equipment/${companyId}/search`;
    const params = { name: name };
    return this.http.get<Equipment[]>(url, { params: params });
  }

  searchCompaniesByRating(grade: number): Observable<Company[]> {
    const params = new HttpParams().set('grade', grade.toString());
    console.log('Rate je' + grade);

    return this.http.get<Company[]>(
      environment.apiHost + 'companyProfile/searchByRating',
      { params }
    );
  }

  updateCompanyAdministrators(company: Company): Observable<Company> {
    return this.http.put<Company>(
      environment.apiHost + 'companyProfile/updateAdministrators',
      company
    );
  }

  getAppointmentsByCompany(id: number): Observable<Appointment[]> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    const apiUrl = `${environment.apiHost}appointments/getAppointmentsForCompany/${id}`;
    return this.http.get<Appointment[]>(apiUrl, { headers });
  }

  generateRandomAppointments(
    companyId: number,
    date: Date
  ): Observable<Appointment[]> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    const apiUrl = `${
      environment.apiHost
    }appointments/generateRandomAppointments/${companyId}?date=${date.toISOString()}`;
    return this.http.get<Appointment[]>(apiUrl, { headers });
  }

  saveAppointment(companyId: number, appointmentDTO: any): Observable<any> {
    const url = `${environment.apiHost}appointments/create/${companyId}`;
    return this.http.post(url, appointmentDTO);
  }

  createReservationPredefined(
    appointment: Appointment,
    userId: number
  ): Observable<Reservation> {
    const token = this.jwtHelper.tokenGetter();

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post<Reservation>(
      `http://localhost:8081/api/reservation/createReservationPredefined/${userId}`,
      appointment,
      { headers }
    );
  }

  updateStatus(id: number, appointment: Appointment): Observable<Appointment> {
    const token = this.jwtHelper.tokenGetter();
    console.log(this.jwtHelper.decodeToken());
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<Appointment>(
      `http://localhost:8081/api/appointments/update/${id}`,
      appointment,
      { headers }
    );
  }

  sendQRCode(): Observable<any> {
    const token = this.jwtHelper.tokenGetter();
    console.log(this.jwtHelper.decodeToken());
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(
      `http://localhost:8081/api/reservation/sendEmailWithQRCode`,

      { headers }
    );
  }

  makeReservation(
    reservationDTO: Reservation,
    id: number
  ): Observable<Reservation> {
    const token = this.jwtHelper.tokenGetter();

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post<Reservation>(
      `http://localhost:8081/api/reservation/createReservation/${id}`,
      reservationDTO,
      { headers }
    );
  }
  //returns all equipment that Company doesn't possess
  getAvailableEquipmentForCompany(companyId: number): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(
      environment.apiHost + 'equipments/findAvailable/' + companyId
    );
  }

  processReservation(
    reservationEquipmentStockDTO: ReservationEquipmentStock,
    stocks: Equipment[],
    companyId: number
  ): Observable<any> {
    const requestData = {
      reservationEquipmentStockDTO: reservationEquipmentStockDTO,
      stocks: stocks,
      companyId: companyId,
    };
    console.log(requestData);

    const url = `${environment.apiHost}reservationEquipment/processReservation`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, requestData, { headers });
  }

  addEquipmentToCompany(
    equipmentStock: EquipmentStock
  ): Observable<EquipmentStock[]> {
    console.log('poslato', equipmentStock);
    return this.http.post<EquipmentStock[]>(
      environment.apiHost + 'equipmentStocks/create',
      equipmentStock
    );
  }

  //returns equipment that Company does possess
  getEquipmentForCompany(companyId: number): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(
      environment.apiHost + 'equipmentStocks/equipmentByCompany/' + companyId
    );
  }


  getEquipmentAmountForCompany(
    companyId: number,
    equipmentId: number
  ): Observable<number> {
    return this.http.get<number>(
      environment.apiHost +
        'equipmentStocks/equipmentAmount/' +
        companyId +
        '/' +
        equipmentId
    );
  }

  updateAmount(companyId: number, equipmentId: number, amount: number) {
    const url = `${environment.apiHost}equipmentStocks/update/${equipmentId}/${companyId}?amount=${amount}`;
    return this.http.post(url, {});
  }
  deleteEquipmentStock(companyId:number,equipmentId:number){
  
    return this.http.delete(environment.apiHost+ 'equipmentStocks/update/'+ companyId +'/' + equipmentId );
  }

  addApp(appointment:Appointment):Observable<Appointment>{
    return this.http.post<Appointment>(environment.apiHost+ 'appointments/createApp',appointment);

  }
}
