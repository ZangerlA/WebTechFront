import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import { Review } from "../models/review.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiEndpoint: string = environment.API_URL;
  private headers: HttpHeaders = new HttpHeaders();
  private options: {};

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.headers.set('Content-Type', 'application/json');
    this.options = {
      headers: this.headers,
      responseType: 'json',
      withCredentials: true,
      observe: 'response'
    };
  }

  getReview(mediumId?: string): Observable<any>{
    if (mediumId) {
      mediumId = '?MediumId=' + mediumId;
    }
    const getReviews = `${this.apiEndpoint}/review/${mediumId || ''}`;
    return this.http.get(getReviews, this.options);
  }

  postReview(review: Review): Observable<any>{
    const postReview = `${this.apiEndpoint}/review`;
    return this.http.post(postReview, review, this.options);
  }

  deleteReview(id: string): Observable<any>{
    const deleteReview = `${this.apiEndpoint}/review/${id}`;
    return this.http.delete(deleteReview, this.options);
  }
}
