import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  apiEndpoint = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {}

  signUp(user: User): Observable<any> {
    const registerUser = `${this.apiEndpoint}/users`;
    return this.http.post(registerUser, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  signIn(user: User): any {
    const loginUser = `${this.apiEndpoint}/users/login`;
    return this.http.post<any>(loginUser, user, { headers: this.headers })
      .subscribe((res: any) => {
        localStorage.setItem('id', res.id);
        // tslint:disable-next-line:no-shadowed-variable
        this.getUserProfile(res.id).subscribe((res: any) => {
          this.currentUser = res;
          this.router.navigate(['']);
        });
      });
  }

  isLoggedIn(): Observable<any> {
    return this.getUserProfile(localStorage.id);
  }

  logout(): void{
    const removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    const getUser = `${this.apiEndpoint}/users/${id}`;
    return this.http.get(getUser, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse): Observable<never>{
    let msg;
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
