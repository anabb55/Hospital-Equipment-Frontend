import { Component } from '@angular/core';
import { CompanyServiceService } from '../../service/company-service.service';
import { Company } from 'src/app/model/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/model/user.model';

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
  loggedInUser : number=0;
  selectedSort: string = '';


  ulogovaniUser:User={
    id: 0,
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    username: '',
    phoneNumber: '',
    occupation: '',
    address: {
      id: 0,
      city: '',
      country: '',
      street: '',
      number: '',
      latitude: 0,
      longitude: 0
    },
    waslogged: false
  }
  constructor(private companyService: CompanyServiceService, private router: Router,private activedRoute: ActivatedRoute,
    private authService: AuthServiceService,
    private jwtHelper: JwtHelperService){

    this.loggedInUser=this.getLoggedInUser();
    this.getAllCompanies();
      this.getUser();
      this.authService.passChangeSource.next(true);
      this.sendMessage();
  }

  
  getUser(){
    this.companyService.getUserById(this.loggedInUser).subscribe({
      next:(result)=>{
        console.log('Ulogovani user je: '+ result.firstname);
        this.ulogovaniUser=result;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  getLoggedInUser():number{
    return this.authService.getUserIdd();
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
  sortCompanies() {
    switch (this.selectedSort) {
      case 'nameAsc':
        this.companies.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        this.companies.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'cityAsc':
        this.companies.sort((a, b) => a.address.city.localeCompare(b.address.city));
        break;
      case 'cityDesc':
        this.companies.sort((a, b) => b.address.city.localeCompare(a.address.city));
        break;
      case 'ratingAsc':
        this.companies.sort((a, b) => a.grade - b.grade);
        break;
      case 'ratingDesc':
        this.companies.sort((a, b) => b.grade - a.grade);
        break;
      default:
        // No sort or default sort logic
        break;
    }
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
  

Rola() {
  const rola = this.authService.getUserRole();
  console.log(rola);
}

sendMessage(){
  this.companyService.sendFirstMessage().subscribe({
    next:(res: String)=>{
      console.log('Poruka',res)
    },
    error:(err)=>{
      console.log(err)
    }

  })
 }
  
  
}
