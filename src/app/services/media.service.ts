import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Media} from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

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

  getMedia(id?: string, type?: string): Observable<any> {
    if (type) {
      type = '?type=' + type;
    }
    const getMedia = `${this.apiEndpoint}/media/${id || ''}${type || ''}`;
    return this.http.get(getMedia, this.options);
  }

  postMedia(media: Media): Observable<any> {
    const postMedia = `${this.apiEndpoint}/media`;
    return this.http.post(postMedia, media, this.options);
  }

  putMedia(id: string, fieldName: string, newInfo: string): Observable<any> {
    const putMedia = `${this.apiEndpoint}/media/${id}`;
    return this.http.put(putMedia, {fieldName, newInfo}, this.options);
    // TODO
  }

  deleteMedia(id: string): Observable<any> {
    const deleteMedia = `${this.apiEndpoint}/media/${id}`;
    return this.http.delete(deleteMedia, this.options);
  }
}
