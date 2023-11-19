import { Component } from '@angular/core';
import { CompanyServiceService } from '../../service/company-service.service';
import { Company } from 'src/app/model/company.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent {

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
  getCompanyByAdmin(){ 
    //*********** NE ZABORAVI LOGOVANOG USERA PROSLIJEDITI!!!
    this.companyService.getCompanyByAdmin(1).subscribe({
      next:(response)=>{
        this.companies=response
        this.company=this.companies[0]
        
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
  console.log(this);
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
}
