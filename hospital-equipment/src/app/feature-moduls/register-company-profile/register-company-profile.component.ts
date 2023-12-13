import { Component, OnInit } from '@angular/core';
import { CompanyProfile } from '../model/companyProfile.model';
import { RegisterCompanyService } from '../register-company-admin-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from 'src/app/model/address.model';
import { CompanyAdministrator } from 'src/app/model/companyAdministrator.model';
import { Company } from 'src/app/model/company.model';

@Component({
  selector: 'app-register-company-profile',
  templateUrl: './register-company-profile.component.html',
  styleUrls: ['./register-company-profile.component.css']
})
export class RegisterCompanyProfileComponent implements OnInit {

  createdCompany: CompanyProfile | undefined 
  street: string = ''
  city: string = ''
  number: string = ''
  country: string = ''
  
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
    appointments: [],
    administrators: [],
    equipment: []
  };
  admins: CompanyAdministrator[] = []

  savedAddress:Address | undefined
  constructor(private service:RegisterCompanyService,private _snackBar: MatSnackBar){
    
  }
  ngOnInit(): void {
    this.service.getAllCompanyAdmins().subscribe({
      next:(result:CompanyAdministrator[])=>{
        this.admins = result;
      }
    })
  }
 

  onSubmit() {
    this.address.city = this.city
    this.address.country = this.country
    this.address.number = this.number
    this.address.street = this.street

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
    this.company.administrators.push(admin);
    console.log("Admini: "+ this.company.administrators);
  }
}
