import { Component } from '@angular/core';
import { CompanyAdmin } from '../model/companyAdmin.model';

@Component({
  selector: 'app-create-company-admin',
  templateUrl: './create-company-admin.component.html',
  styleUrls: ['./create-company-admin.component.css']
})
export class CreateCompanyAdminComponent {

  adminData: CompanyAdmin = {
    email: '',
    name: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    occupation: '',
    enabled: false,
    adress: {
      country: '',
      city: '',
      number: '',
      street: ''
    }
   }
  createAdmin() {
    
}
}
