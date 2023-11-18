import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/feature-moduls/model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  signUp(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:8081/api/registeredUsers/signUp',
      user
    );
  }
}
