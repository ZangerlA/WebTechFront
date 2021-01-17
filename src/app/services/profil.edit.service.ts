import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileEditService {

  apiEndpoint = environment.API_URL;
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

  getProfil(): Observable<any> {
    const getProfil = `${this.apiEndpoint}/users`;
    return this.http.get(getProfil, this.options);
  }

  putProfil(fieldName: string, newInfo: string): Observable<any> {
    const putProfil = `${this.apiEndpoint}/users`;
    return this.http.put(putProfil, {fieldName: fieldName, newInfo: newInfo}, this.options);
  }
}
