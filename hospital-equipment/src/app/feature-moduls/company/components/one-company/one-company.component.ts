import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyServiceService } from '../../service/company-service.service';
import { Company } from 'src/app/model/company.model';
import { Equipment } from 'src/app/model/equipment.model';
import { DateAdapter } from '@angular/material/core';
import { Appointment } from 'src/app/model/appointment.model';

import { ReservationEquipmentStock } from 'src/app/model/reservation_equipment_stock.model';
import { EquipmentStock } from 'src/app/model/equipment_stock.model';

import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as L from 'leaflet';
import { CanceledAppointment } from 'src/app/model/canceledAppointment.model';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-one-company',
  templateUrl: './one-company.component.html',
  styleUrls: ['./one-company.component.css'],
})
export class OneCompanyComponent implements OnInit {
  reservationData: any = {};

  reservationEqStock: any = {};
  id: number = 0;
  confirmationText: string = 'Confirm your reservation!!';
  selectedDate: Date = new Date();

  buttonDisabled: boolean = false;
  confirmReservationClicked: boolean = false;
  searchQuery: string = '';
  equipmentList: Equipment[] = []; //prikaz unutar firme tj eqStock
  equipmentListForReservation: Equipment[] = []; //kada dodajemon opremu ide u ovu listu kako bismo prebacili na bek kasnije
  extraordinaryAppointments: Appointment[] = [];

  buttonClicked: boolean = false;
  finishedReservation: boolean = false;
  equipmentAdd: boolean = false;
  extraordinaryClicked: boolean = false;
  extraordinaryClickedFinish: boolean = false;
  reserveClicked: boolean = false;

  //ana
  predefinedAppointmentsFlag: boolean = false;
  equipmentFlag: boolean = false;
  extraordinary: boolean = false;
  predefinedAppointments: Appointment[] = [];
  canceledAppointments: CanceledAppointment[] = [];
  userId: number = 0;

  userRole: string = '';
  isLogged: boolean = false;
  minDate: Date;
  company: Company = {
    id: 0,
    name: '',
    address: {
      id: 0,
      street: '',
      city: '',
      country: '',
      number: '',
      longitude: 0,
      latitude: 0,
    },
    description: '',
    grade: 0,
    workStartTime: {
      hours: 0,
      minutes: 0,
    },
    workEndTime: {
      hours: 0,
      minutes: 0,
    },
  };

  public isMapVisible: boolean = false;
  constructor(
    private activedRoute: ActivatedRoute,
    private companyService: CompanyServiceService,
    private dateAdapter: DateAdapter<Date>,
    private authService: AuthServiceService,
    private jwtHelper: JwtHelperService
  ) {
    this.getId();
    this.getCompany();
    this.minDate = new Date();
    this.dateAdapter.setLocale('en-US');
  }

  ngOnInit(): void {
    this.authService.loginObserver.subscribe((val) => {
      this.isLogged = val;
      if (this.isLogged) this.userRole = this.authService.getUserRole();
    });
    this.loadEquipment();
    //this.initializeMap();
    /*
    const map=L.map('map',{
      center: [this.company.address.latitude,this.company.address.longitude],
      zoom:15,
      renderer:L.canvas()
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
*/
  }

  getId() {
    this.activedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      console.log('ID komponente:', this.id);
    });
  }
  loadEquipment(): void {
    console.log('Id pre je' + this.id);
    this.companyService.getEquipmentByCompanyId(this.id).subscribe(
      (response: Equipment[]) => {
        // Promenite 'next' na klasičan način
        this.equipmentList = response;
        console.log('Kompanijaa', this.company);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  searchCompanies(): void {
    if (this.searchQuery.trim() === '') {
      this.loadEquipment();
      return;
    }

    this.companyService
      .searchEquipmentByName(this.searchQuery, this.id)
      .subscribe({
        next: (response) => {
          console.log('Rezultati pretrage', response);
          this.equipmentList = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addEquipment(equipment: Equipment): void {
    this.equipmentListForReservation.push(equipment);
    this.equipmentAdd = true;
    console.log(
      'Lista opreme je ' + JSON.stringify(this.equipmentListForReservation)
    );

    console.log('Dodaj opremu:', equipment);
  }

  createReservation(appointment: Appointment) {
    const token = this.jwtHelper.decodeToken();
    this.userId = token.id;

    this.companyService
      .updateStatus(appointment.id, appointment, this.userId)
      .subscribe((res) => {
        console.log(res);
      });
    this.companyService
      .createReservationPredefined(appointment, this.userId)
      .subscribe((res) => {
        console.log(res);
        this.buttonDisabled = true;
        this.reserveClicked = true;
        this.extraordinaryClickedFinish = false;
      });
  }
  addAppointment(appointment: Appointment): void {
    this.companyService.saveAppointment(this.id, appointment).subscribe(
      (response) => {
        console.log('Termin je uspešno kreiran!', response);
        this.buttonDisabled = true;
        this.finishedReservation = true;
      },
      (error) => {
        console.error('Došlo je do greške prilikom kreiranja termina.', error);
      }
    );
  }
  CheckFreeAppointments(): void {
    this.buttonClicked = true;
    this.predefinedAppointmentsFlag = true;
    this.extraordinaryClickedFinish = true;
    this.equipmentFlag = true;
    const token = this.jwtHelper.decodeToken();
    this.userId = token.id;

    forkJoin([
      this.companyService.getAppointmentsByCompany(this.id),
      this.companyService.getCanceledAppointments(),
    ]).subscribe(([predefinedAppointments, canceledAppointments]) => {
      if (canceledAppointments != null) {
        console.log(canceledAppointments);
        this.canceledAppointments = canceledAppointments.filter(
          (canceledAppointment) => canceledAppointment.userDTO.id == this.userId
        );

        console.log('Filtrirano', this.canceledAppointments);

        this.predefinedAppointments = predefinedAppointments.filter(
          (appointment) =>
            !this.canceledAppointments.some(
              (cancelledAppointment) =>
                cancelledAppointment.appointmentDTO.id == appointment.id
            )
        );
      }
    });

    // this.predefinedAppointments = this.predefinedAppointments.filter(
    //   (appointment) => {
    //     return !this.canceledAppointments.some(
    //       (cancelledAppointment) =>
    //         cancelledAppointment.appointmentDTO.id == appointment.id
    //     );
    //   }
    // );
  }

  CheckExtraordinaryeAppointments(): void {
    console.log('first khm');
    this.extraordinaryClicked = true;
    this.extraordinaryClickedFinish = false;
  }

  CheckExtraOrdinary(): void {
    console.log('khm');
    this.extraordinary = true;
    this.predefinedAppointmentsFlag = false;

    this.companyService
      .generateRandomAppointments(this.id, this.selectedDate)
      .subscribe(
        (response) => {
          console.log('Vanredni datumi su: ' + JSON.stringify(response));
          this.extraordinaryAppointments.push(...response);
        },
        (error) => {
          console.error(error);
        }
      );
  }
  reserveEquipment(): void {
    const token = this.jwtHelper.decodeToken();
    this.userId = token.id;
    this.companyService
      .makeReservation(this.reservationData, this.userId)
      .subscribe(
        (response) => {
          console.log('Rezervacija je uspesno kreiranaa!', response);
          this.reserveClicked = true;
        },

        (error) => {
          this.reserveClicked = true;

          console.error(error);
        }
      );
  }
  confirmReservation(): void {
    this.companyService.sendQRCode().subscribe((res) => {
      console.log('mail je poslat');
      alert('Check your email!');
    });

    this.companyService
      .processReservation(
        this.reservationEqStock,
        this.equipmentListForReservation,
        this.id
      )
      .subscribe(
        (response) => {
          console.log('Krajnja rezervacija done!', response);
          console.log(this.reservationEqStock);
          this.reserveClicked = true;
          this.confirmReservationClicked = true;
        },
        (error) => {
          console.error(error);
          console.log(this.reservationEqStock);
        }
      );
  }

  getCompany() {
    this.companyService.getCompanyById(this.id).subscribe({
      next: (response) => {
        this.company = response;
        console.log('Kompanijaa', this.company);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  addAdmin() {}

  initializeMap() {
    this.isMapVisible = true;
    console.log('adresaa');
    console.log(this.company.address);
    const map = L.map('map', {
      center: [this.company.address.latitude, this.company.address.longitude],
      zoom: 15,
      renderer: L.canvas(),
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: '../assets/location.png',
      iconSize: [32, 52],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const marker = L.marker(
      [this.company.address.latitude, this.company.address.longitude],
      {
        icon: customIcon,
      }
    ).addTo(map);

    marker
      .bindPopup(
        '<b>' +
          this.company.address.street +
          ' ' +
          this.company.address.number +
          '</b>'
      )
      .openPopup();
  }
}
