import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infrastructure/auth/register/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  userRole: string = '';
  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}
  ngOnInit(): void {
    this.authService.loginObserver.subscribe((val) => {
      this.isLogged = val;
      if (this.isLogged) this.userRole = this.authService.getUserRole();
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
