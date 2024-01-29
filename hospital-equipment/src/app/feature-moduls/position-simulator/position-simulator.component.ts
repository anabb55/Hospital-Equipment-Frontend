// position-simulator.component.ts
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Stomp } from '@stomp/stompjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PositionSimulatorService } from './position-simulator.service';
import { LocationAdress } from 'src/app/model/location.model';

@Component({
    selector: 'app-position-simulator',
    templateUrl: './position-simulator.component.html',
    styleUrls: ['./position-simulator.component.css'],
})
export class PositionSimulatorComponent implements OnInit {
    private socket$: WebSocketSubject<any>;
    private carMarker: L.Marker | undefined;
    private socketUrl = 'ws://localhost:8081/mywebsockets';
    locations: LocationAdress[] = []; 
    allLocations: LocationAdress[]=[];
    private map: L.Map | undefined;
    private stompClient = Stomp.client(this.socketUrl);

    constructor( private jwtHelper: JwtHelperService,  private service: PositionSimulatorService) {
        this.socket$ = new WebSocketSubject({ url: this.socketUrl },
        
          );
    }

    ngOnInit(): void {
        this.initMap();
        this. loadLocations();
        this.stompClient.connect({}, () => {
          this.stompClient.subscribe('/topic/location-updates', (res) => {
              //console.log(res.body);
      
              const newLocation = JSON.parse(res.body);
              this.allLocations.push(newLocation);
      
              if (newLocation && newLocation.latitude && newLocation.longitude && this.carMarker) {
                  this.carMarker.setLatLng([newLocation.latitude, newLocation.longitude]);
              }
          });
      });
      
      
    }

    showCurrentLocation(): void {
      if (this.allLocations.length > 0 && this.carMarker) {
          const currentLocation = this.allLocations[this.allLocations.length - 1]; 
          this.carMarker.setLatLng([currentLocation.latitude, currentLocation.longitude]);
          this.map?.setView([currentLocation.latitude, currentLocation.longitude], this.map.getZoom());
      }
  }
  

    private initMap(): void {
      this.map = L.map('map').setView([45.2671, 19.8335], 17);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 50,
          attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
  
      // Ovde dodajte kôd za ikonicu i marker
      let carIcon = L.icon({
          iconUrl: 'https://static.vecteezy.com/system/resources/thumbnails/001/193/929/small/vintage-car.png', // Putanja do ikone automobila
          iconSize: [38, 38], // Veličina ikone
          iconAnchor: [22, 22], // Tačka u kojoj će ikona biti "zakačena" na mapu
      });
  
      this.carMarker = L.marker([0, 0], {icon: carIcon}).addTo(this.map); // Korišćenje reference klase
    }
  

    onButtonClick(): void {
     
      this.showCurrentLocation();
 
  }
  
  

    loadLocations(): void {
      const token = this.jwtHelper.decodeToken();
      const userId = token.id; 

      this.service.getLocation(userId).subscribe(
          (response: LocationAdress[]) => { 
              this.locations = response;
              console.log('Lokacije', this.locations);

             
              this.service.sendMessageToExchange(this.locations).subscribe(
                  (response) => {
                      console.log('Rezultat slanja lokacija:', response);
                  },
                  (error) => {
                      console.error('Greška prilikom slanja lokacija:', error);
                  }
              );
          },
          (error) => {
              console.log(error);
          }
      );
  }
    
    

    public connect(): void {
        this.socket$.next({
            /* your message data */
        });
    }
}
