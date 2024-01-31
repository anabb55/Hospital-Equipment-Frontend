import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from '../../service/company-service.service';
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

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css'],
})
export class UpdateCompanyComponent {
  
  loggedInUser: number=0;
  showEditDetailsTable: boolean = false;
  showAddTable: boolean = false;
  enteredAmount: number = 0;
  amount: number | undefined;
  displayedColumns: string[] = [
    'name',
    'description',
    'grade',
    'amount',
    'add',
  ];
  equipmentAmounts: EquipmentAmount[] = [];
  equipmentAmount: EquipmentAmount = {
    equipmentId: 0,

    amount: 0,
  };
  companyEquipment: Equipment[] = [];


  appointments: Appointment[] = []
  showAddAppointment: boolean = false
  resultList: Equipment[] = []
  searchQuery: string = ''
  availableEquipment: Equipment[] = []
  showSearch: boolean = false
  showAdd: boolean = false
  showUpdate: boolean = false
  showDelete: boolean = false
  showUpdateCom = false
 


  equipmentStock: EquipmentStock = {
    equipment: {

      id: 0,
      name: '',
      description: '',
      grade: 0,
      companies: [],
      type: '',
      amount: 0
    },
    company: {
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
    },

    amount: 0,
  };

  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
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

  inputForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),

    number: new FormControl('', [Validators.required])

  })
    
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
    this.showSearch = false
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
        this.getEquipmentByCompany();
        this.getAvailableEquipmentForCompany()

        console.log('Kompanijee', this.companies)
        console.log('Kompanijaa', this.company)
        this.fillInputForm()
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  fillInputForm() {
    this.inputForm.patchValue({
      name: this.company.name,
      description: this.company.description,
      city: this.company.address.city,
      country: this.company.address.country,
      street: this.company.address.street,
      number: this.company.address.number,
    });


  }

  edit(company: Company) {
    this.showEditDetailsTable = false
    console.log('This.Company', this.company)
    this.setUpdatedFields()
    this.companyService.updateCompany(this.company).subscribe({
      next: (response) => {
        console.log('Apdejtovana', response);
        this.showUpdateCom = false
        this.inputForm.reset()

      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  setUpdatedFields() {
    this.company.name = this.inputForm.value.name as string
    this.company.description = this.inputForm.value.description as string
    this.company.address.city = this.inputForm.value.city as string
    this.company.address.country = this.inputForm.value.country as string
    this.company.address.number = this.inputForm.value.number as string
    this.company.address.street = this.inputForm.value.street as string
  }

  getAvailableEquipmentForCompany() {
    this.companyService.getAvailableEquipmentForCompany(this.company.id).subscribe({
      next: (response) => {
        console.log('Response', response);
        this.availableEquipment = response
      },
      error: (error) => {
        console.log(error)
      }

    })
  }

  addEquipmentToCompany(equipment: Equipment) {
    this.equipmentStock.company = this.company
    this.equipmentStock.amount = equipment.amount
    this.equipmentStock.equipment = equipment
    this.companyService.addEquipmentToCompany(this.equipmentStock).subscribe({
      next: (response) => {
        console.log(response)
        this.getAvailableEquipmentForCompany();
        this.getEquipmentByCompany();
      },
      error: (error) => {
        console.log(error)
      }
    })



  }

  getEquipmentByCompany() {
    this.companyService.getEquipmentForCompany(this.company.id).subscribe({
      next: (response) => {
        this.companyEquipment = response;
        this.dataSource2 = new MatTableDataSource<Equipment>(response);
        this.findAmountForEachEquipment();
      },
      error: (err) => {

        console.log(err)
      },
    })
  }

  findAmountForEachEquipment() {
    this.companyEquipment.forEach(equipment => {
      this.getEquipmentAmountByCompany(equipment.id);
    })
  }

  getEquipmentAmountByCompany(equipmentId: number) {
    this.companyService.getEquipmentAmountForCompany(this.company.id, equipmentId).subscribe({
      next: (response) => {
        this.amount = response
        console.log('Kolcinaa', this.amount)
        this.populateEquipmentAmount(equipmentId, this.amount)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  populateEquipmentAmount(equipmentId: number, amount: number) {
    const equipmentAmount = { equipmentId: equipmentId, amount: amount };
    const exists = this.equipmentAmounts.some(ea => ea.equipmentId === equipmentId);
    if (!exists) {
      this.equipmentAmounts.push(equipmentAmount);
    }
    console.log('EquipmentAmounts', this.equipmentAmounts)
  }

  addEquipmentClick() {
    this.showAdd = true
    this.showDelete = false
    this.showSearch = false
    this.showUpdate = false
    this.showUpdateCom = false
    this.showAddAppointment = false
  }

  editDetails() {
    this.showAdd = false
    this.showDelete = false
    this.showSearch = false
    this.showUpdate = false
    this.showUpdateCom = true
    this.showAddAppointment = false
  }

  searchClick() {
    this.showAdd = false
    this.showDelete = false
    this.showSearch = true
    this.showUpdate = false
    this.showUpdateCom = false
    this.showAddAppointment = false
    this.getEquipmentByCompanyId()

  }

  updateEquipment() {
    this.getEquipmentByCompany();
    this.showAdd = false
    this.showDelete = false
    this.showSearch = false
    this.showUpdate = true
    this.showUpdateCom = false
    this.showAddAppointment = false
  }

  addAppointment() {
    this.showAdd = false
    this.showDelete = false
    this.showSearch = false
    this.showUpdate = false
    this.showUpdateCom = false
    this.showAddAppointment = true
  }

  editEquipment(equipment: Equipment, amount: number) {

    console.log('Updejtovani', equipment)
    console.log('Updejtovani kolicina', amount)
    this.companyService.updateAmount(this.company.id, equipment.id, amount).subscribe({
      next: (response) => {
        console.log(response)

      },
      error: (err) => {
        console.log(err)
      }

    })

  }

  delete(equipmentId: number) {
    //is reserved 
    this.companyService.isEquipmentReserved(this.company.id, equipmentId).subscribe({
      next: (response) => {
        console.log('Oprema rez a nije preuzeta?',response)
        
        if(response==false){
          this.companyService.deleteEquipmentStock(this.company.id, equipmentId).subscribe({
            next: (response) => {
              console.log(response)
             this.getEquipmentByCompanyId();
            },
            error: (err) => {
              console.log(err)
            }
          })
        }else{
          alert('Unable to delete equipment');
        }
        
      },
      error: (err) => {
        console.log(err)
      }
    })
    
   
  }

  //SEARCH

  searchCompanies(): void {
    if (this.searchQuery.trim() === '') {
      this.getEquipmentByCompanyId();
      console.log('prazan', this.resultList)

    }
    else {

      this.companyService.searchEquipmentByName(this.searchQuery, this.company.id)
        .subscribe({
          next: (response) => {
            console.log('u funkciji id kompanije', this.company.id)
            console.log(this.searchQuery)
            this.resultList = response;
            console.log('resultList', response)

          },
          error: (error) => {
            console.log(error);
          }
        });
    }
  }

  getEquipmentByCompanyId() {
    this.companyService.getEquipmentForCompany(this.company.id).subscribe({
      next: (response) => {
        this.resultList = response;

      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  addApp() {
    const dateValue: string | null | undefined = this.appForm.value.date;
    const startTimeValue: string | null | undefined = this.appForm.value.startTime;
    const endTimeValue:string | null | undefined = this.appForm.value.endTime;
    console.log(dateValue,startTimeValue, '-',endTimeValue);

    const parsedEndTime = this.parseTimeString(endTimeValue as string);
    const parsedStartTime = this.parseTimeString(startTimeValue as string);
    const date= new Date(dateValue as string);
   


    if (dateValue !== null && dateValue !== undefined &&
      startTimeValue !== null && startTimeValue !== undefined &&
      endTimeValue !== null && endTimeValue !== undefined){
        
    
   

    
    this.companyService.addApp(dateValue,startTimeValue,endTimeValue,this.loggedInUser).subscribe({
      next:(response)=>{
        console.log('Response',response)
      },
      error:(err)=>{
        console.log(err)
      }
      
    })
    
   
    }
   

  }
   parseTimeString(timeString: string): Time | null {
  const match = timeString.match(/^(\d{1,2}):(\d{2})$/);

  if (!match) {
    console.error('Invalid time format');
    return null;
  }

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);

  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    console.error('Invalid time values');
    return null;
  }

  return { hours, minutes };
}



}
