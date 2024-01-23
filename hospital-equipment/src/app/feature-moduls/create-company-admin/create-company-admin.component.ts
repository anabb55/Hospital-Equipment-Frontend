import { Component, OnInit } from '@angular/core';
import { CompanyAdmin } from '../model/companyAdmin.model';
import { RegisterCompanyService } from '../register-company-admin-service.service';
import { Address } from 'src/app/model/address.model';
import { CompanyAdministrator } from 'src/app/model/companyAdministrator.model';

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
    firstName: '',
    lastName: '',
    phoneNumber: '',
    occupation: '',
    address: {
      id: 0,
      city: '',
      country: '',
      street: '',
      number: ''
    },
    id: 0,
    waslogged:false,

    company: undefined,
    userName: ''

  };

  address:Address={
    id: 0,
    city: '',
    country: '',
    street: '',
    number: ''
  }
  savedAddress:Address={
    id: 0,
    city: '',
    country: '',
    street: '',
    number: ''
  }

  createdAdmin : CompanyAdministrator | undefined;

  createAdmin() {
    this.service.createAddress(this.address).subscribe({
      next:(result:Address)=>{
        this.savedAddress = result;
        this.adminData.address = this.savedAddress;
        console.log(this.savedAddress.city + "  " + this.savedAddress.country);
      },
      error: (err: any) => {
        console.log(err);
      },
    })

    console.log("adesa: "+ this.adminData.address.id);

          this.service.createCompanyAdmin(this.adminData).subscribe({
            next:(result:CompanyAdministrator)=>{
                this.createdAdmin =result;
                console.log("admin: "+ this.createdAdmin.firstName);
            }
          })
}




}
