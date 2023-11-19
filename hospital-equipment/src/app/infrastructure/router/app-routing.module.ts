import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../auth/register/register.component';
import { ShowCompanyProfileComponent } from 'src/app/feature-moduls/company/components/show-company-profile/show-company-profile.component';
import { CreateCompanyAdminComponent } from 'src/app/feature-moduls/create-company-admin/create-company-admin.component';
import { RegisterCompanyProfileComponent } from 'src/app/feature-moduls/register-company-profile/register-company-profile.component';
import { UpdateCompanyComponent } from 'src/app/feature-moduls/company/components/update-company/update-company.component';
import { DisplayProfile } from 'src/app/feature-moduls/registeredUser/displayProfile/displayProfile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  {path:'showCompanyProfile', component:ShowCompanyProfileComponent},
  { path: 'register', component: RegisterComponent },
{ path: 'displayProfile', component: DisplayProfile },

  { path: 'registerCompanyAdmin', component: CreateCompanyAdminComponent },
  { path: 'registerCompanyProfile', component: RegisterCompanyProfileComponent },
  {path: 'updateCompany', component: UpdateCompanyComponent}
]


@NgModule({
  declarations: [],
  imports: [CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    CommonModule,
    ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
