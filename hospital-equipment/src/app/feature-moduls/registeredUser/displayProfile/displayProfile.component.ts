// displayProfile.component.ts

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisteredUser } from '../../model/RegisteredUser';
import { RegisteredUserService } from '../registeredUser.service';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';

import { Appointment } from 'src/app/model/appointment.model';
import { CalendarEvent } from 'angular-calendar';

import { JwtHelperService } from '@auth0/angular-jwt';
import { CompanyServiceService } from '../../company/service/company-service.service';
import { Subscription } from 'rxjs';
import { CanceledAppointment } from 'src/app/model/canceledAppointment.model';
import { Reservation } from 'src/app/model/reservation,model';
import { Observable, of, take } from 'rxjs';

@Component({
  selector: 'app-display-profile', // Adjust the selector as needed
  templateUrl: './displayProfile.component.html',
  styleUrls: ['./displayProfile.component.css'],
})
export class DisplayProfile implements OnInit {
  registeredUser: RegisteredUser = {} as RegisteredUser;
  profileForm: FormGroup;
  isEditing: boolean = false;
  userRole: string = '';
  filteredReservations: any[] = [];
  reservations: any[] = [];
  reservationStatusMap = new Map<number, boolean>();
  myAppointments: Appointment[] = [];
  filteredAppointments: Appointment[]=[];
  appointmentPrices: number[] = [];
  selectedSort: string = 'dateAsc';
  isFilterVisible: boolean = false;
  selectedStatus: string = '';
  userId: number = 1;
  showOnlyUntaken: boolean = false;

  constructor(
    private service: RegisteredUserService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private toastr: ToastrService,
    private authService: AuthServiceService,
    private jwtHelper: JwtHelperService,
    private companyService: CompanyServiceService
  ) {
    this.profileForm = this.fb.group({
      id: [''],
      firstname: [''],
      lastname: [''],
      password: [''],
      phoneNumber: [''],
      occupation: [''],
      street: [''],
      number: [''],
      city: [''],
      country: [''],
      penaltyPoints: [''],
      userCategory: [''],
      loyaltyProgram: [''],
    });
  }

  ngOnInit(): void {
    this.loadProfileData();
    this.loadAppointment();
    this.loadQRs();
    this.filteredReservations = [...this.myAppointments];
    // this.showUntakenAppointments();
  }
  toggleFilterVisibility(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }
  checkReservationsForAppointments() {
    this.myAppointments.forEach((appointment) => {
      this.service.isStatusTaken(appointment.id).subscribe((isTaken) => {
        this.reservationStatusMap.set(appointment.id, isTaken);
      });
    });
  }

  showUntakenAppointments() {
    this.showOnlyUntaken = !this.showOnlyUntaken; 

    if (this.showOnlyUntaken) {
      this.filteredAppointments = this.myAppointments.filter(app => 
        !this.isReservationTaken(app.id)
      );
    } else {
      this.filteredAppointments = [...this.myAppointments];
    }

    this.cdr.detectChanges(); 
  }

  isReservationTaken(appointmentId: number): boolean {
    return this.reservationStatusMap.get(appointmentId) || false;
  }

  fetchTotalPricesForAppointments(): void {
    this.myAppointments.forEach((appointment, index) => {
      this.service.getTotalPrice(appointment.id).subscribe(
        (totalPrice: number) => {
          this.appointmentPrices[appointment.id] = totalPrice;
          console.log(`Price for appointment ${appointment.id}: ${totalPrice}`);
          console.log(
            `appointmentPrices: ${JSON.stringify(this.appointmentPrices)}`
          );
        },
        (error) => {
          // Handle any errors here
          console.error('Error fetching price for appointment:', error);
        }
      );
    });
  }

  loadAppointment() {
    const token = this.jwtHelper.decodeToken();
    this.userId = token.id;
    this.service.getFutureAppointments(this.userId).subscribe({
      next: (data: Appointment[]) => {
        this.myAppointments = data;
        this.checkReservationsForAppointments();
        this.fetchTotalPricesForAppointments();
        console.log('Appointmenti su' + JSON.stringify(this.myAppointments));
        this.filteredAppointments = [...this.myAppointments];

      },
      error: (error) => {
        console.error('Error loading appointments:', error);
      },
    });
  }

  loadQRs() {
    const token = this.jwtHelper.decodeToken();
    const userId = token.id;
    console.log(this.selectedStatus);
    this.service
      .getReservationsQRForUser(userId, this.selectedStatus)
      .subscribe((data) => {
        this.reservations = data;
      });
  }

  loadProfileData() {
    console.log('Loading profile data...');
    const token = this.jwtHelper.decodeToken();
    this.userId = token.id;

    this.service.getProfile(this.userId).subscribe({
      next: (data: RegisteredUser) => {
        console.log('data je' + data);
        this.registeredUser.id = data.id;
        this.registeredUser.firstname = data.firstname;
        this.registeredUser.email = data.email;
        this.registeredUser.lastname = data.lastname;
        this.registeredUser.phoneNumber = data.phoneNumber;
        this.registeredUser.userCategory = data.userCategory;
        this.registeredUser.occupation = data.occupation;
        this.registeredUser.address = data.address;
        this.registeredUser.penaltyPoints = data.penaltyPoints;
        this.registeredUser.loyaltyProgram = data.loyaltyProgram;

        this.profileForm.setValue({
          id: this.registeredUser.id,
          firstname: this.registeredUser.firstname,
          lastname: this.registeredUser.lastname,
          password: '',
          phoneNumber: this.registeredUser.phoneNumber,
          occupation: this.registeredUser.occupation,
          street: this.registeredUser.address.street,
          city: this.registeredUser.address.city,
          number: this.registeredUser.address.number,
          country: this.registeredUser.address.country,
          penaltyPoints: this.registeredUser.penaltyPoints,
          userCategory: this.registeredUser.userCategory,
          loyaltyProgram: this.registeredUser.loyaltyProgram,
        });
      },

      error: (err: any) => {
        console.log(err);
      },
    });
  }

  editProfile() {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
  }

  sortAppointments() {
    const convertTimeObjToMinutes = (timeObj: {
      hours: number;
      minutes: number;
    }) => {
      return timeObj.hours * 60 + timeObj.minutes;
    };

    switch (this.selectedSort) {
      case 'dateAsc':
        this.myAppointments.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case 'dateDesc':
        this.myAppointments.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case 'timeAsc':
        this.myAppointments.sort(
          (a, b) =>
            convertTimeObjToMinutes(a.startTime) -
            convertTimeObjToMinutes(b.startTime)
        );
        break;
      case 'timeDesc':
        this.myAppointments.sort(
          (a, b) =>
            convertTimeObjToMinutes(b.startTime) -
            convertTimeObjToMinutes(a.startTime)
        );
        break;
      case 'priceAsc':
        this.myAppointments.sort(
          (a, b) => this.appointmentPrices[a.id] - this.appointmentPrices[b.id]
        );
        break;
      case 'priceDesc':
        this.myAppointments.sort(
          (a, b) => this.appointmentPrices[b.id] - this.appointmentPrices[a.id]
        );
        break;
    }
  }

  updateProfile() {
    console.log('Form value:', this.profileForm.value);

    const updatedData = {
      id: this.profileForm.value.id,
      password: this.profileForm.value.password,
      firstname: this.profileForm.value.firstname,
      lastname: this.profileForm.value.lastname,
      email: this.registeredUser.email,
      occupation: this.profileForm.value.occupation,
      address: {
        id: this.profileForm.value.address.id,
        country: this.profileForm.value.country,
        city: this.profileForm.value.city,
        street: this.profileForm.value.street,
        number: this.profileForm.value.number,
      },
      phoneNumber: this.profileForm.value.phoneNumber,
      penaltyPoints: this.profileForm.value.penaltyPoints,
      userCategory: this.profileForm.value.userCategory,
      loyaltyProgram: this.registeredUser.loyaltyProgram,
    };
    console.log('tu sam');

    console.log('Ovo je', JSON.stringify(updatedData, null, 2));

    // this.service.updateProfile(updatedData, 1).subscribe({
    //   next: (data: any) => {
    //     console.log('Profile updated successfully:', data);
    //     this.loadProfileData();
    //   },
    //   error: (err: any) => {
    //     console.error('Error updating profile:', err);
    //   }
    // });
  }

  loyaltyProgramAdvantages() {
    this.toastr.success(
      'You have ' +
        this.registeredUser.loyaltyProgram.discountPercentage +
        ' % discount on all...',
      'Success',
      {
        positionClass: 'toast-top-right',
        toastClass: 'toast-custom-style',
        titleClass: 'toast-custom-title',
      }
    );
  }

  cancelReservation(appointment: Appointment) {
    const token = this.jwtHelper.decodeToken();
    this.userId = token.id;

    console.log(this.userId);

    this.service
      .updatePenaltyPoints(this.userId, appointment)
      .subscribe((res) => {
        this.registeredUser.penaltyPoints = res.penaltyPoints;
      });

    this.companyService
      .cancelAppointment(appointment.id, appointment, this.userId)
      .subscribe((res) => {
        this.myAppointments = this.myAppointments.filter(
          (a) => a !== appointment
        );
      });

    this.service.returnEquipment(appointment.id).subscribe((res) => {
      console.log('vracena oprema');
    });

    this.service
      .deleteReservationByAppointment(appointment.id)
      .subscribe((res) => {
        console.log('obrisano je');
      });
  }
}
