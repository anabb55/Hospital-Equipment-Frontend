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

  myAppointments: Appointment[] = [];

  userId: number = 1;


  constructor(
    private service: RegisteredUserService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private toastr: ToastrService,
    private authService: AuthServiceService,
    private jwtHelper: JwtHelperService
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
  }

  loadAppointment() {
    this.service.getFutureAppointments(1).subscribe({
      next: (data: Appointment[]) => {
        this.myAppointments = data;
        console.log("Appointmenti su" + JSON.stringify(this.myAppointments));
       
        
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
      }
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
}
