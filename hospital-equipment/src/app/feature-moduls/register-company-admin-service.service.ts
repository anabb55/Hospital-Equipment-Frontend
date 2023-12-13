import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyProfile } from './model/companyProfile.model';
import { Observable } from 'rxjs';
import { CompanyAdmin } from './model/companyAdmin.model';
import { Address } from '../model/address.model';
import { CompanyAdministrator } from '../model/companyAdministrator.model';
import { Company } from '../model/company.model';


@Injectable({
  providedIn: 'root'
})
export class RegisterCompanyService {

  constructor(private http: HttpClient) {
   }

   createCompany(company:CompanyProfile): Observable<Company> {
    return this.http.post<Company>( 'http://localhost:8081/api/companyProfile/save',company);
  }

  getAllCompanies(): Observable< CompanyProfile[]> {
    return this.http.get<CompanyProfile[]>( 'http://localhost:8081/api/companyProfile/');
  }
  createCompanyAdmin(admin:CompanyAdmin): Observable<CompanyAdmin> {
    return this.http.post<CompanyAdmin>( 'http://localhost:8081/api/companyAdministrators/save',admin);
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
  
}
