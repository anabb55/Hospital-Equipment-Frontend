import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './infrastructure/router/app-routing.module';
import { RegisterComponent } from './infrastructure/auth/register/register.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RegisteredUserModule } from './feature-moduls/registeredUser/registeredUser.module';

@NgModule({
  declarations: [AppComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    RegisteredUserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
