import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './infrastructure/router/app-routing.module';
import { RegisterComponent } from './infrastructure/auth/register/register.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowCompanyProfileComponent } from './feature-moduls/company/components/show-company-profile/show-company-profile.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CreateCompanyAdminComponent } from './feature-moduls/create-company-admin/create-company-admin.component';
import { RegisterCompanyProfileComponent } from './feature-moduls/register-company-profile/register-company-profile.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, ShowCompanyProfileComponent,RegisterCompanyProfileComponent,CreateCompanyAdminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
