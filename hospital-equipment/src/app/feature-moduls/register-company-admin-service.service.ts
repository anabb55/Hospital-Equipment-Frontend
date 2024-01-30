import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyProfile } from './model/companyProfile.model';
import { Observable } from 'rxjs';
import { Address } from '../model/address.model';
import { CompanyAdministrator } from '../model/companyAdministrator.model';
import { Company } from '../model/company.model';
import { SystemAdmin } from '../model/systemAdmin.model';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class RegisterCompanyService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
   }

   createCompany(company:CompanyProfile): Observable<Company> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post<Company>( 'http://localhost:8081/api/companyProfile/save',company,{headers});
  }

  getAllCompanies(): Observable< Company[]> {
    return this.http.get<Company[]>( 'http://localhost:8081/api/companyProfile/');
  }
  createCompanyAdmin(admin:CompanyAdministrator): Observable<CompanyAdministrator> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post<CompanyAdministrator>( 'http://localhost:8081/api/companyAdministrators/save',admin,{headers});
  }
  updateCompanyAdmin(admin:CompanyAdministrator): Observable<CompanyAdministrator> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });


    return this.http.put<CompanyAdministrator>( 'http://localhost:8081/api/companyAdministrators/update/'+ admin.id,admin,{headers});
  }

  createAddress(address:Address): Observable<Address> {
    return this.http.post<Address>( 'http://localhost:8081/api/addresses/save',address);
  }

  getAllAddresses(): Observable< Address[]> {
    return this.http.get<Address[]>( 'http://localhost:8081/api/addresses/getAll');
  }
  
  getAllCompanyAdmins(): Observable< CompanyAdministrator[]> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<CompanyAdministrator[]>( 'http://localhost:8081/api/companyAdministrators/getAll',{headers});
  }
  createSystemAdmin(admin:SystemAdmin): Observable<SystemAdmin> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post<SystemAdmin>( 'http://localhost:8081/api/systemAdmins/save',admin,{headers});
  }
  
}
