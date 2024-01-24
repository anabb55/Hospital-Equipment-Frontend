import { Component, OnInit } from '@angular/core';
import { RegisterCompanyService } from '../register-company-admin-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyAdministrator } from 'src/app/model/companyAdministrator.model';
import { Company } from 'src/app/model/company.model';
import { Router } from '@angular/router';
import { Address } from 'src/app/model/address.model';

@Component({
  selector: 'app-register-company-profile',
  templateUrl: './register-company-profile.component.html',
  styleUrls: ['./register-company-profile.component.css']
})
export class RegisterCompanyProfileComponent implements OnInit {

  createdCompany: Company ={
    id: 0,
    name: '',
    address: {
      id: 0,
      city: '',
      country: '',
      street: '',
      number: ''
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
  }

  street: string = ''
  city: string = ''
  number: string = ''
  country: string = ''
  addedAdmin: CompanyAdministrator[]=[]
  addresses:Address[] =[] 
  address: Address = {
    id : 0,
    city: '',
    country: '',
    number: '',
    street: ''
  }

  company: Company = {
    name: '',
    description: '',
    grade: 0,
    address: {
      id: 0,
      street: '',
      city: '',
      number: '',
      country: ''
    },
    id: 0,
    workStartTime: {
      hours: 0,
      minutes: 0
    },
    workEndTime: {
      hours: 0,
      minutes: 0
    }
  };
  admins: CompanyAdministrator[] = []
  updatedAdmin :CompanyAdministrator={
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
    company: undefined,
    username: ''
  }
  savedAddress:Address | undefined
  constructor(private router:Router, private service:RegisterCompanyService,private _snackBar: MatSnackBar,){
    
  }
  ngOnInit(): void {
    this.service.getAllCompanyAdmins().subscribe({
      next:(result:CompanyAdministrator[])=>{
        this.admins = result;
        /*this.admins.forEach(admin => {
          console.log(admin.firstname);
          console.log("Id: " +admin.id);
          console.log("Lastname:" + admin.lastname);
          console.log("Firstname:" + admin.firstname);
          console.log("Email:" + admin.email);
          console.log("Phone:" + admin.phoneNumber);
          console.log("ocupp:" + admin.occupation);
          if(admin.company != undefined){
            console.log("company description:" + admin.company.description);
          }
          
          console.log("pass:" + admin.password);
          console.log("Adresa: " +admin.address.city);  
          
        });*/
      }
    })
    this.service.getAllAddresses().subscribe({
      next:(result:Address[])=>{
        this.addresses = result;
      }
    })
  }
 

  onSubmit() {
        this.service.createAddress(this.address).subscribe({
      next:(result:Address)=>{
        this.savedAddress = result;
        this.company.address = this.savedAddress;
        console.log(this.savedAddress.city + "  " + this.savedAddress.country);
      },
      error: (err: any) => {
        console.log(err);
      },
    })

    this.addedAdmin.forEach(admin => {
      this.service.updateCompanyAdmin(admin).subscribe({
      next:(result:CompanyAdministrator)=>{
        this.updatedAdmin = result;
        console.log('Ime kompanije od updatovanog admina: '+this.updatedAdmin.company?.name);
      }
    })
  });
  

    this.service.createCompany(this.company).subscribe({
    
      next:(result:Company)=>{
        this.createdCompany = result;
        this._snackBar.open('Kompanija je uspjesno kreirana!', 'Zatvori', {
          duration: 6000, // Vreme prikazivanja obaveštenja u milisekundama
          panelClass: ['success-snackbar'] // Opciona klasa za stilizovanje obaveštenja
        });
        
      }
    })
    
  
    
  }


  addAdmin(admin: CompanyAdministrator) {
    this.addedAdmin.push(admin);
    console.log("Dodato amdina: "+ this.addedAdmin.length);
    admin.company = this.createdCompany;
    
  }


  createAdmin(){
    console.log("Usaoooo")
    this.router.navigate(['registerCompanyAdmin']);
    
  }
}
