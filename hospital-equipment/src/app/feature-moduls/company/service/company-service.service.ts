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
import { JwtHelperService } from '@auth0/angular-jwt';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CompanyServiceService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(environment.apiHost + 'companyProfile/');
  }

  getCompanyByAdmin(id: number): Observable<Company[]> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Company[]>(
      environment.apiHost + 'companyProfile/byAdmin/' + id,{headers}
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
      company,{headers}
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
      environment.apiHost + 'companyAdministrators/getById/' + id,{headers}
    );
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
    return this.http.put<CompanyAdministrator>(
      environment.apiHost + 'companyAdministrators/update/' + companyAdmin.id,
      companyAdmin,{headers}
    );
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(
      environment.apiHost + 'companyProfile/getById/' + id
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
      `${environment.apiHost}companyProfile/company/${companyId}/equipment`,{headers}
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
      company,{headers}
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
      environment.apiHost + 'equipments/findAvailable/' + companyId,{headers}
    );
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
      equipmentStock,{headers}
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
      environment.apiHost + 'equipmentStocks/equipmentByCompany/' + companyId,{headers}
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
        equipmentId,{headers}
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
    return this.http.post(url, {headers});
  }
  deleteEquipmentStock(companyId:number,equipmentId:number):Observable<number>{
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.delete<number>(environment.apiHost+ 'equipmentStocks/delete/'+ companyId +'/' + equipmentId ,{headers});
  }

  addApp(date:string,startTime:string,endTime:string):Observable<Appointment>{
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post<Appointment>(environment.apiHost+ 'appointments/createApp'+ '/'+date+'/'+ startTime +'/'+endTime,{headers});

  }

  getAdminById(id: number): Observable<CompanyAdministrator> {
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<CompanyAdministrator>(
      environment.apiHost + 'companyAdministrators/getAdminById/' + id,{headers}
    );
  }
}
