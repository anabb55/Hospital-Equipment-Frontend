import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/env/environment.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Reservation } from 'src/app/model/reservation,model';
import { ReservationEquipmentStock } from 'src/app/model/reservation_equipment_stock.model';
import { RegisteredUser } from '../../model/RegisteredUser';
import { EquipmentStock } from 'src/app/model/equipment_stock.model';
import { LoyaltyProgram } from '../../model/LoyaltyProgram';
@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

 

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}


  getReservationsByCompany(companyId:number):Observable<ReservationEquipmentStock[]>{
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<ReservationEquipmentStock[]>(
      environment.apiHost + 'reservationEquipment/getByCompanyId/' + companyId,{headers}
    );
  }

  getAllReservations():Observable<Reservation[]>{
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Reservation[]>(
      environment.apiHost + 'reservation/getAll',{headers}
    );
  }

  updateReservationStatus(reservationId:number){
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<Reservation>(
      environment.apiHost + 'reservation/updateStatus/' + reservationId,{headers}
    );
  }

  updateReservationStatusToExpired(reservationId:number){
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<Reservation>(
      environment.apiHost + 'reservation/updateStatusToExpired/' + reservationId,{headers}
    );
  }

  updateEqStockAmount(amount:number,equipmentStockId:number,companyId:number){
    

    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    const url = `${environment.apiHost}equipmentStocks/update/${equipmentStockId}/${companyId}?amount=${amount}`;
    return this.http.post(url, {headers});
  }
  getReservationsUsersByCompany(companyId:number):Observable<RegisteredUser[]>{
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<RegisteredUser[]>(
      environment.apiHost + 'reservationEquipment/getUsersReserved/' + companyId,{headers}
    );
  }

  getReservationEquipmentStock(reservationId:number):Observable<ReservationEquipmentStock[]>{
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<ReservationEquipmentStock[]>(
      environment.apiHost + 'reservationEquipment/getByReservationId/' + reservationId,{headers}
    );
  }

  getEquipmentStock(id:number):Observable<EquipmentStock>{
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<EquipmentStock>(
      environment.apiHost + 'equipmentStocks/getById/' + id,{headers}
    );
  }


  getAllLoyaltyPrograms():Observable<LoyaltyProgram[]>{
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<LoyaltyProgram[]>(
      environment.apiHost + 'loyaltyProgram/findAll',{headers}
    );
  }

  updateLoyaltyProgram(id:number,winPoints:number,penaltyPoints:number):Observable<RegisteredUser>{
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<RegisteredUser>(
      environment.apiHost +'registeredUsers/updateLoyaltyProgram/' +id+ '/' + winPoints + '/' + penaltyPoints,{ headers }
    );
  }

   updateLoyaltyProgramBySystemAdmin(loyaltyProgram:LoyaltyProgram):Observable<LoyaltyProgram>{
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<LoyaltyProgram>(
      environment.apiHost +'loyaltyProgram/update',loyaltyProgram,{ headers }
    );
  }
} 
