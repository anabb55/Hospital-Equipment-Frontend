import { Component } from '@angular/core';
import jsQR from 'jsqr';

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

  constructor() { }

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
}
