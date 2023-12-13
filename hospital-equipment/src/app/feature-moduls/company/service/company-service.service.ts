import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/env/environment.model';
import { Company } from 'src/app/model/company.model';
import { CompanyAdmin } from '../../model/companyAdmin.model';
import { CompanyAdministrator } from 'src/app/model/companyAdministrator.model';

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

  getAdministratorById(id:number): Observable<CompanyAdministrator>{
    return this.http.get<CompanyAdministrator>(environment.apiHost+'companyAdministrators/getById/'+id);
  }

  updateCompanyAdmin(companyAdmin: CompanyAdministrator):Observable<CompanyAdministrator>{
    return this.http.put<CompanyAdministrator>(environment.apiHost+'companyAdministrators/update/'+companyAdmin.id,companyAdmin)
  }

  getCompanyById(id:number):Observable<Company>{
    return this.http.get<Company>(environment.apiHost+ 'companyProfile/getById/'+ id);
   }

   searchCompanies(name: string, city: string): Observable<Company[]> {
    const params = new HttpParams()
      .set('name', name)
      .set('city', city);

    return this.http.get<Company[]>(environment.apiHost + 'companyProfile/search', { params });
  }

  searchCompaniesByRating(grade: number): Observable<Company[]> {
    const params = new HttpParams().set('grade', grade.toString());
    console.log("Rate je"+grade)
  
    return this.http.get<Company[]>(environment.apiHost + 'companyProfile/searchByRating', { params });
  }

  updateCompanyAdministrators(company:Company):Observable<Company>{
    return this.http.put<Company>(environment.apiHost + 'companyProfile/updateAdministrators',company);
  }

}
