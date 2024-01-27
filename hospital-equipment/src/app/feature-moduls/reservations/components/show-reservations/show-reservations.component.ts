import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import { Reservation } from 'src/app/model/reservation,model';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { CompanyServiceService } from 'src/app/feature-moduls/company/service/company-service.service';
import { Company } from 'src/app/model/company.model';
import { MatTableDataSource } from '@angular/material/table';
import { ReservationEquipmentStock } from 'src/app/model/reservation_equipment_stock.model';

@Component({
  selector: 'app-show-reservations',
  templateUrl: './show-reservations.component.html',
  styleUrls: ['./show-reservations.component.css']
})
export class ShowReservationsComponent implements OnInit{
  companyId:number=0;
  companies: Company[]=[];
  loggedInUser:number=0;
  reservations: ReservationEquipmentStock[]=[]

  displayedColumns: string[] = ['ReservationID','Appointment', 'ReservationStatus','Amount','TotalAmount','User','Equipment','Select']; // Dodajte nazive kolona
  
  dataSource = new MatTableDataSource(this.reservations);
  constructor(private resService: ReservationsService,private authService:AuthServiceService,private companyService:CompanyServiceService){
    this.getLoggedInUser();
    this.findCompanyIdByAdmin();
    this.dataSource = new MatTableDataSource(this.reservations);
    this.authService.passChangeSource.next(true);
  }
  ngOnInit(): void {
    this.getLoggedInUser();
    this.findCompanyIdByAdmin();
    this.dataSource = new MatTableDataSource(this.reservations);
  }

  getLoggedInUser(){
    this.loggedInUser=this.authService.getUserIdd();
  }

  getReservations(){
    console.log('ID',this.companyId)
    this.resService.getReservationsByCompany(this.companyId).subscribe({
      next:(response)=>{
        this.reservations=response;
        console.log('REZERVACIJEE',this.reservations)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  findCompanyIdByAdmin(){
    this.companyService.getCompanyByAdmin(this.loggedInUser).subscribe({
      next:(response)=>{
        this.companies=response;
        this.companyId=this.companies[0].id;
        console.log('id kompanijee',this.companyId)
        this.getReservations();
      }
    })

    
  }

  selectRow(res:any){
    
      console.log('selektovanoo', res)
      const reservationId= res.reservationDTO.id;
      const newAmount= res.equipmentStockDTO.amount-res.amount
      const TotalAmount= res.equipmentStockDTO.amount;
      console.log('nova kolicinaa', newAmount)
      if(this.validateAmount(newAmount,TotalAmount)){
        this.updateReservationsStatus(reservationId,res.equipmentStockDTO.id,newAmount,res.equipmentStockDTO.companyDTO.id);
      this.updateAmount(res.equipmentStockDTO.id,newAmount,res.equipmentStockDTO.companyDTO.id);
      this.getReservations();
      }
      
    
  }

  updateReservationsStatus(id:number,resId:number,newAmount:number,companyId:number){
    this.resService.updateReservationStatus(id).subscribe({
      next:(response)=>{
        console.log('Apdejtovana rezervacija',response)
       // this.updateAmount(resId,newAmount,companyId);
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  updateAmount(stockId:number,amount:number,companyId:number){
    this.resService.updateEqStockAmount(amount,stockId, companyId).subscribe({
      next:(response)=>{
        console.log(response)
       // this.getReservations();
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  validateAmount(newAmount:number,totalAmount:number){
    if(newAmount<0){
      alert('There is no enough amount in company ');
      return false
    }
    
    return true
  }
}
