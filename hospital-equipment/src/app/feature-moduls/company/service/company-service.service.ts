import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/env/environment.model';
import { Company } from 'src/app/model/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  constructor(private http:HttpClient) { }

  getAllCompanies():Observable<Company[]>{
   return this.http.get<Company[]>(environment.apiHost+ 'companyProfile/');
  }

  getCompanyByAdmin(id:number):Observable<Company[]>{
    return this.http.get<Company[]>(environment.apiHost+ 'companyProfile/byAdmin/' + id)
      
  }

  updateCompany(company:Company): Observable<Company>{
    console.log('Poslata u servis',company)
    return this.http.put<Company>(environment.apiHost+'companyProfile/update/'+company.id, company)
  }
}
