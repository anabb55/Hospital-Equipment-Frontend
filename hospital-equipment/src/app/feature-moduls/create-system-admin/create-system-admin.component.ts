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
    id:0,
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
    userCategory: UserCategory.Regular,
    waslogged:false
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
    console.log(this.adminData.userCategory);
          this.service.createSystemAdmin(this.adminData).subscribe({
            next:(result:SystemAdmin)=>{
                this.createdAdmin =result;
                console.log("admin: "+ this.createdAdmin.firstName);
            }
          })
}

}
