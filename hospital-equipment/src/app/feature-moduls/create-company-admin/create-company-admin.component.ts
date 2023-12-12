import { Component } from '@angular/core';
import { CompanyAdmin } from '../model/companyAdmin.model';
import { RegisterCompanyService } from '../register-company-admin-service.service';

@Component({
  selector: 'app-create-company-admin',
  templateUrl: './create-company-admin.component.html',
  styleUrls: ['./create-company-admin.component.css']
})
export class CreateCompanyAdminComponent {

  constructor(private service:RegisterCompanyService){}
  adminData: CompanyAdmin = {
    email: '',
    name: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    occupation: '',
    enabled: false,
    addressId:''
   };
   createdAdmin:CompanyAdmin | undefined;
  createAdmin() {
          this.service.createCompanyAdmin(this.adminData).subscribe({
            next:(result:CompanyAdmin)=>{
                
            }
          })
}
}
