import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../reservations/services/reservations.service';
import { LoyaltyProgram } from '../model/LoyaltyProgram';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-loyalty-program',
  templateUrl: './create-loyalty-program.component.html',
  styleUrls: ['./create-loyalty-program.component.css']
})
export class CreateLoyaltyProgramComponent  implements OnInit{



  all: LoyaltyProgram[]=[]
  constructor(private router:Router,private service: ReservationsService){}

  ngOnInit(): void {
    this.getAllPrograms();
  }


getAllPrograms(){
  this.service.getAllLoyaltyPrograms().subscribe({
    next:(response:LoyaltyProgram[])=>{
      this.all = response;
    }
  })
}
editLoyaltyProgram(id: number) {
  // Preusmeravanje na stranicu za izmenu sa ID Loyalty programa
  this.router.navigate(['/updateLoyaltyPrograms/'+id]); // Prilagodite putanju prema vašim potrebama
}

// loyalty-program-list.component.ts

getStatusLabel(id: number): string {
  switch (id) {
    case 1:
      return 'REGULAR';
    case 2:
      return 'SILVER';
    case 3:
      return 'GOLD';
    default:
      return 'Unknown';
  }
}


}
