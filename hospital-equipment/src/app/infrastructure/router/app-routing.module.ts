import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../auth/register/register.component';
import { DisplayProfile } from 'src/app/feature-moduls/registeredUser/displayProfile/displayProfile.component';

const routes: Routes = [{ path: 'register', component: RegisterComponent },
{ path: 'displayProfile', component: DisplayProfile },
        
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
