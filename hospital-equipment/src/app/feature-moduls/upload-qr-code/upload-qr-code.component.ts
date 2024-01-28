import { Component } from '@angular/core';
import jsQR from 'jsqr';
import { ReservationsService } from '../reservations/services/reservations.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { CompanyServiceService } from '../company/service/company-service.service';
import { Company } from 'src/app/model/company.model';
import { ReservationEquipmentStock } from 'src/app/model/reservation_equipment_stock.model';
import { EquipmentStock } from 'src/app/model/equipment_stock.model';

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

  
  constructor(private resService: ReservationsService,private authService:AuthServiceService,private companyService:CompanyServiceService){
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
              }
              //-------------------------------------------
         
        })
        
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
