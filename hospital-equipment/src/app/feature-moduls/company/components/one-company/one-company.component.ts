import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyServiceService } from '../../service/company-service.service';
import { Company } from 'src/app/model/company.model';
import { Equipment } from 'src/app/model/equipment.model';
import { DateAdapter } from '@angular/material/core';
import { Appointment } from 'src/app/model/appointment.model';

@Component({
  selector: 'app-one-company',
  templateUrl: './one-company.component.html',
  styleUrls: ['./one-company.component.css']
})
export class OneCompanyComponent  {
  reservationData: any = {};
  id:number=0;
  confirmationText: string = "Confirm your reservation!!";
  selectedDate: Date=new Date();
  buttonDisabled: boolean = false;
  searchQuery: string = '';
  equipmentList: Equipment[] = [];  //prikaz unutar firme tj eqStock
  equipmentListForReservation: Equipment[] = []; //kada dodajemon opremu ide u ovu listu kako bismo prebacili na bek kasnije
  extraordinaryAppointments:Appointment[]=[];
  buttonClicked: boolean = false;
  finishedReservation: boolean = false;
  equipmentAdd: boolean = false;
  extraordinaryClicked:boolean=false;
  extraordinaryClickedFinish:boolean=false;
  reserveClicked:boolean=false;
  minDate: Date;
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



  constructor(private activedRoute: ActivatedRoute, private companyService : CompanyServiceService,private dateAdapter: DateAdapter<Date>){

   this.getId();
   this.getCompany();
   this.minDate = new Date();  
   this.dateAdapter.setLocale('en-US');  

  }

  ngOnInit(): void {
    this.loadEquipment();
  }
 
  getId() {
    this.activedRoute.params.subscribe(params => {
      this.id = +params['id']
      console.log('ID komponente:', this.id);
    });
  }
  loadEquipment(): void {
    console.log("Id pre je" + this.id);
    this.companyService.getEquipmentByCompanyId(this.id).subscribe(
      (response: Equipment[]) => {  // Promenite 'next' na klasičan način
        this.equipmentList = response;
        console.log('Kompanijaa', this.company);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  searchCompanies():void{
    if (this.searchQuery.trim() === '') {
      this.loadEquipment();
      return;
    }
  
    this.companyService.searchEquipmentByName(this.searchQuery,this.id)
      .subscribe({
        next: (response) => {
          console.log('Rezultati pretrage', response);
          this.equipmentList = response;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  addEquipment(equipment: Equipment): void {
    this.equipmentListForReservation.push(equipment);
    this.equipmentAdd=true;
    console.log('Lista opreme je ' + JSON.stringify(this.equipmentListForReservation));

    console.log('Dodaj opremu:', equipment);
  }

  addAppointment(appointment:Appointment):void{
    this.companyService.saveAppointment(this.id, appointment)
      .subscribe(
        response => {
          console.log('Termin je uspešno kreiran!', response);
          this.buttonDisabled = true;
          this.finishedReservation=true;
        },
        error => {
          console.error('Došlo je do greške prilikom kreiranja termina.', error);
        }
      );

  }
  CheckFreeAppointments():void{
    this.buttonClicked=true;
  }

  CheckExtraordinaryeAppointments():void{
    console.log("first khm")
    this.extraordinaryClicked=true;
  }
  
  CheckExtraOrdinary():void{
    console.log("khm")
    this.extraordinaryClickedFinish=true;

    this.companyService.generateRandomAppointments(this.id,this.selectedDate
    ).subscribe(
      response => {
        console.log("Vanredni datumi su: " + JSON.stringify(response));
        this.extraordinaryAppointments.push(...response);
      },
      error => {
        console.error(error); 
      }
    );
  }
  reserveEquipment():void{
    this.companyService.makeReservation(this.reservationData,1)
    .subscribe(
      response => {
        console.log('Rezervacija je uspesno kreiranaa!', response);
        this.reserveClicked=true;
      },
      error => {
        console.error(error); 
      }
    );
  }
  confirmReservation():void{

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
