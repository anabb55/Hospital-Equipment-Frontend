import { CompanyServiceService } from '../company/service/company-service.service';
import { Company } from 'src/app/model/company.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions, EventInput } from '@fullcalendar/core';
import { CompanyAdministrator } from 'src/app/model/companyAdministrator.model';
import { RegisterCompanyService } from '../register-company-admin-service.service';
import { Appointment } from 'src/app/model/appointment.model';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';



@Component({
  selector: 'app-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit{
 
  loggedInUser:number =3

  company:Company={
    id: 0,
    name: '',
    address: {
      id: 0,
      city: '',
      country: '',
      street: '',
      number: '',
      latitude: 0,
      longitude: 0
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
  
  companyAdmins:CompanyAdministrator[]=[]
  companyAdminstrators:CompanyAdministrator[]=[]
  appointments: Appointment[]=[]

  Appointments: EventInput[] = [];

  constructor(private companyService:CompanyServiceService, private elementRef: ElementRef,private adminService: RegisterCompanyService,private authService:AuthServiceService){
    this.authService.passChangeSource.next(true);
  }

  @ViewChild(FullCalendarComponent) fullCalendar!: FullCalendarComponent; //prvo
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', // Prikazivanje mjesečnog prikaza
    plugins: [dayGridPlugin],
    events: this.Appointments
  };
  ngOnInit(): void {
   
    this.companyService.getCompanyByAdmin(this.loggedInUser).subscribe({
      next:(result:Company[])=>{
        this.company = result[0];
        console.log("Kompanija: " + this.company.description);
        this.companyService.getTakenAppointmentsByCompany(this.company.id).subscribe({
          next:(result:Appointment[])=>{

            result.forEach(app => {
              const startTime = new Date(app.date+'T'+app.startTime);
              const endTime = new Date(app.date+'T'+app.endTime);

              const newEvent: EventInput = {
                title: 'Sastanak',
                start: startTime,
                end: endTime
              };

              this.Appointments.push(newEvent);

              this.calendarOptions = {
                ...this.calendarOptions,
                events: this.Appointments
              };

              // Explicitly add the new event to FullCalendar
              if (this.fullCalendar) {
                this.fullCalendar.getApi().addEvent(newEvent);
              }
            });
           
   
          }
        }),
         (error: any) => {
          console.log("Greska: ");
          console.error(error);
        }
      }
    }),
     (error: any) => {
      console.log("Greska: ");
      console.error(error);
    }


   
  
  }



 


  

  

}