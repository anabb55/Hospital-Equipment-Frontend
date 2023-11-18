import { Component } from '@angular/core';
import { CompanyServiceService } from '../../service/company-service.service';
import { Company } from 'src/app/model/company.model';

@Component({
  selector: 'app-show-company-profile',
  templateUrl: './show-company-profile.component.html',
  styleUrls: ['./show-company-profile.component.css']
})
export class ShowCompanyProfileComponent {

  companies: Company[]=[]
  
  constructor(private companyService: CompanyServiceService){

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

  
}
