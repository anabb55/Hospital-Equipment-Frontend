import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyServiceService } from '../../service/company-service.service';
import { Company } from 'src/app/model/company.model';

@Component({
  selector: 'app-one-company',
  templateUrl: './one-company.component.html',
  styleUrls: ['./one-company.component.css']
})
export class OneCompanyComponent  {

  id:number=0;

  company: Company={
    id: 0,
    name: '',
    address: {
      id: 0,
      street: '',
      city: '',
      country:'',
      number: '',
    },
    description: '',
    grade: 0,
    appointments: [],
    administrators: [],
    equipment: [],
  }

  constructor( private activedRoute: ActivatedRoute, private companyService : CompanyServiceService){
   this.getId();
   this.getCompany();
  }
 
  getId() {
    this.activedRoute.params.subscribe(params => {
      this.id = +params['id']
      console.log('ID komponente:', this.id);
    });
  }

  getCompany(){
    this.companyService.getCompanyById(this.id).subscribe({
      next:(response)=>{
        this.company=response;
        console.log('Kompanijaa', this.company)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  addAdmin(){
   
  }

}
