import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { JwtModule } from '@auth0/angular-jwt';
import { CalendarModule, DateAdapter } from 'angular-calendar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './infrastructure/router/app-routing.module';
import { RegisterComponent } from './infrastructure/auth/register/register.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisteredUserModule } from './feature-moduls/registeredUser/registeredUser.module';
import { ShowCompanyProfileComponent } from './feature-moduls/company/components/show-company-profile/show-company-profile.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CreateCompanyAdminComponent } from './feature-moduls/create-company-admin/create-company-admin.component';
import { RegisterCompanyProfileComponent } from './feature-moduls/register-company-profile/register-company-profile.component';
import { UpdateCompanyComponent } from './feature-moduls/company/components/update-company/update-company.component';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FailRegistrationComponent } from './infrastructure/auth/register/fail-registration/fail-registration.component';
import { SuccessfullRegistrationComponent } from './infrastructure/auth/register/successfull-registration/successfull-registration.component';
import { CompanyAdminProfileComponent } from './feature-moduls/companyAdministratorProfile/company-admin-profile/company-admin-profile.component';
import { OneCompanyComponent } from './feature-moduls/company/components/one-company/one-company.component';
import { MatTableModule } from '@angular/material/table';

import { LoginComponent } from './infrastructure/auth/register/login/login.component';
import { NavbarComponent } from './feature-moduls/layout/navbar/navbar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/TokenInterceptor';

import { CreateSystemAdminComponent } from './feature-moduls/create-system-admin/create-system-admin.component';
import { SearchEquipmentComponent } from './feature-moduls/search-equipment/search-equipment.component';

import { ChangePasswordComponent } from './feature-moduls/change-password/change-password.component';

import { WorkCalendarComponent } from './feature-moduls/work-calendar/work-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ShowReservationsComponent } from './feature-moduls/reservations/components/show-reservations/show-reservations.component';
import { SuccessfullReservationComponent } from './feature-moduls/reservations/components/successfull-reservation/successfull-reservation.component';
import { ReservationsUsersComponent } from './feature-moduls/reservations/components/reservations-users/reservations-users.component';
//import 'leaflet/dist/leaflet.css';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { UploadQrCodeComponent } from './feature-moduls/upload-qr-code/upload-qr-code.component';
import { PositionSimulatorComponent } from './feature-moduls/position-simulator/position-simulator.component';
import { AdminAddAppointmentComponent } from './feature-moduls/appointments/admin-add-appointment/admin-add-appointment.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ShowCompanyProfileComponent,
    RegisterCompanyProfileComponent,
    CreateCompanyAdminComponent,
    UpdateCompanyComponent,
    FailRegistrationComponent,
    SuccessfullRegistrationComponent,


    CompanyAdminProfileComponent,
    OneCompanyComponent,
    LoginComponent,
    NavbarComponent,

    CreateSystemAdminComponent,
    SearchEquipmentComponent,
    ChangePasswordComponent,

    WorkCalendarComponent,
  ShowReservationsComponent,
  SuccessfullReservationComponent,

  ReservationsUsersComponent,
    UploadQrCodeComponent,
    PositionSimulatorComponent,
    AdminAddAppointmentComponent


  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    RegisteredUserModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CalendarModule,
    MatTableModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
      },
    }),
    LeafletModule,
    FullCalendarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }, {
      provide: DateAdapter,
      useFactory: adapterFactory,
    }

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
