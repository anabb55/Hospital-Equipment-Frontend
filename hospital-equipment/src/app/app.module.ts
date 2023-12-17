import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';

import { JwtModule } from '@auth0/angular-jwt';

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

    MatTableModule,


    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
