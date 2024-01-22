import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyProfile } from './model/companyProfile.model';
import { Observable } from 'rxjs';
import { Address } from '../model/address.model';
import { CompanyAdministrator } from '../model/companyAdministrator.model';
import { Company } from '../model/company.model';
import { SystemAdmin } from '../model/systemAdmin.model';


@Injectable({
  providedIn: 'root'
})
export class RegisterCompanyService {

  constructor(private http: HttpClient) {
   }

   createCompany(company:CompanyProfile): Observable<Company> {
    return this.http.post<Company>( 'http://localhost:8081/api/companyProfile/save',company);
  }

  getAllCompanies(): Observable< Company[]> {
    return this.http.get<Company[]>( 'http://localhost:8081/api/companyProfile/');
  }
  createCompanyAdmin(admin:CompanyAdministrator): Observable<CompanyAdministrator> {
    return this.http.post<CompanyAdministrator>( 'http://localhost:8081/api/companyAdministrators/save',admin);
  }
  updateCompanyAdmin(admin:CompanyAdministrator): Observable<CompanyAdministrator> {
    return this.http.put<CompanyAdministrator>( 'http://localhost:8081/api/companyAdministrators/update/'+ admin.id,admin);
  }
  getAllCompanyAdminsByCompanyId(id:number): Observable<CompanyAdministrator[]> {
    return this.http.get<CompanyAdministrator[]>( 'http://localhost:8081/api/companyAdministrators/getAllByCompany/'+id);
  }
  createAddress(address:Address): Observable<Address> {
    return this.http.post<Address>( 'http://localhost:8081/api/addresses/save',address);
  }

  getAllAddresses(): Observable< Address[]> {
    return this.http.get<Address[]>( 'http://localhost:8081/api/addresses/getAll');
  }
  
  getAllCompanyAdmins(): Observable< CompanyAdministrator[]> {
    return this.http.get<CompanyAdministrator[]>( 'http://localhost:8081/api/companyAdministrators/getAll');
  }
  createSystemAdmin(admin:SystemAdmin): Observable<SystemAdmin> {
    return this.http.post<SystemAdmin>( 'http://localhost:8081/api/systemAdmins/save',admin);
  }
  
}
