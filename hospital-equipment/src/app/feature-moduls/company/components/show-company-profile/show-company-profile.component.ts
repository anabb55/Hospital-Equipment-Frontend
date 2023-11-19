import { Component } from '@angular/core';
import { CompanyServiceService } from '../../service/company-service.service';
import { Company } from 'src/app/model/company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-company-profile',
  templateUrl: './show-company-profile.component.html',
  styleUrls: ['./show-company-profile.component.css']
})
export class ShowCompanyProfileComponent {

  companies: Company[]=[]
  
  constructor(private companyService: CompanyServiceService, private router: Router){

   this.getAllCompanies()
  }

  getAllCompanies(){
    this.companyService.getAllCompanies().subscribe({
      next:(response)=>{
        console.log('Companijee', response)
        this.companies=response
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  showOneCompany(company:Company){
    this.router.navigate(['/oneCompany/', company.id]);
  }
  
}
