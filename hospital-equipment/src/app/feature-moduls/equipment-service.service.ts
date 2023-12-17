import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipment } from '../model/equipment.model';
import { Observable } from 'rxjs';
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentServiceService {

  constructor(private http: HttpClient) { }

  getAllEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>( 'http://localhost:8081/api/equipments/findAll');
  }

  getCompaniesForEquipment(equipment:Equipment): Observable<Company[]> {
    return this.http.get<Company[]>( 'http://localhost:8081/api/companyProfile/byEquipment/'+equipment.id);
  }
}
