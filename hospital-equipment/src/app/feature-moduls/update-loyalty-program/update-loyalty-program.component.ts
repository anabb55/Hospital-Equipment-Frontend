import { Component, OnInit } from '@angular/core';
import { LoyaltyProgram } from '../model/LoyaltyProgram';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationsService } from '../reservations/services/reservations.service';

@Component({
  selector: 'app-update-loyalty-program',
  templateUrl: './update-loyalty-program.component.html',
  styleUrls: ['./update-loyalty-program.component.css']
})
export class UpdateLoyaltyProgramComponent implements OnInit {

  loyaltyProgram: LoyaltyProgram = {
    discountPercentage: 0,
    pointsPerEquipment: 0,
    id: 0,
    penaltyTreshold: 0
  };


  constructor(private loyaltyProgramService: ReservationsService,
    private route: ActivatedRoute,
    private router: Router){}
  ngOnInit(): void {
    // Učitavanje ID-a Loyalty programa iz putanje
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    // Učitavanje Loyalty programa za izmenu
    if (id) {
      this.loadLoyaltyProgram(id);
    }
  }

  loadLoyaltyProgram(id: number) {
    // Poziv servisa da učita Loyalty program po ID-u
    this.loyaltyProgramService.getAllLoyaltyPrograms().subscribe({
      next:(response:LoyaltyProgram[])=>{
        response.forEach(program=>{
          if(program.id === id){
            this.loyaltyProgram = program;
          }
        })
      }
    })
  }

  onSubmit() {
    // Poziv servisa za ažuriranje Loyalty programa
    console.log("Promijenjeni dics prec: "+ this.loyaltyProgram.discountPercentage);
    console.log("Promijenjeni per equipm: "+ this.loyaltyProgram.pointsPerEquipment);
    this.loyaltyProgramService.updateLoyaltyProgramBySystemAdmin(this.loyaltyProgram).subscribe({
      next:(result:LoyaltyProgram)=>{
        console.log("Promijenjen!"+result);

      }
    })
    // Preusmeravanje nazad na listu nakon ažuriranja
    this.router.navigate(['/allLoyaltyPrograms']);
  }

}
