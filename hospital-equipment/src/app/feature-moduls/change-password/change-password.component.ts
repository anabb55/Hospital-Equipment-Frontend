import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  

  userForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  id:number=0
  constructor(private authService: AuthServiceService, private activatedRoute: ActivatedRoute, private router: Router){
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      console.log('ID komponente:', this.id);
    });
  }

  change(){
    console.log('sifraa', this.userForm.value.password);
    console.log('idd',this.id);
    this.authService.changePassword(this.userForm.value.password as string,this.id).subscribe({
      next:(response)=>{
        console.log(response)
        this.router.navigate(['showCompanyProfile']);
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

}
