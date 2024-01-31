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
import { Time } from '@angular/common';

import { CanceledAppointment } from 'src/app/model/canceledAppointment.model';

import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyServiceService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  getAllCompanies(): Observable<Company[]> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Company[]>(environment.apiHost + 'companyProfile/', {
      headers,
    });
  }

  getCompanyByAdmin(id: number): Observable<Company[]> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Company[]>(
      environment.apiHost + 'companyProfile/byAdmin/' + id,
      { headers }
    );
  }

  updateCompany(company: Company): Observable<Company> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    console.log('Poslata u servis', company);
    return this.http.put<Company>(
      environment.apiHost + 'companyProfile/update/' + company.id,
      company,
      { headers }
    );
  }

  getAdministratorById(id: number): Observable<CompanyAdministrator> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<CompanyAdministrator>(
      environment.apiHost + 'companyAdministrators/getById/' + id,
      { headers }
    );
  }

  getUserById(id: number): Observable<User> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<User>(environment.apiHost + 'users/getById/' + id, {
      headers,
    });
  }

  updateCompanyAdmin(
    companyAdmin: CompanyAdministrator
  ): Observable<CompanyAdministrator> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });

    console.log('poslat u servis', companyAdmin);
    return this.http.put<CompanyAdministrator>(
      environment.apiHost + 'companyAdministrators/update/' + companyAdmin.id,
      companyAdmin,
      { headers }
    );
  }

  getCompanyById(id: number): Observable<Company> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });

    return this.http.get<Company>(
      environment.apiHost + 'companyProfile/getById/' + id,
      { headers }
    );
  }

  getEquipmentByCompanyId(companyId: number): Observable<Equipment[]> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Equipment[]>(
      `${environment.apiHost}companyProfile/company/${companyId}/equipment`,
      { headers }
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
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
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
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<Company>(
      environment.apiHost + 'companyProfile/updateAdministrators',
      company,
      { headers }
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

  getTakenAppointmentsByCompany(id: number): Observable<Appointment[]> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    const apiUrl = `${environment.apiHost}appointments/getTakenAppointmentsForCompany/${id}`;
    console.log(
      'Vraceni: ' + this.http.get<Appointment[]>(apiUrl, { headers })
    );
    return this.http.get<Appointment[]>(apiUrl, { headers });
  }

  getAllAppointment(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      environment.apiHost + 'appointments/getAll'
    );
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

  updateStatus(
    id: number,
    appointment: Appointment,
    userId: number
  ): Observable<Appointment> {
    const token = this.jwtHelper.tokenGetter();
    console.log(this.jwtHelper.decodeToken());
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<Appointment>(
      `http://localhost:8081/api/reservation/update/${id}/${userId}`,
      appointment,
      { headers }
    );
  }

  cancelAppointment(
    id: number,
    appointment: Appointment,
    userId: number
  ): Observable<Appointment> {
    const token = this.jwtHelper.tokenGetter();
    console.log(this.jwtHelper.decodeToken());
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<Appointment>(
      `http://localhost:8081/api/appointments/update/${id}/${userId}`,
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
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Equipment[]>(
      environment.apiHost + 'equipments/findAvailable/' + companyId,
      { headers }
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
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    console.log('poslato', equipmentStock);
    return this.http.post<EquipmentStock[]>(
      environment.apiHost + 'equipmentStocks/create',
      equipmentStock,
      { headers }
    );
  }

  //returns equipment that Company does possess
  getEquipmentForCompany(companyId: number): Observable<Equipment[]> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Equipment[]>(
      environment.apiHost + 'equipmentStocks/equipmentByCompany/' + companyId,
      { headers }
    );
  }

  getEquipmentAmountForCompany(
    companyId: number,
    equipmentId: number
  ): Observable<number> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<number>(
      environment.apiHost +
        'equipmentStocks/equipmentAmount/' +
        companyId +
        '/' +
        equipmentId,
      { headers }
    );
  }

  updateAmount(companyId: number, equipmentId: number, amount: number) {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    const url = `${environment.apiHost}equipmentStocks/update/${equipmentId}/${companyId}?amount=${amount}`;
    return this.http.post(url, { headers });
  }
  deleteEquipmentStock(
    companyId: number,
    equipmentId: number
  ): Observable<number> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.delete<number>(
      environment.apiHost +
        'equipmentStocks/delete/' +
        companyId +
        '/' +
        equipmentId,
      { headers }
    );
  }

  addApp(
    date: string,
    startTime: string,
    endTime: string,
    adminId: number
  ): Observable<String> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post<String>(
      environment.apiHost +
        'appointments/createApp' +
        '/' +
        date +
        '/' +
        startTime +
        '/' +
        endTime +
        '/' +
        adminId,
      { headers }
    );
  }

  getAdminById(id: number): Observable<CompanyAdministrator> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<CompanyAdministrator>(
      environment.apiHost + 'companyAdministrators/getById/' + id,
      { headers }
    );
  }

  getCanceledAppointments(): Observable<CanceledAppointment[]> {
    return this.http.get<CanceledAppointment[]>(
      `http://localhost:8081/api/canceledAppointments/`
    );
  }

  sendFirstMessage(): Observable<String> {
    const message = 'helooooou bona';
    const queue = 'spring-boot1';
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<String>(
      environment.apiHost + 'producer/checkDelivery',
      { headers }
    );
  }

  getAllReservations(): Observable<Reservation[]> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });

    return this.http.get<Reservation[]>(
      environment.apiHost + 'reservation/getAll',
      { headers }
    );
  }

  checkExpiredReservations() {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });

    return this.http.put(
      environment.apiHost + 'reservation/checkExpiredReservations/',
      { headers }
    );
  }


  isAdminToCompany(companyId:number,adminId:number):Observable<Boolean>{
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    
    return this.http.get<Boolean>(
      environment.apiHost + 'companyProfile/isAdminToCompany/' + companyId+'/'+ adminId,{headers}
    );
  }

  isEquipmentReserved(companyId:number,eqId:number):Observable<Boolean>{
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    
    return this.http.get<Boolean>(
      environment.apiHost + 'reservationEquipment/isEquipmentReserved/' + eqId+'/'+ companyId,{headers}
    );
  }


}
