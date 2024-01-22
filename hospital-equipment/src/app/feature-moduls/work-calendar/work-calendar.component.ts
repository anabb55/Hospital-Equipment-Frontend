import { CompanyServiceService } from '../company/service/company-service.service';
import { Company } from 'src/app/model/company.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CompanyAdministrator } from 'src/app/model/companyAdministrator.model';
import { RegisterCompanyService } from '../register-company-admin-service.service';
import { Appointment } from 'src/app/model/appointment.model';
import { Kalendar } from '../model/kalendar.model';
import { dA } from '@fullcalendar/core/internal-common';


@Component({
  selector: 'app-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit{
  @ViewChild('calendar')

  calendarEl : ElementRef;

  loggedInUser:number =1

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

  constructor(private companyService:CompanyServiceService, private elementRef: ElementRef,private adminService: RegisterCompanyService){
    this.calendarEl = elementRef;
  }
  ngOnInit(): void {
    this.initCalendar();
    this.companyService.getCompanyByAdmin(this.loggedInUser).subscribe({
      next:(result:Company[])=>{
        this.company = result[0];
        
      }
    }),
     (error: any) => {
      console.error(error);
    }

    this.adminService.getAllCompanyAdmins().subscribe({
      next:(result:CompanyAdministrator[])=>{
        this.companyAdmins = result.filter(admin=>admin.company?.description === this.company.description);
        this.companyAdmins.forEach(admin => {
        });
    }
    }),
     (error: any) => {
      console.error(error);
    }
    

    this.companyService.getAllAppointment().subscribe({
      next:(result:Appointment[])=>{
        this.appointments = result;
        this.appointments.forEach(a => {
            console.log(a.appointmentStatus.toString()), // Naziv događaja (možete koristiti polje koje odgovara nazivu termina)
            console.log(a.date+  'T' + a.endTime), // Početno vrijeme termina (format: 'YYYY-MM-DDTHH:mm:ss')
            console.log(a.date+  'T' + a.endTime) // Završno vrijeme termina (format: 'YYYY-MM-DDTHH:mm:ss')
        })
      }
    }),
     (error: any) => {
      console.error(error);
    }
  
  }

  calendar!: Calendar 

 
  initCalendar(): void {
    
    const calendarEl: HTMLElement | null = document.getElementById('calendar') ;

    const calendarOptions: CalendarOptions = {
      plugins: [ dayGridPlugin ], // Dodajte objekt plugina, a ne samo ime
      initialView: 'dayGridMonth',
      events: this.generateEvents(),
      eventTimeFormat: { // Postavite format vremena
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false // Opcionalno: isključuje prikaz AM/PM ako koristite 24-satni format
      },
      
      // ...
    };
if(calendarEl !== null){
  this.calendar = new Calendar(calendarEl, calendarOptions);
  this.calendar.render();
}

  }

rez:String[] = []
generateEvents() {
  console.log('USAOOOO');
  
  this.companyService.getAllAppointment().subscribe({
    next:(result:Appointment[])=>{
      this.appointments = result;
    }
  }),
   (error: any) => {
    console.error(error);
  }
  console.log(this.appointments.length);
  return this.appointments.map(appointment => ({
    title: 'Sasatnak',
    start:appointment.date+'T'+appointment.startTime,
    end: appointment.date+'T'+appointment.startTime    
}));
}
  
  
  

}
