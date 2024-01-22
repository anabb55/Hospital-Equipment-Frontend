import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

import { User } from 'src/app/feature-moduls/model/User';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private access_token = null;
  userClaims: any = null;

  private loginSource = new BehaviorSubject<boolean>(false);
  public loginObserver = this.loginSource.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.userClaims = this.jwtHelper.decodeToken();
    if (this.userClaims) this.loginSource.next(true);
  }

  signUp(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:8081/api/authentication/signUp',
      user
    );
  }

  login(loginRequest: Credential): Observable<boolean> {
    return this.http
      .post<any>('http://localhost:8081/api/authentication/login', loginRequest)
      .pipe(
        map((res) => {
          console.log('Login success');
          console.log(res);
          localStorage.setItem('token', res.token);
          this.userClaims = this.jwtHelper.decodeToken();
          this.access_token = res.token;
          this.loginSource.next(true);
          return true;
        })
      );
  }

  logout(): void {
    localStorage.clear();
    this.loginSource.next(false);
  }

  isLogged(): boolean {
    if (!this.jwtHelper.tokenGetter()) return false;
    return true;
  }

  getUserId(): string {
    return this.userClaims.id;
  }

  getUserRole(): string {
    return this.userClaims.role;
  }
  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }

  getUserId(): number {
    return this.userClaims.id;
  }

  changePassword(password:String,id:number): Observable<number>{
    const token = this.jwtHelper.tokenGetter();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<number>(environment.apiHost + 'users/update/' + id +'/' +  password, {headers})
  }


}

