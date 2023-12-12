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

  companies: Company[]=[];
  searchQuery: string = '';
  ratingFilter: number=0;
  selectedRating: number=0;
  isFilterVisible: boolean = false;


  
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
  searchCompanies() {
    if (this.searchQuery.trim() === '') {
      this.getAllCompanies();
      return;
    }
  
    this.companyService.searchCompanies(this.searchQuery, this.searchQuery)
      .subscribe({
        next: (response) => {
          console.log('Rezultati pretrage', response);
          this.companies = response;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

searchCompaniesByRating() {
  if (this.selectedRating) {
    console.log(this.selectedRating)
    this.companyService.searchCompaniesByRating(this.selectedRating)
      .subscribe({
        next: (response) => {
          console.log('Rezultati pretrage po oceni', response);
          this.companies = response;
        },
        error: (error) => {
          console.log(error);
        }
      });
  } else {
    this.getAllCompanies();
  }
}

toggleFilterVisibility(){
  this.isFilterVisible = !this.isFilterVisible;
}
  
  
  
}
