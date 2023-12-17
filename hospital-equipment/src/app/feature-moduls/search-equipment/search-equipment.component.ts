import { Component, OnInit } from '@angular/core';
import { EquipmentServiceService } from '../equipment-service.service';
import { Equipment } from 'src/app/model/equipment.model';
import { Company } from 'src/app/model/company.model';

@Component({
  selector: 'app-search-equipment',
  templateUrl: './search-equipment.component.html',
  styleUrls: ['./search-equipment.component.css']
})
export class SearchEquipmentComponent implements OnInit{

  minGrade:number | undefined;
  maxGrade:number | undefined; 
  descriptionSearch:string | undefined

  constructor(private equipmentService: EquipmentServiceService){}

  equipments: Equipment[] = [];
  companiesMap: { [key: string]: Company[] } = {};
  bindingList: { name: string, description: string, type:string,grade: number, companies: string[] }[] = [];
  filteredList: { name: string, description: string,type:string, grade: number, companies: string[] }[] = [];
  searchTerm: string = '';
  
  ngOnInit(): void {
    this.equipmentService.getAllEquipment().subscribe({
      next: (result: Equipment[]) => {
        this.equipments = result;
        this.getAllCompaniesForEquipments();
      }
    });
    this.filteredList = this.bindingList; // Initialize filteredList with all equipment items
  }

  getAllCompaniesForEquipments() {
    for (const equipment of this.equipments) {
      this.equipmentService.getCompaniesForEquipment(equipment).subscribe({
        next: (result: Company[]) => {
          this.companiesMap[equipment.id.toString()] = result;
          this.prepareBindingList();
        }
      });
    }
  }

  prepareBindingList() {
    this.bindingList = this.equipments.map(equipment => {
      const companies = this.companiesMap[equipment.id.toString()] || [];
      const companyNamesAndAddresses = companies.map(company => `${company.name} - ${company.address.city}, ${company.address.country}`);
      return {
        name: equipment.name,
        description: equipment.description,
        type:equipment.type,
        grade: equipment.grade,
        companies: companyNamesAndAddresses
      };
    });
  }

  searchEquipment(): void {
    this.filteredList = this.bindingList.filter((item: any) => {
      return item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
 
    filter(): void {

      this.filteredList = this.bindingList.filter((item: any) => {
        const descriptionMatch = this.descriptionSearch ? item.type.toLowerCase().includes(this.descriptionSearch.toLowerCase()) : true;
        const minGradeMatch = this.minGrade ? item.grade >= this.minGrade : true;
        const maxGradeMatch = this.maxGrade ? item.grade <= this.maxGrade : true;
    
        return descriptionMatch && minGradeMatch && maxGradeMatch;
      });
    
    
  }
}
