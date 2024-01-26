import { Component, OnInit } from '@angular/core';
import { CompanyAdmin } from '../model/companyAdmin.model';
import { RegisterCompanyService } from '../register-company-admin-service.service';
import { Address } from 'src/app/model/address.model';
import { CompanyAdministrator } from 'src/app/model/companyAdministrator.model';
import { Role } from 'src/app/model/userRole.model';

@Component({
  selector: 'app-create-company-admin',
  templateUrl: './create-company-admin.component.html',
  styleUrls: ['./create-company-admin.component.css']
})
export class CreateCompanyAdminComponent implements OnInit {

    constructor(private service:RegisterCompanyService){}
    ngOnInit(): void {
      this.service.getAllAddresses().subscribe({
        next:(result:Address[])=>{
          this.addresses = result;
        }
      })
    }
    addresses:Address[] =[] 
  adminData: CompanyAdministrator = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phoneNumber: '',
    occupation: '',
    username: '',
    address: {
      id: 0,
      city: '',
      country: '',
      street: '',
      number: '',
      longitude: 0,
      latitude: 0
    },
    id: 0,
    waslogged: false,

    company: undefined,
    roles: []
  };

  address:Address={
    id: 0,
    city: '',
    country: '',
    street: '',
    number: '',
    longitude:0,
    latitude:0
  }
  savedAddress:Address={
    id: 0,
    city: '',
    country: '',
    street: '',
    number: '',
    longitude:0,
    latitude:0
  }
role:Role={
  id: 2,
  name: 'ROLE_COMPANY_ADMIN'
}
  createdAdmin : CompanyAdministrator | undefined;

  createAdmin() {
    this.service.createAddress(this.address).subscribe({
      next:(result:Address)=>{
        this.savedAddress = result;
        this.adminData.address = this.savedAddress;
        this.adminData.roles.push(this.role);
        this.service.createCompanyAdmin(this.adminData).subscribe({
          next:(result:CompanyAdministrator)=>{
              this.createdAdmin =result;
              console.log("admin: "+ this.createdAdmin.firstname);
          }
        })
        console.log(this.savedAddress.city + "  " + this.savedAddress.country);
      },
      error: (err: any) => {
        console.log(err);
      },
    })


          
}




}
