import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieSeriesInfoService {
  apiEndpoint = 'http://www.omdbapi.com/?apikey=5fe93688&';
  headers = new HttpHeaders();
  options: {};

  constructor(private http: HttpClient, public router: Router) {
    this.headers.set('Content-Type', 'application/json');
    this.options = {
      headers: this.headers,
      responseType: 'json',
      observe: 'response',
    };
  }

  searchMovies(movieName: string): Observable<any> {
    const searchMovies = `${this.apiEndpoint}s=${movieName}&type=movie`;
    return this.http.get(searchMovies, this.options);
  }

  searchSeries(seriesName: string): Observable<any> {
    const searchSeries = `${this.apiEndpoint}s=${seriesName}&type=series`;
    return this.http.get(searchSeries, this.options);
  }

  getMovieInfo(imdbID: string): Observable<any> {
    const getMovieInfo = `${this.apiEndpoint}i=${imdbID}`;
    return this.http.get(getMovieInfo, this.options);
  }

  getSeriesInfo(imdbID: string): Observable<any> {
    const getSeriesInfo = `${this.apiEndpoint}i=${imdbID}`;
    return this.http.get(getSeriesInfo, this.options);
  }
}

