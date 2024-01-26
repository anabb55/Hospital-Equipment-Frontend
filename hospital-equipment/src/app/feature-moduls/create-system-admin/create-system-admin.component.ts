import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/model/address.model';
import { RegisterCompanyService } from '../register-company-admin-service.service';
import { SystemAdmin } from 'src/app/model/systemAdmin.model';
import { UserCategory } from '../model/RegisteredUser';
import { Role } from 'src/app/model/userRole.model';

@Component({
  selector: 'app-create-system-admin',
  templateUrl: './create-system-admin.component.html',
  styleUrls: ['./create-system-admin.component.css']
})
export class CreateSystemAdminComponent implements OnInit{

  constructor(private service:RegisterCompanyService){}

  addresses:Address[] =[] 

  adminData:SystemAdmin={
    id: 0,
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phoneNumber: '',
    occupation: '',
    address: {
      id: 0,
      city: '',
      country: '',
      street: '',
      number: '',
      longitude: 0,
      latitude: 0
    },
    userCategory: UserCategory.Regular,

    username: '',
    waslogged: false,
    roles: [] = []
  }
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

  role:Role= {
    id: 3,
    name: 'ROLE_SYSTEM_ADMIN'
  }
  ngOnInit(): void {
    this.service.getAllAddresses().subscribe({
      next:(result:Address[])=>{
        this.addresses = result;
      }
    })
  }

  createdAdmin : SystemAdmin | undefined;
  createAdmin() {
    this.service.createAddress(this.address).subscribe({
      next:(result:Address)=>{
        this.savedAddress = result;
        this.adminData.address = this.savedAddress;
        console.log(this.savedAddress.city + "  " + this.savedAddress.country);
        console.log("adesa: "+ this.adminData.address.id);
        this.adminData.roles.push(this.role);
          this.service.createSystemAdmin(this.adminData).subscribe({
            next:(result:SystemAdmin)=>{
                this.createdAdmin =result;
                
          
            }
          })
      },
      error: (err: any) => {
        console.log(err);
      },
    })
          
}

}
