import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {User} from '../models/user.model';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService{

  apiEndpoint = environment.API_URL;
  // headers = new HttpHeaders().set('Content-Type', 'application/json');
  headers = new HttpHeaders();
  options: {};

  constructor(private http: HttpClient, public router: Router) {
    this.headers.set('Content-Type', 'application/json');
    this.options = {
      headers: this.headers,
      responseType: 'json',
      withCredentials: true,
      observe: 'response'
    };
  }

  signUp(user: User): Observable<any> {
    const registerUser = `${this.apiEndpoint}/users`;
    return this.http.post<any>(registerUser, user, this.options);
  }

  signIn(user: User): Observable<any> {
    const loginUser = `${this.apiEndpoint}/auth/login`;
    return this.http.post<any>(loginUser, user, this.options);
  }

  isLoggedIn(): Observable<any> {
    const validateSession = `${this.apiEndpoint}/auth/validateSession`;
    return this.http.get<any>(validateSession, this.options);
  }

  logout(): void {
    const logoutUser = `${this.apiEndpoint}/auth/logout`;
    this.http.get(logoutUser, this.options).subscribe(
      res => {
        this.router.navigate(['login']);
        },
      error => {
        console.log(error);
      }
    );
  }
}
