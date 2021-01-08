import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AnimeDto} from '../models/animeDto';

@Injectable({
  providedIn: 'root'
})
export class AnimeInfoService {
  apiEndpoint = 'https://api.jikan.moe/v3';
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

  getAnimeInfo(animeName: string): Observable<any> {
    const getInfo = `${this.apiEndpoint}/search/anime?q=${animeName}`;
    return this.http.get<AnimeDto[]>(getInfo, this.options);
  }
}
