import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { User } from 'src/app/feature-moduls/model/User';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnChanges {
  passwordsMatch: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthServiceService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {}

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    reenterPassword: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    occupation: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    }),
  });

  checkPasswordMatch() {
    const password = this.userForm.get('password')?.value;
    const reenterPassword = this.userForm.get('reenterPassword')?.value;
    this.passwordsMatch = password === reenterPassword;
  }

  registerUser(): void {
    const user: User = {
      firstname: this.userForm.value.firstname || '',
      lastname: this.userForm.value.lastname || '',
      email: this.userForm.value.email || '',
      password: this.userForm.value.password || '',
      phoneNumber: this.userForm.value.phoneNumber || '',
      occupation: this.userForm.value.occupation || '',
      address: {
        street: this.userForm.value.address?.street || '',
        number: this.userForm.value.address?.number || '',
        city: this.userForm.value.address?.city || '',
        country: this.userForm.value.address?.country || '',
      },
    };

    if (!this.userForm.valid) {
      return;
    }
    this.checkPasswordMatch();
    if (this.passwordsMatch) {
      this.service.signUp(user).subscribe({
        next: () => {
          console.log(user);
          alert('Confirm your registration by email');
          this.userForm.reset();
        },
        error: (error) => {
          console.error(error);
          console.log('postoji mail');
          this.router.navigate(['/failRegistration']);
        },
      });
    } else {
      alert('Passwords do not match');
    }
  }
}
