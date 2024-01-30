import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/model/company.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyAdministrator } from 'src/app/model/companyAdministrator.model';
import { MatTableDataSource } from '@angular/material/table';
import { Equipment } from 'src/app/model/equipment.model';
import { EquipmentStock } from 'src/app/feature-moduls/model/equipmentStock.model';
import { EquipmentAmount } from 'src/app/feature-moduls/model/equipmentAmount.model';
import { ActivatedRoute } from '@angular/router';
import { Appointment, AppointmentStatus } from 'src/app/model/appointment.model';
import { Time } from '@angular/common';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { CalendarMomentDateFormatter, MOMENT } from 'angular-calendar';
import { CompanyServiceService } from '../../company/service/company-service.service';
@Component({
  selector: 'app-admin-add-appointment',
  templateUrl: './admin-add-appointment.component.html',
  styleUrls: ['./admin-add-appointment.component.css']
})
export class AdminAddAppointmentComponent {
  minDate: string = new Date().toISOString().split('T')[0];
  loggedInUser: number=0;
 
  appointments: Appointment[] = []

  company: Company = {
    id: 0,
    name: '',
    address: {
      id: 0,
      street: '',
      city: '',
      country: '',
      number: '',
      longitude:0,
      latitude:0
    },
    description: '',
    grade: 0,
    workStartTime: {
      hours: 0,
      minutes: 0
    },
    workEndTime: {
      hours: 0,
      minutes: 0
    }
  };

  
    
  appForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
  })
  companies: Company[] = []

  id: number = 0
  constructor(private companyService: CompanyServiceService, private activedRoute: ActivatedRoute, private authService: AuthServiceService) {
    this.loggedInUser=this.getLoggedInUser();
    this.getCompanyByAdmin()
    this.authService.passChangeSource.next(true);
  }

  getLoggedInUser():number{
    return this.authService.getUserIdd();
  }
 
  getCompanyByAdmin() {
    this.companyService.getCompanyByAdmin(this.loggedInUser).subscribe({
      next: (response) => {

        this.companies = response
        this.company = this.companies[0]
       

        console.log('Kompanijee', this.companies)
        console.log('Kompanijaa', this.company)
        
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

 



  

  addApp() {
    const dateValue: string | null | undefined = this.appForm.value.date;
    const startTimeValue: string | null | undefined = this.appForm.value.startTime;
    const endTimeValue:string | null | undefined = this.appForm.value.endTime;
    console.log(dateValue,startTimeValue, '-',endTimeValue);

    
    const date= new Date(dateValue as string);
   


    if (dateValue !== null && dateValue !== undefined &&
      startTimeValue !== null && startTimeValue !== undefined &&
      endTimeValue !== null && endTimeValue !== undefined){
        
    
   
        if(this.validateTime()){
          
          this.companyService.addApp(dateValue,startTimeValue,endTimeValue,this.loggedInUser).subscribe({
            next:(response)=>{
              console.log('Response',response)
            },
            error:(err)=>{
              console.log(err)
              alert(err.error)
      
            }
            
          })
          
        }
    
  
   
    }
   

  }

  validateTime():boolean {
    
    const startTimeControl = this.appForm.get('startTime');
    const endTimeControl = this.appForm.get('endTime');
    if (startTimeControl !== null && endTimeControl!=null) {
      const startTime = startTimeControl.value;
      const endTime = endTimeControl.value;
      if (startTime && endTime && endTime<startTime) {
       alert('EndTime must be grater than startTime');
       return false
      }else{
        return true;
      }
    } 
    return false
    
  }

 
  
}
