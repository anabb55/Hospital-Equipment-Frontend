import { CompanyServiceService } from '../company/service/company-service.service';
import { Company } from 'src/app/model/company.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions, EventInput } from '@fullcalendar/core';
import { CompanyAdministrator } from 'src/app/model/companyAdministrator.model';
import { RegisterCompanyService } from '../register-company-admin-service.service';
import { Appointment } from 'src/app/model/appointment.model';
import dayGridPlugin from '@fullcalendar/daygrid';



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
      number: ''
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

  constructor(private companyService:CompanyServiceService, private elementRef: ElementRef,private adminService: RegisterCompanyService){
   
  }
  ngOnInit(): void {
   
    this.companyService.getCompanyByAdmin(this.loggedInUser).subscribe({
      next:(result:Company[])=>{
        this.company = result[0];
        console.log("Kompanija: " + this.company.description);
        this.companyService.getTakenAppointmentsByCompany(this.company.id).subscribe({
          next:(result:Appointment[])=>{
            this.Appointments = result.map(appointment => ({
              title: appointment.appointmentStatus.toString(),
              start: appointment.date + 'T' + appointment.startTime,
              end: appointment.date + 'T' + appointment.endTime,

            }));
            this.calendarOptions = { ...this.calendarOptions }; // Force Angular change detection
            this.appointments = result;
            console.log("Ukupno appoint: "+ this.appointments.length)
            this.appointments.forEach(a => {
                console.log("Status appoinitmenta: "+a.appointmentStatus.toString()), // Naziv događaja (možete koristiti polje koje odgovara nazivu termina)
                console.log("start time: "+a.date+  'T' + a.startTime), // Početno vrijeme termina (format: 'YYYY-MM-DDTHH:mm:ss')
                console.log("End time: "+a.date+  'T' + a.endTime) })
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



 


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', // Prikazivanje mjesečnog prikaza
    plugins: [dayGridPlugin],
    events: this.Appointments
  };

  

}