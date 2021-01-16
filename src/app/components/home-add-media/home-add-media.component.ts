import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MovieSeriesInfoService } from '../../services/movie-series-info.service';
import { AnimeInfoService } from '../../services/anime-info.service';
import { MediaService } from '../../services/media.service';
import {Media} from '../../models/media.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButton} from '@angular/material/button';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home-add-media',
  templateUrl: './home-add-media.component.html',
  styleUrls: ['./home-add-media.component.css']
})
export class HomeAddMediaComponent implements OnInit {
  @ViewChild('search') searchButton: MatButton;
  searchNewForm: FormGroup;
  mediaFound = [];

  mediaTypes: Type[] = [
    {value: 'Anime', viewValue: 'Anime'},
    {value: 'Series', viewValue: 'Series'},
    {value: 'Movie', viewValue: 'Movie'}
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private animeInfo: AnimeInfoService,
    private seriesMovieService: MovieSeriesInfoService,
    private mediaService: MediaService

  ) {
    this.searchNewForm = this.fb.group({
      search: [''],
      type: ['']
    });
  }

  ngOnInit(): void {
  }

  findMedia(): void {
    const val = this.searchNewForm.value;
    if (val.type.value === 'Anime'){
      this.animeInfo.getAnimeInfo(val.search).subscribe(
        res => {this.mediaFound = res.body.results; },
        error => {console.error(error); }
      );
    }
    else if (val.type.value === 'Series'){
      this.seriesMovieService.searchSeries(val.search).subscribe(
        res => {this.mediaFound = res.body.Search; },
        error => {console.log(error); }
      );
    }
    else if (val.type.value === 'Movie'){
      this.seriesMovieService.searchMovies(val.search).subscribe(
        res => {this.mediaFound = res.body.Search; },
        error => {console.log(error); }
      );
    }
    this.timeout();
  }

  convertSearchToMedia(result): Observable<Media> {
    if (result.Type === 'movie'){
      return this.seriesMovieService.getMovieInfo(result.imdbID).pipe(map(Media.createFromMovie));
    }
    else if (result.Type === 'series'){
      return this.seriesMovieService.getSeriesInfo(result.imdbID).pipe(map(Media.createFromSeries));
    }
    else {
      return new Observable<Media>(observer => {
        observer.next(Media.createFromAnime(result));
      });
    }
  }

  addToDatabase(result): void {
    this.convertSearchToMedia(result).subscribe(media => {
      this.mediaService.postMedia(media).subscribe(
        res => {console.log(res); },
        error => {console.error(error); }
      );
    });
  }

  timeout(): void {
    const seconds = 3 * 1000;
    this.searchButton.disabled = true;
    setTimeout(() => { this.searchButton.disabled = false; }, seconds);
  }

}
