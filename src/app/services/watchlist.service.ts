import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

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

  getWatchlistUser(): Observable<any> {
    const getWatchlist = `${this.apiEndpoint}/wantToWatch/currentUser`;
    return this.http.get(getWatchlist, this.options);
  }
  getWatchlistUsers(): Observable<any> {
    const getWatchlists = `${this.apiEndpoint}/wantToWatch`;
    return this.http.get(getWatchlists, this.options);
  }
  addElementToWatchlist(MediumId: string): Observable<any> {
    const toAddWatchList = `${this.apiEndpoint}/wantToWatch`;
    return this.http.post(toAddWatchList, {MediumId: MediumId}, this.options);
  }
  removeElementFromWatchlist(MediumId:string): Observable<any> {
    const removeFromWatchlist = `${this.apiEndpoint}/wantToWatch/${MediumId}`
    return this.http.delete(removeFromWatchlist,this.options);
  }
}
