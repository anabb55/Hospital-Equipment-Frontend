import { Component } from '@angular/core';
import { CompanyAdministrator } from 'src/app/model/companyAdministrator.model';
import { CompanyServiceService } from '../../company/service/company-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-admin-profile',
  templateUrl: './company-admin-profile.component.html',
  styleUrls: ['./company-admin-profile.component.css']
})
export class CompanyAdminProfileComponent {

  companyAdmin: CompanyAdministrator={
    id:0,
    company:null,
    email:'',
    password:'',
    firstName:'',
    lastName:'',
    phoneNumber:'',
    occupation:'',
    address: {
      id:0,
      street: '',
      city: '',
      country:'',
      number: '',
    },

    

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
  })
  constructor(private companyService: CompanyServiceService){
    this.getCompanyAdministrator();
  }

  getCompanyAdministrator(){
    this.companyService.getAdministratorById(1).subscribe({
      next:(response)=>{
        this.companyAdmin=response
        console.log('Admin ', this.companyAdmin)
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
     firstname: this.companyAdmin.firstName as string,
     lastname: this.companyAdmin.lastName as string,
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
    this.companyAdmin.email= this.inputForm.value.email as string;
    this.companyAdmin.password= this.inputForm.value.password as string;
    this.companyAdmin.address.city= this.inputForm.value.city as string;
    this.companyAdmin.address.country= this.inputForm.value.country as string;
    this.companyAdmin.address.street= this.inputForm.value.street as string;
    this.companyAdmin.address.number= this.inputForm.value.number as string;
    this.companyAdmin.firstName= this.inputForm.value.firstname as string;
    this.companyAdmin.lastName= this.inputForm.value.lastname as string;
    this.companyAdmin.phoneNumber= this.inputForm.value.phoneNumber as string;
    this.companyAdmin.occupation= this.inputForm.value.occupation as string;
   }
}
