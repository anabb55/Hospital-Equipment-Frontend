import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../auth/register/register.component';
import { ShowCompanyProfileComponent } from 'src/app/feature-moduls/company/components/show-company-profile/show-company-profile.component';
import { CreateCompanyAdminComponent } from 'src/app/feature-moduls/create-company-admin/create-company-admin.component';
import { RegisterCompanyProfileComponent } from 'src/app/feature-moduls/register-company-profile/register-company-profile.component';
import { UpdateCompanyComponent } from 'src/app/feature-moduls/company/components/update-company/update-company.component';

import { CompanyAdminProfileComponent } from 'src/app/feature-moduls/companyAdministratorProfile/company-admin-profile/company-admin-profile.component';
import { OneCompanyComponent } from 'src/app/feature-moduls/company/components/one-company/one-company.component';

import { DisplayProfile } from 'src/app/feature-moduls/registeredUser/displayProfile/displayProfile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FailRegistrationComponent } from '../auth/register/fail-registration/fail-registration.component';
import { SuccessfullRegistrationComponent } from '../auth/register/successfull-registration/successfull-registration.component';

const routes: Routes = [
  { path: 'showCompanyProfile', component: ShowCompanyProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'displayProfile', component: DisplayProfile },

  { path: 'registerCompanyAdmin', component: CreateCompanyAdminComponent },

  {
    path: 'registerCompanyProfile',
    component: RegisterCompanyProfileComponent,
  },
  { path: 'updateCompany', component: UpdateCompanyComponent },
  { path: 'failRegistration', component: FailRegistrationComponent },
  {
    path: 'successfullyRegistration',
    component: SuccessfullRegistrationComponent,
  },
  { path: 'companyAdminProfile', component: CompanyAdminProfileComponent },
  { path: 'oneCompany/:id', component: OneCompanyComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
