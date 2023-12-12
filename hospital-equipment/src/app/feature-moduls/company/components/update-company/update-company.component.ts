import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from '../../service/company-service.service';
import { Company } from 'src/app/model/company.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyAdministrator } from 'src/app/model/companyAdministrator.model';
import { MatTableDataSource } from '@angular/material/table';
import { Equipment } from 'src/app/model/equipment.model';
import { EquipmentStock } from 'src/app/feature-moduls/model/equipmentStock.model';


@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit{
  displayedColumns: string[] = ['name', 'description', 'grade', 'amount','add'];
  equipmentStock:EquipmentStock={
    equipment:{
      id:0,
      name:'',
      description:'',
      grade:0,
      companies:[]
    },
    company:{
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
    },
    amount:0
  }
  dataSource!: MatTableDataSource<any>;
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
  inputForm= new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
    street: new FormControl('',[Validators.required]),
    number: new FormControl('',[Validators.required])
  })
  companies: Company[]=[]
  constructor(private companyService: CompanyServiceService){
   this.getCompanyByAdmin()
  
  }
  ngOnInit(): void {

    
    
  }
  getCompanyByAdmin(){ 
    //*********** NE ZABORAVI LOGOVANOG USERA PROSLIJEDITI!!!
    this.companyService.getCompanyByAdmin(3).subscribe({
      next:(response)=>{
        this.companies=response
        this.company=this.companies[0]
        this.getAvailableEquipmentForCompany()
        console.log('Kompanijee', this.companies)
        console.log('Kompanijaa', this.company)
        this.fillInputForm()
      },
      error: (error)=>{
        console.log(error);
      }
     }) 
  }

  fillInputForm(){
   this.inputForm.patchValue({
    name: this.company.name,
    description: this.company.description,
    city: this.company.address.city,
    country:this.company.address.country,
    street:this.company.address.street,
    number:this.company.address.number,
  });
  
  }

  edit(company:Company){
    console.log('This.Company', this.company)
   this.setUpdatedFields()
    this.companyService.updateCompany(this.company).subscribe({
      next: (response)=>{
        console.log('Apdejtovana',response);
        this.inputForm.reset()
      },
      error: (error)=>{
        console.log(error);
      }
    })
  }

  setUpdatedFields(){
    this.company.name=this.inputForm.value.name as string
    this.company.description=this.inputForm.value.description as string
    this.company.address.city=this.inputForm.value.city as string
    this.company.address.country=this.inputForm.value.country as string
    this.company.address.number=this.inputForm.value.number as string
    this.company.address.street=this.inputForm.value.street as string
  }

  getAvailableEquipmentForCompany(){
    this.companyService.getAvailableEquipmentForCompany(this.company.id).subscribe({
      next:(response)=>{
        console.log('Response',response);
        this.dataSource=new MatTableDataSource<Equipment>(response);
      },
      error:(error)=>{
        console.log(error)
      }

    })
  }

  addEquipmentToCompany(equipment:Equipment){
    this.equipmentStock.company=this.company
    this.equipmentStock.amount=1
    this.equipmentStock.equipment=equipment
    this.companyService.addEquipmentToCompany(this.equipmentStock).subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(error)=>{
        console.log(error)
      }
    })

  }
}
