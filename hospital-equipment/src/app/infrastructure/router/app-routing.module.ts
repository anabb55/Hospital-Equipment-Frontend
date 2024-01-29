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

import { LoginComponent } from '../auth/register/login/login.component';
import { AuthGuard } from 'src/app/interceptor/auth.guard';
import { RoleGuard } from 'src/app/interceptor/role.guard';

import { CreateSystemAdminComponent } from 'src/app/feature-moduls/create-system-admin/create-system-admin.component';
import { SearchEquipmentComponent } from 'src/app/feature-moduls/search-equipment/search-equipment.component';

import { ChangePasswordComponent } from 'src/app/feature-moduls/change-password/change-password.component';

import { WorkCalendarComponent } from 'src/app/feature-moduls/work-calendar/work-calendar.component';
import { ShowReservationsComponent } from 'src/app/feature-moduls/reservations/components/show-reservations/show-reservations.component';
import { SuccessfullReservationComponent } from 'src/app/feature-moduls/reservations/components/successfull-reservation/successfull-reservation.component';
import { ReservationsUsersComponent } from 'src/app/feature-moduls/reservations/components/reservations-users/reservations-users.component';


const routes: Routes = [
  { path: 'showCompanyProfile', component: ShowCompanyProfileComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'workCalendar', component: WorkCalendarComponent },

  { path: 'displayProfile', component: DisplayProfile },

  {
    path: 'displayProfile',
    component: DisplayProfile,
    // canActivate: [AuthGuard, RoleGuard],
    // data: { roles: ['ROLE_REGISTERED_USER'] },
},

  { path: 'registerCompanyAdmin', component: CreateCompanyAdminComponent },
{ path: 'registerSystemAdmin', component: CreateSystemAdminComponent },
  { path: 'searchEquipment', component: SearchEquipmentComponent },

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
  {
    path: 'oneCompany/:id',
    component: OneCompanyComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'changePassword/:id', component: ChangePasswordComponent },
  {path: 'showReservations', component: ShowReservationsComponent},
  {path:'successfullReservation', component: SuccessfullReservationComponent},
  {path:'usersReserved',component: ReservationsUsersComponent}
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
