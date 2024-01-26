import { Component } from '@angular/core';
import { CompanyAdministrator } from 'src/app/model/companyAdministrator.model';
import { CompanyServiceService } from '../../company/service/company-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-admin-profile',
  templateUrl: './company-admin-profile.component.html',
  styleUrls: ['./company-admin-profile.component.css']
})
export class CompanyAdminProfileComponent {

  companyAdmin: CompanyAdministrator={
    id: 0,
    company: {
      id: 0,
      name: '',
      address: {
        id: 0,
        city: '',
        country: '',
        street: '',
        number: '',
        longitude:0,
        latitude:0
      },
      description: '',
      grade: 0,
      workStartTime: {
        hours: 0,
        minutes: 0
      },
      workEndTime: {
        hours: 0,
        minutes: 0
      }
    },
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phoneNumber: '',
    occupation: '',
    address: {
      id: 0,
      street: '',
      city: '',
      country: '',
      number: '',
      longitude:0,
      latitude:0
    },

    waslogged: false,
    username: '',

  }

  inputForm= new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
    street: new FormControl('',[Validators.required]),
    number: new FormControl('',[Validators.required]),
    firstname: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    phoneNumber: new FormControl('',[Validators.required]),
    occupation: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required]),
  })

  passForm= new FormGroup({
    password: new FormControl('',[Validators.required])
  })

  loggedInUser:number=0;
  constructor(private companyService: CompanyServiceService, private authService: AuthServiceService,private router:Router){
    this.loggedInUser=this.getLoggedIn();
    this.getCompanyAdministrator();
    this.authService.passChangeSource.next(true);
  }

  getLoggedIn():number{
    return this.authService.getUserIdd();
  }
  getCompanyAdministrator(){
    this.companyService.getAdminById(this.loggedInUser).subscribe({
      next:(response)=>{
       this.companyAdmin=response
        console.log('Admin ', response)
        this.fillInputForm();
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  fillInputForm(){
    this.inputForm.patchValue({

     email:this.companyAdmin.email  as string,
     password: this.companyAdmin.password as string,
     city: this.companyAdmin.address.city as string,
     country:this.companyAdmin.address.country as string ,
     street:this.companyAdmin.address.street as string,
     number: this.companyAdmin.address.number as string ,
     firstname: this.companyAdmin.firstname as string,
     lastname: this.companyAdmin.lastname as string,
     username: this.companyAdmin.username as string,
     phoneNumber:this.companyAdmin.phoneNumber as string,
     occupation: this.companyAdmin.occupation as string,
   });
   console.log(this);
   }

   edit(){
    this.setUpdatedFields();
    this.companyService.updateCompanyAdmin(this.companyAdmin).subscribe({
      next:(response)=>{
        console.log('Apdejtovani', response);
      },
      error:(err)=>{
        console.log(err)
      }
    })

   }

   setUpdatedFields(){
    this.companyAdmin.id=this.loggedInUser;
    this.companyAdmin.email= this.inputForm.value.email as string;
    this.companyAdmin.password= this.inputForm.value.password as string;
    this.companyAdmin.address.city= this.inputForm.value.city as string;
    this.companyAdmin.address.country= this.inputForm.value.country as string;
    this.companyAdmin.address.street= this.inputForm.value.street as string;
    this.companyAdmin.address.number= this.inputForm.value.number as string;
    this.companyAdmin.firstname= this.inputForm.value.firstname as string;
    this.companyAdmin.lastname= this.inputForm.value.lastname as string;
    this.companyAdmin.phoneNumber= this.inputForm.value.phoneNumber as string;
    this.companyAdmin.occupation= this.inputForm.value.occupation as string;
    this.companyAdmin.username= this.inputForm.value.username as string;
   
   }

   changePassword(){
    this.router.navigate(['changePassword/'+this.loggedInUser]);
   }
}
