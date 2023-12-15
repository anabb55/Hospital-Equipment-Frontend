import { Component } from '@angular/core';
import { CompanyProfile } from '../model/companyProfile.model';
import { RegisterCompanyService } from '../register-company-admin-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from '../model/Address';

@Component({
  selector: 'app-register-company-profile',
  templateUrl: './register-company-profile.component.html',
  styleUrls: ['./register-company-profile.component.css']
})
export class RegisterCompanyProfileComponent {

  constructor(private service:RegisterCompanyService,private _snackBar: MatSnackBar){
    
  }
  createdCompany: CompanyProfile | undefined

  company: CompanyProfile = {
    name: '',
    description: '',
    grade: 0,
    address:{
        street: '',
        city: '',
        number: '',
        country: ''
      }
    };
  

  address:Address={
    street: '',
    city: '',
    number: '',
    country: ''
  };

  savedAddress:Address | undefined

  onSubmit() {
    console.log('Submitted:', this.company);
    console.log(this.company.name);

    this.service.createAddress(this.address).subscribe({
      next:(result:Address)=>{
        this.savedAddress = result;
        this.company.address = this.savedAddress;
        //-------- nije dobra adresaa------------------------------------------------
        this.service.createCompany(this.company).subscribe({
          next:(result:CompanyProfile)=>{
            this.createdCompany = result;
            this._snackBar.open('Kompanija je uspešno kreirana!', 'Zatvori', {
              duration: 6000, // Vreme prikazivanja obaveštenja u milisekundama
              panelClass: ['success-snackbar'] // Opciona klasa za stilizovanje obaveštenja
            });
            
          }
        })
        //------------------------------------------------------
      }
    })
    

  }
}
