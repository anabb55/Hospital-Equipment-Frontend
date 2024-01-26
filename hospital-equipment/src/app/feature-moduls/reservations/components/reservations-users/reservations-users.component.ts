import { Component } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { CompanyServiceService } from 'src/app/feature-moduls/company/service/company-service.service';
import { Company } from 'src/app/model/company.model';
import { RegisteredUser } from 'src/app/feature-moduls/model/RegisteredUser';

@Component({
  selector: 'app-reservations-users',
  templateUrl: './reservations-users.component.html',
  styleUrls: ['./reservations-users.component.css']
})
export class ReservationsUsersComponent {

  loggedInUser:number=0;
  companyId:number=0;
  companies:Company[]=[]
  users:RegisteredUser[]=[]
  displayedColumns: string[] = ['firstname','lastname','penaltyPoints','pointsPerEquipment','penaltyThreshold','discountPercentage']; 


  constructor(private resService:ReservationsService,private authService:AuthServiceService,private companyService:CompanyServiceService){
    this.getLoggedInUser();
    this.findCompanyIdByAdmin();
    
    this.authService.passChangeSource.next(true);
  }
  getLoggedInUser(){
    this.loggedInUser=this.authService.getUserIdd();
  }
  findCompanyIdByAdmin(){
    this.companyService.getCompanyByAdmin(this.loggedInUser).subscribe({
      next:(response)=>{
        this.companies=response;
        this.companyId=this.companies[0].id;
        console.log('id kompanijee',this.companyId)
        this.getReservationsUsersByCompany();
       
      }
    })

    
  }
  getReservationsUsersByCompany(){
    console.log('ID',this.companyId)
    this.resService.getReservationsUsersByCompany(this.companyId).subscribe({
      next:(response)=>{
        this.users=response;
        console.log('Korisnicii',this.users);
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }
}


  
