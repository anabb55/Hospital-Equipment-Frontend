import { Component } from '@angular/core';
import jsQR from 'jsqr';
import { ReservationsService } from '../reservations/services/reservations.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { CompanyServiceService } from '../company/service/company-service.service';
import { Company } from 'src/app/model/company.model';
import { ReservationEquipmentStock } from 'src/app/model/reservation_equipment_stock.model';
import { EquipmentStock } from 'src/app/model/equipment_stock.model';
import { RegisteredUser, UserCategory } from '../model/RegisteredUser';
import { Reservation, ReservationStatus } from 'src/app/model/reservation,model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-qr-code',
  template: `
    <div>
      <input type="file" (change)="handleFileInput($event)">
    </div>

    <div *ngIf="reservationDetails">
      <h2>Detalji rezervacije:</h2>
      <p>{{ reservationDetails }}</p>
    </div>
  `,
  styleUrls: ['./upload-qr-code.component.css']
})
export class UploadQrCodeComponent {
  reservationDetails: string | null = null;
  companyId:number=0;
  companies: Company[]=[];
  loggedInUser:number=0;
  reservations: ReservationEquipmentStock[]=[]
  reservationEquipmentStocks: ReservationEquipmentStock[]=[]
  equipmentStock : EquipmentStock[]= []
registredUser: RegisteredUser={
  penaltyPoints: 0,
  accumulatedPoints: 0,
  userCategory: UserCategory.Regular,
  loyaltyProgram: {
    discountPercentage: 0,
    penaltyTreshold: 0,
    pointsPerEquipment: 0
  },
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  username: '',
  phoneNumber: '',
  occupation: '',
  address: {
    city: '',
    country: '',
    street: '',
    number: ''
  },
  waslogged: false
}
  
allReservations:Reservation[]=[];


  constructor(private router: Router,private resService: ReservationsService,private authService:AuthServiceService,private companyService:CompanyServiceService){
    this.getLoggedInUser();
    this.authService.passChangeSource.next(true);
  }
  
  ngOnInit(): void {
    this.getLoggedInUser();
  }

  getLoggedInUser(){
    this.loggedInUser=this.authService.getUserIdd();
  }

  handleFileInput(event: any): void {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const imageDataUrl = e.target.result;
        this.processImageData(imageDataUrl);
      };

      reader.readAsDataURL(file);
    }
  }

  processImageData(imageDataUrl: string): void {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext('2d');
      context?.drawImage(img, 0, 0, img.width, img.height);

      const imageData = context?.getImageData(0, 0, img.width, img.height);
      if (imageData) {
        const code = jsQR(imageData.data, img.width, img.height);

        if (code) {
          console.log('Detected QR Code:', code);
          this.reservationDetails = code.data;
          const reservationIdMatch = code.data.match(/Reservation ID: (\d+)/);
          if (reservationIdMatch && reservationIdMatch[1]) {
            const reservationId = parseInt(reservationIdMatch[1], 10);
            console.log('Detected Reservation ID:', reservationId);
            this.handleReservation(reservationId);
          } else {
            console.log('Reservation ID not found in QR code data.');
            this.reservationDetails = null;
          }
          console.log("Nasao: "+ reservationIdMatch );
        } else {
          console.log('QR kod nije pronađen.');
          this.reservationDetails = null;
        }
      } else {
        console.log('Nemoguće dobiti podatke o slici.');
        this.reservationDetails = null;
      }
    };

    img.src = imageDataUrl;
  }
  handleReservation(reservationId: number): void {
console.log("USAO U HANDLE");

this.resService.getAllReservations().subscribe({
  next:(result:Reservation[])=>{
    this.allReservations = result;

    this.allReservations.forEach(res => {
      if(res.id === reservationId){
        this.registredUser = res.registeredUserDTO;

        const appointmentDate = new Date(res.appointmentDTO.date);
        const appointmentTime = res.appointmentDTO.endTime.toString(); // Pretvori Time u string
        const currentDateTime = new Date();
        
        const appointmentDateTimeString = `${appointmentDate.toISOString().split('T')[0]}T${appointmentTime}`;
        
        if (new Date(appointmentDateTimeString) <= currentDateTime) {
          // Datum i vrijeme su istekli ili jednaki trenutnom trenutku
          console.log('Datum i vrijeme su istekli ili su jednaki trenutnom trenutku.');
          this.reservationDetails?.concat('This reservation is expired! You can not take you equipment. You get 2 penalty points!')
          if(this.registredUser.id){
            this.updateLoyaltyProgram(this.registredUser.id,0,2);
          }

        } else {
          // Datum i vrijeme nisu istekli
          console.log('Datum i vrijeme nisu istekli.');

          
          this.registredUser.accumulatedPoints = this.registredUser.accumulatedPoints+5;
            console.log("user accuml points: ",this.registredUser.accumulatedPoints)
          this.resService.getReservationEquipmentStock(reservationId).subscribe({
            next:(result:ReservationEquipmentStock[])=>{
              this.reservationEquipmentStocks = result;
              console.log("Usao u rezerv equip stock",result);
              this.reservationEquipmentStocks.forEach(resEq=>{
                console.log("ID res equipm stocka: " , resEq);
                
      
                    this.equipmentStock.push(resEq.equipmentStockDTO);
                    console.log("ID Equipment stocka: ", result);
                    
                    const newAmount= resEq.equipmentStockDTO.amount-resEq.amount
                    const TotalAmount= resEq.equipmentStockDTO.amount;
                    console.log('nova kolicinaa: ', newAmount)
                    console.log("Stara kolicina: ",TotalAmount)
                    if(this.validateAmount(newAmount,TotalAmount)){
                      console.log("ZAvrsio")
                      console.log("Company id: " ,resEq.equipmentStockDTO.companyDTO.id);
                      this.updateReservationsStatus(reservationId,resEq.id,newAmount,resEq.equipmentStockDTO.companyDTO.id);
                      this.updateAmount(resEq.id,newAmount,resEq.equipmentStockDTO.companyDTO.id);
                    
                    console.log("Pretosni broj bodova: ", this.registredUser.accumulatedPoints);
                    //this.registredUser.accumulatedPoints = this.registredUser.accumulatedPoints+5;

                    if(this.registredUser.id){
                      this.updateLoyaltyProgram(this.registredUser.id,6,0);
                    }
                    
                    alert("Successifuly taken reservation! You received 6 points and possible discounts for subsequent purchases!");
                    this.router.navigate(['showCompanyProfile']);
                  }
                    //-------------------------------------------
               
              })
              
            }
          })


        }
        





      }
    });
  }
})
    
  }

  updateLoyaltyProgram(userId:number,winPoints:number,penalty:number){
    console.log("Usao u apdejtovanje loyaltyija");
    this.resService.updateLoyaltyProgram(userId,winPoints,penalty).subscribe({
      next:(response)=>{
        console.log('Updejtovan loyaltyyy: ', response);
        console.log("Novi broj skupkjenih boodva: ",response.accumulatedPoints);
      }
    })
  }

  updateReservationsStatus(id:number,resId:number,newAmount:number,companyId:number){
    this.resService.updateReservationStatus(id).subscribe({
      next:(response)=>{
        console.log('Apdejtovana rezervacija',response)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  updateAmount(stockId:number,amount:number,companyId:number){
    this.resService.updateEqStockAmount(amount,stockId, companyId).subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  validateAmount(newAmount:number,totalAmount:number){
    if(newAmount<0){
      alert('There is no enough amount in company ');
      return false
    } 
    return true
  }
  
}
