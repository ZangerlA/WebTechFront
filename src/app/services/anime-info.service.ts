import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AnimeDto, AnimeResponse} from '../models/animeDto';
import {map} from 'rxjs/operators';

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

  searchAnime(animeName: string): Observable<any> {
    const searchAnime = `${this.apiEndpoint}/search/anime?q=${animeName}`;
    return this.http.get<AnimeDto[]>(searchAnime, this.options);
  }

  // tslint:disable-next-line:variable-name
  getAnimeInfo(mal_id: string): Observable<AnimeDto> {
    const getAnimeInfo = `${this.apiEndpoint}/anime/${mal_id}`;
    return this.http.get<AnimeResponse>(getAnimeInfo, this.options).pipe(map(res => res.body));
  }
}
