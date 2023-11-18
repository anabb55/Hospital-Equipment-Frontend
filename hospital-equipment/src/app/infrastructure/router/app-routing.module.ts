import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../auth/register/register.component';
import { CreateCompanyAdminComponent } from 'src/app/feature-moduls/create-company-admin/create-company-admin.component';
import { RegisterCompanyProfileComponent } from 'src/app/feature-moduls/register-company-profile/register-company-profile.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'registerCompanyAdmin', component: CreateCompanyAdminComponent },
  { path: 'registerCompanyProfile', component: RegisterCompanyProfileComponent },

];

@NgModule({
  declarations: [],
  imports: [CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
