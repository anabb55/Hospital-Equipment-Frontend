import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from '../company/service/company-service.service';
import { Company } from 'src/app/model/company.model';

@Component({
  selector: 'app-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit{

  loggedInUser:number =5

  company:Company | undefined;
  
  constructor(private companyService:CompanyServiceService){}
  ngOnInit(): void {
    this.companyService.getCompanyByAdmin(this.loggedInUser).subscribe({
      next:(result:Company[])=>{
        this.company = result[0];
        console.log(this.company.description);
      }
    }),
     (error: any) => {
      console.error(error);
    }
  
  }

  

}
