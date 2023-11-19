import { Component } from '@angular/core';
import { CompanyProfile } from '../model/companyProfile.model';
import { RegisterCompanyService } from '../register-company-admin-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    adress: {
      street: '',
      country: '',
      city: '',
      number: '',
    }
  };

  onSubmit() {
    console.log('Submitted:', this.company);
    console.log(this.company.name);
    this.service.createCompany(this.company).subscribe({
      next:(result:CompanyProfile)=>{
        this.createdCompany = result;
        this._snackBar.open('Kompanija je uspešno kreirana!', 'Zatvori', {
          duration: 6000, // Vreme prikazivanja obaveštenja u milisekundama
          panelClass: ['success-snackbar'] // Opciona klasa za stilizovanje obaveštenja
        });
        
      }
    })

  }
}
