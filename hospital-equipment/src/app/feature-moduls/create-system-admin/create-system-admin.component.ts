import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/model/address.model';
import { RegisterCompanyService } from '../register-company-admin-service.service';
import { SystemAdmin } from 'src/app/model/systemAdmin.model';
import { UserCategory } from '../model/RegisteredUser';

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
      number: ''
    },
    userCategory: UserCategory.Regular,
    username: ''
  }
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
      },
      error: (err: any) => {
        console.log(err);
      },
    })
          console.log("adesa: "+ this.adminData.address.id);
          this.service.createSystemAdmin(this.adminData).subscribe({
            next:(result:SystemAdmin)=>{
                this.createdAdmin =result;
                
          
            }
          })
}

}
